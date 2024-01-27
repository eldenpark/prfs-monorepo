use hyper::{body::Incoming, Request, Response};
use hyper_utils::{
    io::{parse_req, ApiHandlerResult, BytesBoxBody},
    resp::ApiResponse,
    ApiHandleError,
};
use prfs_common_server_state::ServerState;
use prfs_db_interface::prfs;
use prfs_entities::{
    entities::PrfsTreeNode,
    prfs_api_entities::{
        ComputePrfsSetMerkleRootRequest, ComputePrfsSetMerkleRootResponse,
        CreatePrfsDynamicSetElementRequest, CreatePrfsDynamicSetElementResponse,
        CreatePrfsSetRequest, CreatePrfsSetResponse, CreateTreeOfPrfsSetRequest,
        CreateTreeOfPrfsSetResponse, GetPrfsSetBySetIdRequest, GetPrfsSetBySetIdResponse,
        GetPrfsSetsBySetTypeRequest, GetPrfsSetsRequest, GetPrfsSetsResponse,
        UpdatePrfsTreeNodeRequest,
    },
};
use prfs_tree_maker::apis2::tree;
use prfs_tree_maker::tree_maker_apis;
use rust_decimal::Decimal;
use std::{convert::Infallible, sync::Arc};

use crate::error_codes::API_ERROR_CODES;

pub async fn get_prfs_sets(req: Request<Incoming>, state: Arc<ServerState>) -> ApiHandlerResult {
    let req: GetPrfsSetsRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let prfs_sets = prfs::get_prfs_sets(pool, req.page_idx, req.page_size)
        .await
        .unwrap();

    let resp = ApiResponse::new_success(GetPrfsSetsResponse {
        page_idx: req.page_idx,
        page_size: req.page_size,
        prfs_sets,
    });

    return Ok(resp.into_hyper_response());
}

pub async fn get_prfs_sets_by_set_type(
    req: Request<Incoming>,
    state: Arc<ServerState>,
) -> ApiHandlerResult {
    let req: GetPrfsSetsBySetTypeRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let prfs_sets =
        prfs::get_prfs_sets_by_set_type(pool, req.set_type, req.page_idx, req.page_size)
            .await
            .unwrap();

    let resp = ApiResponse::new_success(GetPrfsSetsResponse {
        page_idx: req.page_idx,
        page_size: req.page_size,
        prfs_sets,
    });

    return Ok(resp.into_hyper_response());
}

pub async fn get_prfs_set_by_set_id(
    req: Request<Incoming>,
    state: Arc<ServerState>,
) -> ApiHandlerResult {
    let req: GetPrfsSetBySetIdRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let prfs_set = prfs::get_prfs_set_by_set_id(pool, &req.set_id)
        .await
        .unwrap();

    let resp = ApiResponse::new_success(GetPrfsSetBySetIdResponse { prfs_set });

    return Ok(resp.into_hyper_response());
}

pub async fn create_prfs_set(req: Request<Incoming>, state: Arc<ServerState>) -> ApiHandlerResult {
    let req: CreatePrfsSetRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let mut tx = pool.begin().await.unwrap();
    let set_id = prfs::insert_prfs_set_ins1(&mut tx, &req.prfs_set_ins1)
        .await
        .unwrap();

    let resp = ApiResponse::new_success(CreatePrfsSetResponse { set_id });

    tx.commit().await.unwrap();

    return Ok(resp.into_hyper_response());
}

pub async fn create_prfs_dynamic_set_element(
    req: Request<Incoming>,
    state: Arc<ServerState>,
) -> ApiHandlerResult {
    let req: CreatePrfsDynamicSetElementRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let mut tx = pool.begin().await.unwrap();

    let largest_pos_w = prfs::get_largest_pos_w_tree_leaf_node(&pool, &req.set_id)
        .await
        .unwrap();

    let pos_w = if let Some(pos_w) = largest_pos_w {
        pos_w + Decimal::from(1)
    } else {
        Decimal::from(0)
    };

    let node = PrfsTreeNode {
        pos_w,
        pos_h: 0,
        val: req.val.to_string(),
        meta: Some(req.meta),
        set_id: req.set_id,
    };

    let pos_w = prfs::insert_prfs_tree_node(&mut tx, &node).await.unwrap();

    tx.commit().await.unwrap();

    let resp = ApiResponse::new_success(CreatePrfsDynamicSetElementResponse { pos_w });

    return Ok(resp.into_hyper_response());
}

pub async fn compute_prfs_set_merkle_root(
    req: Request<Incoming>,
    state: Arc<ServerState>,
) -> ApiHandlerResult {
    let req: ComputePrfsSetMerkleRootRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let mut tx = pool.begin().await.unwrap();

    let required_policy = String::from("COMPUTE_MERKLE_ROOT");

    let prfs_account = prfs::get_prfs_account_by_account_id(pool, &req.account_id)
        .await
        .unwrap();

    println!("prfs_account: {:?}", prfs_account);

    if !prfs_account.policy_ids.contains(&required_policy) {
        return Err(ApiHandleError::from(
            &API_ERROR_CODES.NO_POLICY_ATTACHED,
            required_policy.into(),
        ));
    }

    let mut prfs_set = prfs::get_prfs_set_by_set_id(pool, &req.set_id)
        .await
        .unwrap();

    let deleted_row_count = prfs::delete_prfs_non_leaf_nodes_by_set_id(&mut tx, &req.set_id)
        .await
        .unwrap();

    println!(
        "Deleted non leaf nodes, count: {}, set_id: {}",
        deleted_row_count, &req.set_id
    );

    let leaf_nodes = prfs::get_prfs_tree_leaf_nodes_all_by_set_id(pool, &req.set_id)
        .await
        .unwrap();

    let merkle_root = tree_maker_apis::create_tree_nodes(&mut tx, &mut prfs_set, &leaf_nodes)
        .await
        .unwrap();

    tx.commit().await.unwrap();

    let resp = ApiResponse::new_success(ComputePrfsSetMerkleRootResponse {
        set_id: req.set_id,
        merkle_root,
    });

    return Ok(resp.into_hyper_response());
}

pub async fn create_tree_of_prfs_set(
    req: Request<Incoming>,
    state: Arc<ServerState>,
) -> ApiHandlerResult {
    let req: CreateTreeOfPrfsSetRequest = parse_req(req).await;
    let pool = &state.db2.pool;
    let mut tx = pool.begin().await.unwrap();

    println!("req: {:?}", req);

    let set_elements = prfs::get_prfs_set_elements(&pool, &req.set_id, 0, 50000)
        .await
        .unwrap();

    println!("set_elements, {:?}", set_elements);

    let leaves = tree::create_leaves(set_elements).unwrap();
    println!("leaves: {:?}", leaves);

    // let largest_pos_w = prfs::get_largest_pos_w_tree_leaf_node(&pool, &req.set_id)
    //     .await
    //     .unwrap();

    // let pos_w = if let Some(pos_w) = largest_pos_w {
    //     pos_w + Decimal::from(1)
    // } else {
    //     Decimal::from(0)
    // };

    // let node = PrfsTreeNode {
    //     pos_w,
    //     pos_h: 0,
    //     val: req.val.to_string(),
    //     meta: Some(req.meta),
    //     set_id: req.set_id,
    // };

    // let pos_w = prfs::insert_prfs_tree_node(&mut tx, &node).await.unwrap();

    // tx.commit().await.unwrap();

    let resp = ApiResponse::new_success(CreateTreeOfPrfsSetResponse {
        set_id: req.set_id.to_string(),
    });

    return Ok(resp.into_hyper_response());
}
