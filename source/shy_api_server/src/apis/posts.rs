use prfs_axum_lib::axum::{body::Body, extract::State, http::StatusCode, Json};
use prfs_axum_lib::resp::ApiResponse;
use prfs_common_server_state::ServerState;
use prfs_db_interface::shy;
use shy_entities::{
    entities::ShyPostProof,
    shy_api::{
        CreateShyPostRequest, CreateShyPostResponse, GetShyPostsRequest, GetShyPostsResponse,
    },
};
use std::sync::Arc;

use crate::envs::ENVS;
use crate::error_codes::API_ERROR_CODE;

const LIMIT: i32 = 15;

pub async fn create_shy_post(
    State(state): State<Arc<ServerState>>,
    Json(input): Json<CreateShyPostRequest>,
) -> (StatusCode, Json<ApiResponse<CreateShyPostResponse>>) {
    let state = state.clone();
    let pool = &state.db2.pool;
    let mut tx = pool.begin().await.unwrap();

    println!("111: {}", ENVS.prfs_api_server_endpoint);

    let cli = &state.client;
    let reqwest_response = match cli.get("http://127.0.0.1:3000/stream").send().await {
        Ok(res) => res,
        Err(err) => {
            let resp = ApiResponse::new_error(&API_ERROR_CODE.UNKNOWN_ERROR, err.to_string());
            return (StatusCode::BAD_REQUEST, Json(resp));
        }
    };

    println!("222: {:?}", reqwest_response);

    let shy_post_proof = ShyPostProof {
        shy_post_proof_id: input.shy_post_proof_id.to_string(),
        proof: input.proof,
        public_inputs: input.public_inputs,
        public_key: input.public_key,
    };

    let _proof_id = match shy::insert_shy_post_proof(&mut tx, &shy_post_proof).await {
        Ok(i) => i,
        Err(err) => {
            let resp = ApiResponse::new_error(&API_ERROR_CODE.UNKNOWN_ERROR, err.to_string());
            return (StatusCode::BAD_REQUEST, Json(resp));
        }
    };

    let post_id = match shy::insert_shy_post(
        &mut tx,
        &input.title,
        &input.post_id,
        &input.content,
        &input.channel_id,
        &input.shy_post_proof_id,
        &input.proof_identity_input,
    )
    .await
    {
        Ok(i) => i,
        Err(err) => {
            let resp = ApiResponse::new_error(&API_ERROR_CODE.UNKNOWN_ERROR, err.to_string());
            return (StatusCode::BAD_REQUEST, Json(resp));
        }
    };

    tx.commit().await.unwrap();

    let resp = ApiResponse::new_success(CreateShyPostResponse { post_id });
    return (StatusCode::OK, Json(resp));
}

pub async fn get_shy_posts(
    State(state): State<Arc<ServerState>>,
    Json(input): Json<GetShyPostsRequest>,
) -> (StatusCode, Json<ApiResponse<GetShyPostsResponse>>) {
    let pool = &state.db2.pool;
    let shy_posts = shy::get_shy_posts(pool, &input.channel_id, input.offset, LIMIT)
        .await
        .unwrap();

    let next_offset = if shy_posts.len() < LIMIT.try_into().unwrap() {
        None
    } else {
        Some(input.offset + LIMIT)
    };

    let resp = ApiResponse::new_success(GetShyPostsResponse {
        shy_posts,
        next_offset,
    });
    return (StatusCode::OK, Json(resp));
}
