use chrono::{DateTime, Utc};
use prfs_circuit_interface::circuit_types::{CircuitTypeData, CircuitTypeId};
use prfs_driver_interface::CircuitDriverId;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, Clone, TS)]
#[ts(export)]
pub struct PrfsProofType {
    pub proof_type_id: String,
    pub label: String,
    pub author: String,
    pub desc: String,
    pub expression: String,
    pub img_url: Option<String>,
    pub img_caption: Option<String>,
    pub circuit_id: String,
    #[ts(inline)]
    pub circuit_type_id: CircuitTypeId,
    #[ts(type = "Record<string, any>")]
    pub circuit_type_data: sqlx::types::Json<CircuitTypeData>,
    #[ts(inline)]
    pub circuit_driver_id: CircuitDriverId,
    #[ts(type = "string")]
    pub created_at: DateTime<Utc>,
    pub experimental: bool,
}
