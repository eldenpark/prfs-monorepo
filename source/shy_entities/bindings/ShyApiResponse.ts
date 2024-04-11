// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CreateShyPostResponse } from "./CreateShyPostResponse";
import type { CreateShyTopicResponse } from "./CreateShyTopicResponse";
import type { GetShyChannelResponse } from "./GetShyChannelResponse";
import type { GetShyChannelsResponse } from "./GetShyChannelsResponse";
import type { GetShyPostsOfTopicResponse } from "./GetShyPostsOfTopicResponse";
import type { GetShyProofResponse } from "./GetShyProofResponse";
import type { GetShyTopicResponse } from "./GetShyTopicResponse";
import type { GetShyTopicsResponse } from "./GetShyTopicsResponse";
import type { SignInShyAccountResponse } from "./SignInShyAccountResponse";
import type { SignUpShyAccountResponse } from "./SignUpShyAccountResponse";

export type ShyApiResponse =
  | ({ type: "create_shy_topic" } & CreateShyTopicResponse)
  | ({ type: "create_shy_post" } & CreateShyPostResponse)
  | ({ type: "create_shy_post_with_proof" } & CreateShyPostResponse)
  | ({ type: "sign_up_shy_account" } & SignUpShyAccountResponse)
  | ({ type: "sign_in_shy_account" } & SignInShyAccountResponse)
  | ({ type: "get_shy_channels" } & GetShyChannelsResponse)
  | ({ type: "get_shy_channel" } & GetShyChannelResponse)
  | ({ type: "get_shy_topics" } & GetShyTopicsResponse)
  | ({ type: "get_shy_topic" } & GetShyTopicResponse)
  | ({ type: "get_shy_proof" } & GetShyProofResponse)
  | ({ type: "get_shy_posts_of_topic" } & GetShyPostsOfTopicResponse);
