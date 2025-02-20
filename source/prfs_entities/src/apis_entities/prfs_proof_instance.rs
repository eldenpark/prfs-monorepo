use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use uuid::Uuid;

use crate::{
    entities::{PrfsProofInstance, PrfsSet},
    syn_entities::PrfsProofInstanceSyn1,
};

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetPrfsProofInstancesRequest {
    pub page_idx: i32,
    pub page_size: i32,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetPrfsProofInstanceByInstanceIdRequest {
    #[ts(type = "string")]
    pub proof_instance_id: Uuid,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetPrfsProofInstanceByInstanceIdResponse {
    pub prfs_proof_instance_syn1: PrfsProofInstanceSyn1,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetPrfsProofInstanceByShortIdResponse {
    pub prfs_proof_instance: PrfsProofInstance,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetPrfsProofInstancesResponse {
    pub page_idx: i32,
    pub table_row_count: f32,
    pub prfs_proof_instances_syn1: Vec<PrfsProofInstanceSyn1>,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetPrfsProofInstanceByShortIdRequest {
    pub short_id: String,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct CreatePrfsProofInstanceRequest {
    #[ts(type = "'<Uuid>' | string")]
    pub proof_instance_id: Uuid,

    pub account_id: Option<String>,
    pub proof_type_id: String,
    pub proof: Vec<u8>,

    #[ts(type = "Record<string, any>")]
    pub public_inputs: sqlx::types::Json<serde_json::Value>,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct CreatePrfsProofInstanceResponse {
    #[ts(type = "'<Uuid>' | string")]
    pub proof_instance_id: uuid::Uuid,

    pub prfs_ack_sig: String,
}
