use prfs_axum_lib::axum::{extract::State, http::StatusCode, Json};
use prfs_axum_lib::bail_out_tx;
use prfs_axum_lib::resp::ApiResponse;
use prfs_common_server_state::ServerState;
use prfs_db_interface::prfs;
use prfs_entities::{UpdatePrfsTreeByNewAtstRequest, UpdatePrfsTreeByNewAtstResponse};
use prfs_tree_api_error_codes::PRFS_TREE_API_ERROR_CODES;
use std::sync::Arc;

use crate::ops::_import_prfs_attestations_to_prfs_set;

pub async fn update_prfs_tree_by_new_atst(
    State(state): State<Arc<ServerState>>,
    Json(input): Json<UpdatePrfsTreeByNewAtstRequest>,
) -> (
    StatusCode,
    Json<ApiResponse<UpdatePrfsTreeByNewAtstResponse>>,
) {
    let pool = &state.db2.pool;

    let prfs_sets = match prfs::get_prfs_sets_by_topic(pool, &input.atst_type.to_string()).await {
        Ok(s) => s,
        Err(err) => {
            let resp =
                ApiResponse::new_error(&PRFS_TREE_API_ERROR_CODES.UNKNOWN_ERROR, err.to_string());
            return (StatusCode::BAD_REQUEST, Json(resp));
        }
    };

    let mut tx = bail_out_tx!(pool, &PRFS_TREE_API_ERROR_CODES.UNKNOWN_ERROR);

    for set in prfs_sets {
        match _import_prfs_attestations_to_prfs_set(
            &pool,
            &mut tx,
            &input.atst_type.to_string(),
            &set.set_id,
        )
        .await
        {
            Ok(_) => (),
            Err(err) => {
                let resp = ApiResponse::new_error(
                    &PRFS_TREE_API_ERROR_CODES.UNKNOWN_ERROR,
                    err.to_string(),
                );
                return (StatusCode::BAD_REQUEST, Json(resp));
            }
        }
    }

    // println!("sets: {:?}", prfs_sets);
    // let prfs_circuit_drivers = prfs::get_prfs_circuit_drivers(&pool).await;

    let resp = ApiResponse::new_success(UpdatePrfsTreeByNewAtstResponse {
        prfs_set_ids: vec![],
    });
    return (StatusCode::OK, Json(resp));
}
