use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::{
    CreateShyPostRequest, CreateShyPostResponse, CreateShyTopicRequest, CreateShyTopicResponse,
    GetShyChannelResponse, GetShyChannelsRequest, GetShyChannelsResponse,
    GetShyPostsOfTopicRequest, GetShyPostsOfTopicResponse, GetShyTopicProofRequest,
    GetShyTopicProofResponse, GetShyTopicRequest, GetShyTopicResponse, GetShyTopicsRequest,
    GetShyTopicsResponse,
};

#[derive(Serialize, Deserialize, Debug, TS)]
#[allow(non_camel_case_types)]
#[serde(tag = "type")]
#[ts(export)]
pub enum ShyApiRequest {
    create_shy_topic(CreateShyTopicRequest),
    create_shy_post(CreateShyPostRequest),
    get_shy_channels(GetShyChannelsRequest),
    get_shy_channel(GetShyChannelsRequest),
    get_shy_topics(GetShyTopicsRequest),
    get_shy_topic(GetShyTopicRequest),
    get_shy_topic_proof(GetShyTopicProofRequest),
    get_shy_posts_of_topic(GetShyPostsOfTopicRequest),
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[allow(non_camel_case_types)]
#[serde(tag = "type")]
#[ts(export)]
pub enum ShyApiResponse {
    create_shy_topic(CreateShyTopicResponse),
    create_shy_post(CreateShyPostResponse),
    get_shy_channels(GetShyChannelsResponse),
    get_shy_channel(GetShyChannelResponse),
    get_shy_topics(GetShyTopicsResponse),
    get_shy_topic(GetShyTopicResponse),
    get_shy_topic_proof(GetShyTopicProofResponse),
    get_shy_posts_of_topic(GetShyPostsOfTopicResponse),
}
