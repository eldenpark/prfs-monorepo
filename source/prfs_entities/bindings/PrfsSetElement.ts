// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { PrfsSetElementStatus } from "./PrfsSetElementStatus";

export type PrfsSetElement = {
  element_id: string;
  set_id: string;
  data: Record<string, string>;
  element_idx: number;
  ref: string | null;
  status: PrfsSetElementStatus;
};
