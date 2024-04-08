use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::prfs_atst_status::PrfsAtstStatus;
use crate::{atst_api::CryptoAsset, PrfsAtstGroupId, PrfsAtstVersion};

#[derive(TS, Debug, Serialize, Deserialize, Clone)]
#[ts(export)]
pub struct PrfsAttestation {
    pub atst_id: String,
    pub atst_group_id: PrfsAtstGroupId,
    pub label: String,
    pub cm: String,
    #[ts(type = "Record<string, any>[]")]
    pub meta: sqlx::types::Json<Vec<CryptoAsset>>,
    pub status: PrfsAtstStatus,
    #[ts(type = "string")]
    pub value_num: Decimal,
    pub atst_version: PrfsAtstVersion,
    pub value_raw: String,
}
