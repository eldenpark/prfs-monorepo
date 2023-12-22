use hyper::body::Incoming;
use hyper::{Method, Request, Response};
use hyper_utils::cors::handle_cors;
use hyper_utils::io::BytesBoxBody;
use hyper_utils::resp::ApiResponse;
use prfs_common_server_state::ServerState;
use prfs_id_server::server::router::id_server_routes;
use std::sync::Arc;

use super::middleware::{handle_not_found, log};
use crate::apis::status::handle_server_status;
use crate::apis::{
    prfs_accounts, prfs_circuit_drivers, prfs_circuit_types, prfs_circuits, prfs_polls,
    prfs_proof_instances, prfs_proof_types, prfs_sets, prfs_tree_nodes, social_posts,
};

macro_rules! v0_path {
    ($path: tt) => {
        concat!("/api/v0/", $path)
    };
}

pub async fn route(req: Request<Incoming>, state: Arc<ServerState>) -> Response<BytesBoxBody> {
    log(&req);

    let p = req.uri().path();

    let resp = if p.starts_with("/id_api") {
        id_server_routes(req, state).await
    } else if p.starts_with("/attestation_api") {
        auth_server_routes(req, state).await
    } else {
        match (req.method(), req.uri().path()) {
            (&Method::OPTIONS, _) => handle_cors(),
            (&Method::GET, "/") => handle_server_status(req, state).await,
            (&Method::POST, v0_path!("sign_up_prfs_account")) => {
                prfs_accounts::sign_up_prfs_account(req, state).await
            }
            (&Method::POST, v0_path!("sign_in_prfs_account")) => {
                prfs_accounts::sign_in_prfs_account(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_circuits")) => {
                prfs_circuits::get_prfs_circuits(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_circuit_by_circuit_id")) => {
                prfs_circuits::get_prfs_circuit_by_circuit_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_circuit_types")) => {
                prfs_circuit_types::get_prfs_circuit_types(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_circuit_type_by_circuit_type_id")) => {
                prfs_circuit_types::get_prfs_circuit_type_by_circuit_type_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_circuit_drivers")) => {
                prfs_circuit_drivers::get_prfs_circuit_drivers(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_circuit_driver_by_driver_id")) => {
                prfs_circuit_drivers::get_prfs_circuit_driver_by_driver_id(req, state).await
            }
            (&Method::POST, v0_path!("create_prfs_proof_instance")) => {
                prfs_proof_instances::create_prfs_proof_instance(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_proof_instances")) => {
                prfs_proof_instances::get_prfs_proof_instances(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_proof_instance_by_instance_id")) => {
                prfs_proof_instances::get_prfs_proof_instance_by_instance_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_proof_instance_by_short_id")) => {
                prfs_proof_instances::get_prfs_proof_instance_by_short_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_set_elements")) => {
                prfs_tree_nodes::get_prfs_tree_nodes_by_pos(req, state).await
            }
            (&Method::POST, v0_path!("create_prfs_dynamic_set_element")) => {
                prfs_sets::create_prfs_dynamic_set_element(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_tree_nodes_by_pos")) => {
                prfs_tree_nodes::get_prfs_tree_nodes_by_pos(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_tree_leaf_nodes_by_set_id")) => {
                prfs_tree_nodes::get_prfs_tree_leaf_nodes_by_set_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_tree_leaf_indices")) => {
                prfs_tree_nodes::get_prfs_tree_leaf_indices(req, state).await
            }
            (&Method::POST, v0_path!("create_prfs_set")) => {
                prfs_sets::create_prfs_set(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_sets")) => {
                prfs_sets::get_prfs_sets(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_sets_by_set_type")) => {
                prfs_sets::get_prfs_sets_by_set_type(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_set_by_set_id")) => {
                prfs_sets::get_prfs_set_by_set_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_proof_types")) => {
                prfs_proof_types::get_prfs_proof_types(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_proof_type_by_proof_type_id")) => {
                prfs_proof_types::get_prfs_proof_type_by_proof_type_id(req, state).await
            }
            (&Method::POST, v0_path!("create_prfs_proof_type")) => {
                prfs_proof_types::create_prfs_proof_type(req, state).await
            }
            (&Method::POST, v0_path!("update_prfs_tree_node")) => {
                prfs_tree_nodes::update_prfs_tree_node(req, state).await
            }
            (&Method::POST, v0_path!("compute_prfs_set_merkle_root")) => {
                prfs_sets::compute_prfs_set_merkle_root(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_polls")) => {
                prfs_polls::get_prfs_polls(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_poll_by_poll_id")) => {
                prfs_polls::get_prfs_poll_by_poll_id(req, state).await
            }
            (&Method::POST, v0_path!("get_prfs_poll_result_by_poll_id")) => {
                prfs_polls::get_prfs_poll_result_by_poll_id(req, state).await
            }
            (&Method::POST, v0_path!("submit_prfs_poll_response")) => {
                prfs_polls::submit_prfs_poll_response(req, state).await
            }
            (&Method::POST, v0_path!("create_prfs_poll")) => {
                prfs_polls::create_prfs_poll(req, state).await
            }
            (&Method::POST, v0_path!("create_social_post")) => {
                social_posts::create_social_post(req, state).await
            }
            (&Method::POST, v0_path!("get_social_posts")) => {
                social_posts::get_social_posts(req, state).await
            }
            //
            _ => handle_not_found(req, state).await,
        }
    };

    // Inline const is not availble at the moment
    // https://github.com/rodrimati1992/const_format_crates/issues/17
    match resp {
        Ok(r) => return r,
        Err(err) => return ApiResponse::new_error(err).into_hyper_response(),
    }
}
