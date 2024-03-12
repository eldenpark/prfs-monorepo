use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(TS, Debug, Serialize, Deserialize, Clone)]
#[ts(export)]
pub struct ShyTopic {
    pub title: String,
    pub topic_id: String,
    pub channel_id: String,
    pub total_reply_count: i32,
    pub content: String,
    pub shy_topic_proof_id: String,
    pub author_public_key: String,
    pub author_sig: String,
    #[ts(type = "string[]")]
    pub participant_identity_inputs: sqlx::types::Json<Vec<String>>,
    pub sub_channel_id: String,
    pub total_like_count: i64,
}

#[derive(TS, Debug, Serialize, Deserialize, Clone)]
#[ts(export)]
pub struct ShyTopicSyn1 {
    pub shy_topic: ShyTopic,
    pub proof_identity_input: String,
}
