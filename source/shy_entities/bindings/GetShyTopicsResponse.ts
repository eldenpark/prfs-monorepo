// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { DateTimed } from "./DateTimed";
import type { ShyTopicPost } from "./ShyTopicPost";

export interface GetShyTopicsResponse {
  shy_topic_posts: Array<DateTimed<ShyTopicPost>>;
  next_offset: number | null;
}
