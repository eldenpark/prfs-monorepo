// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CreateShyPostResponse } from "./CreateShyPostResponse";
import type { GetShyChannelResponse } from "./GetShyChannelResponse";
import type { GetShyChannelsResponse } from "./GetShyChannelsResponse";
import type { GetShyPostsResponse } from "./GetShyPostsResponse";

export type ShyApiResponse =
  | ({ type: "create_shy_post" } & CreateShyPostResponse)
  | ({ type: "get_shy_channels" } & GetShyChannelsResponse)
  | ({ type: "get_shy_posts" } & GetShyPostsResponse)
  | ({ type: "get_shy_channel" } & GetShyChannelResponse);
