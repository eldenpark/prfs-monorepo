use prfs_axum_lib::axum::{extract::State, http::StatusCode, Json};
use prfs_axum_lib::resp::ApiResponse;
use prfs_common_server_state::ServerState;
use shy_api_error_codes::SHY_API_ERROR_CODES;
use shy_db_interface::shy;
use shy_entities::shy_api::{
    GetShyChannelRequest, GetShyChannelResponse, GetShyChannelsRequest, GetShyChannelsResponse,
};
use std::sync::Arc;

const LIMIT: i32 = 15;

pub async fn get_shy_channels(
    State(state): State<Arc<ServerState>>,
    Json(input): Json<GetShyChannelsRequest>,
) -> (StatusCode, Json<ApiResponse<GetShyChannelsResponse>>) {
    let pool = &state.db2.pool;
    let rows = match shy::get_shy_channels(pool, input.offset, LIMIT).await {
        Ok(r) => r,
        Err(err) => {
            let resp = ApiResponse::new_error(&SHY_API_ERROR_CODES.UNKNOWN_ERROR, err.to_string());
            return (StatusCode::BAD_REQUEST, Json(resp));
        }
    };

    let next_offset = if rows.len() < LIMIT.try_into().unwrap() {
        None
    } else {
        Some(input.offset + LIMIT)
    };

    let resp = ApiResponse::new_success(GetShyChannelsResponse { rows, next_offset });
    return (StatusCode::OK, Json(resp));
}

pub async fn get_shy_channel(
    State(state): State<Arc<ServerState>>,
    Json(input): Json<GetShyChannelRequest>,
) -> (StatusCode, Json<ApiResponse<GetShyChannelResponse>>) {
    let pool = &state.db2.pool;
    let shy_channel = match shy::get_shy_channel(pool, &input.channel_id).await {
        Ok(c) => c,
        Err(err) => {
            let resp = ApiResponse::new_error(&SHY_API_ERROR_CODES.UNKNOWN_ERROR, err.to_string());
            return (StatusCode::BAD_REQUEST, Json(resp));
        }
    };

    let resp = ApiResponse::new_success(GetShyChannelResponse { shy_channel });
    return (StatusCode::OK, Json(resp));
}
