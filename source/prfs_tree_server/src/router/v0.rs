use prfs_axum_lib::axum::{routing::post, Router};
use prfs_common_server_state::ServerState;
use prfs_tree_api_error_codes::bindgen::make_prfs_tree_api_error_code_json_binding;
use std::sync::Arc;

use crate::{
    apis::{prfs_set_elements, prfs_tree_nodes, prfs_trees},
    task_routine::TaskRoutine,
};

pub const TREE_API_V0: &'static str = "/tree_api/v0";

pub async fn make_tree_api_v0_router(state: &Arc<ServerState>) -> Router<Arc<ServerState>> {
    // Adding a side effect until this server runs standalone
    make_prfs_tree_api_error_code_json_binding().unwrap();

    let routine = Arc::new(TaskRoutine::init(state.clone()));
    tokio::spawn(async move {
        routine.start_routine().await;
    });

    let router = Router::new()
        .route(
            "/update_prfs_tree_by_new_atst",
            post(prfs_trees::update_prfs_tree_by_new_atst),
        )
        .route(
            "/get_prfs_set_elements",
            post(prfs_set_elements::get_prfs_set_elements),
        )
        .route(
            "/get_prfs_set_element",
            post(prfs_set_elements::get_prfs_set_element),
        )
        .route(
            "/import_prfs_attestations_to_prfs_set",
            post(prfs_set_elements::import_prfs_attestations_to_prfs_set),
        )
        .route(
            "/get_prfs_tree_nodes_by_pos",
            post(prfs_tree_nodes::get_prfs_tree_nodes_by_pos),
        )
        .route(
            "/get_prfs_tree_leaf_nodes_by_set_id",
            post(prfs_tree_nodes::get_prfs_tree_leaf_nodes_by_set_id),
        )
        .route(
            "/get_prfs_tree_leaf_indices",
            post(prfs_tree_nodes::get_prfs_tree_leaf_indices),
        )
        .route(
            "/update_prfs_tree_node",
            post(prfs_tree_nodes::update_prfs_tree_node),
        )
        .route(
            "/create_prfs_tree_by_prfs_set",
            post(prfs_trees::create_prfs_tree_by_prfs_set),
        )
        .route(
            "/get_latest_prfs_tree_by_set_id",
            post(prfs_trees::get_latest_prfs_tree_by_set_id),
        );

    router
}
