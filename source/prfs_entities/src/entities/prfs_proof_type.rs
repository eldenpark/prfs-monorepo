use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use ts_rs::TS;
use uuid::Uuid;

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

    #[ts(type = "string")]
    pub circuit_id: Uuid,
    pub circuit_type_id: String,
    pub circuit_driver_id: String,

    #[ts(type = "Record<string, any>[]")]
    pub circuit_inputs: sqlx::types::Json<Vec<CircuitInput>>,

    #[ts(type = "Record<string, any>")]
    pub driver_properties: sqlx::types::Json<HashMap<String, String>>,

    #[ts(type = "string")]
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone, TS)]
#[ts(export)]
pub struct CircuitInput {
    pub name: String,
    pub label: String,
    pub r#type: String,
    pub desc: String,
    pub value: String,

    #[serde(default = "default_units")]
    pub units: i16,

    pub element_type: Option<String>,

    pub ref_type: Option<String>,
    pub ref_value: Option<String>,
}

fn default_units() -> i16 {
    1
}
