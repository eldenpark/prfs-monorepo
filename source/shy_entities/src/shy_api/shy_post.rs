use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::entities::{DateTimed, ShyPost, ShyPostSyn1, ShyTopic};

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetShyPostsOfTopicRequest {
    pub topic_id: String,
    pub channel_id: String,
    pub offset: i32,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct GetShyPostsOfTopicResponse {
    pub rows: Vec<DateTimed<ShyPostSyn1>>,
    pub next_offset: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct CreateShyPostRequest {
    pub topic_id: String,
    pub channel_id: String,
    pub shy_proof_id: String,
    pub post_id: String,
    pub content: String,
    pub author_public_key: String,
    pub author_sig: String,
    pub author_sig_msg: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct CreateShyPostWithProofRequest {
    pub topic_id: String,
    pub channel_id: String,
    pub shy_proof_id: String,
    pub post_id: String,
    pub content: String,
    pub author_public_key: String,
    pub author_sig: String,
    pub author_sig_msg: Vec<u8>,
    pub proof_identity_input: String,
    pub proof: Vec<u8>,
    pub public_inputs: String,
    pub serial_no: String,
    pub sub_channel_id: String,
    pub proof_type_id: String,
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct CreateShyPostResponse {
    pub post_id: String,
}
