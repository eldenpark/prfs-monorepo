// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { DateTimed } from "./DateTimed";
import type { ShyPostSyn1 } from "./ShyPostSyn1";

export interface GetShyPostsOfTopicResponse {
  rows: Array<DateTimed<ShyPostSyn1>>;
  next_offset: number | null;
}
