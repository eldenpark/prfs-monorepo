// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { DateTimed } from "./DateTimed";
import type { ShyTopicSyn1 } from "./ShyTopicSyn1";

export type GetShyTopicsResponse = {
  shy_topics: Array<DateTimed<ShyTopicSyn1>>;
  next_offset: number | null;
};
