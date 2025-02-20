use crate::apis::{
    prfs_accounts, prfs_circuit_drivers, prfs_circuit_types, prfs_circuits, prfs_polls,
    prfs_proof_instances, prfs_proof_types, prfs_sets, prfs_tree_nodes, vacade_posts,
};
use crate::ApiServerError;
use hyper::{header, Body, Request, Response};
use routerify::prelude::RequestExt;
use routerify::{Middleware, Router};
use routerify_cors::enable_cors_all;
use std::convert::Infallible;
use std::sync::Arc;

use super::middleware;
use super::state::ServerState;

const PREFIX: &str = "/api/v0";

pub fn make_router(
    server_state: Arc<ServerState>,
) -> Result<Router<Body, Infallible>, ApiServerError> {
    let r = Router::builder()
        .data(server_state)
        .middleware(Middleware::pre(middleware::logger))
        .middleware(enable_cors_all())
        .get("/", status_handler)
        .post(
            format!("{}/sign_up_prfs_account", PREFIX),
            prfs_accounts::sign_up_prfs_account,
        )
        .post(
            format!("{}/get_prfs_circuits", PREFIX),
            prfs_circuits::get_prfs_circuits,
        )
        .post(
            format!("{}/get_prfs_circuit_by_circuit_id", PREFIX),
            prfs_circuits::get_prfs_circuit_by_circuit_id,
        )
        .post(
            format!("{}/get_prfs_circuit_types", PREFIX),
            prfs_circuit_types::get_prfs_circuit_types,
        )
        .post(
            format!("{}/get_prfs_circuit_type_by_circuit_type_id", PREFIX),
            prfs_circuit_types::get_prfs_circuit_type_by_circuit_type_id,
        )
        .post(
            format!("{}/get_prfs_circuit_drivers", PREFIX),
            prfs_circuit_drivers::get_prfs_circuit_drivers,
        )
        .post(
            format!("{}/get_prfs_circuit_driver_by_driver_id", PREFIX),
            prfs_circuit_drivers::get_prfs_circuit_driver_by_driver_id,
        )
        .post(
            format!("{}/create_prfs_proof_instance", PREFIX),
            prfs_proof_instances::create_prfs_proof_instance,
        )
        .post(
            format!("{}/get_prfs_proof_instances", PREFIX),
            prfs_proof_instances::get_prfs_proof_instances,
        )
        .post(
            format!("{}/get_prfs_proof_instance_by_instance_id", PREFIX),
            prfs_proof_instances::get_prfs_proof_instance_by_instance_id,
        )
        .post(
            format!("{}/get_prfs_proof_instance_by_short_id", PREFIX),
            prfs_proof_instances::get_prfs_proof_instance_by_short_id,
        )
        .post(
            format!("{}/sign_in_prfs_account", PREFIX),
            prfs_accounts::sign_in_prfs_account,
        )
        .post(
            format!("{}/get_prfs_set_elements", PREFIX),
            prfs_tree_nodes::get_prfs_tree_nodes_by_pos,
        )
        .post(
            format!("{}/create_prfs_dynamic_set_element", PREFIX),
            prfs_sets::create_prfs_dynamic_set_element,
        )
        .post(
            format!("{}/get_prfs_tree_nodes_by_pos", PREFIX),
            prfs_tree_nodes::get_prfs_tree_nodes_by_pos,
        )
        .post(
            format!("{}/get_prfs_tree_leaf_nodes_by_set_id", PREFIX),
            prfs_tree_nodes::get_prfs_tree_leaf_nodes_by_set_id,
        )
        .post(
            format!("{}/get_prfs_tree_leaf_indices", PREFIX),
            prfs_tree_nodes::get_prfs_tree_leaf_indices,
        )
        .post(
            format!("{}/create_prfs_set", PREFIX),
            prfs_sets::create_prfs_set,
        )
        .post(
            format!("{}/get_prfs_sets", PREFIX),
            prfs_sets::get_prfs_sets,
        )
        .post(
            format!("{}/get_prfs_sets_by_set_type", PREFIX),
            prfs_sets::get_prfs_sets_by_set_type,
        )
        .post(
            format!("{}/get_prfs_set_by_set_id", PREFIX),
            prfs_sets::get_prfs_set_by_set_id,
        )
        .post(
            format!("{}/get_prfs_proof_types", PREFIX),
            prfs_proof_types::get_prfs_proof_types,
        )
        .post(
            format!("{}/get_prfs_proof_type_by_proof_type_id", PREFIX),
            prfs_proof_types::get_prfs_proof_type_by_proof_type_id,
        )
        .post(
            format!("{}/create_prfs_proof_type", PREFIX),
            prfs_proof_types::create_prfs_proof_type,
        )
        .post(
            format!("{}/update_prfs_tree_node", PREFIX),
            prfs_tree_nodes::update_prfs_tree_node,
        )
        .post(
            format!("{}/compute_prfs_set_merkle_root", PREFIX),
            prfs_sets::compute_prfs_set_merkle_root,
        )
        .post(
            format!("{}/get_prfs_polls", PREFIX),
            prfs_polls::get_prfs_polls,
        )
        .post(
            format!("{}/get_prfs_poll_by_poll_id", PREFIX),
            prfs_polls::get_prfs_poll_by_poll_id,
        )
        .post(
            format!("{}/get_prfs_poll_result_by_poll_id", PREFIX),
            prfs_polls::get_prfs_poll_result_by_poll_id,
        )
        .post(
            format!("{}/submit_prfs_poll_response", PREFIX),
            prfs_polls::submit_prfs_poll_response,
        )
        .post(
            format!("{}/create_prfs_poll", PREFIX),
            prfs_polls::create_prfs_poll,
        )
        .post(
            format!("{}/create_vacade_post", PREFIX),
            vacade_posts::create_vacade_post,
        )
        .post("*", middleware::not_found_handler)
        .err_handler_with_info(middleware::error_handler)
        .build()?;

    Ok(r)
}

async fn status_handler(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    let state = req.data::<Arc<ServerState>>().unwrap().clone();

    let data = serde_json::json!({
        "status": state.to_status(),
    });

    let res = Response::builder()
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(data.to_string()))
        .unwrap();

    Ok(res)
}
