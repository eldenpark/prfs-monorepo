// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { PrfsSetElementStatus } from "./PrfsSetElementStatus";

export interface PrfsSetElement {
  name: string;
  set_id: string;
  data: Record<string, string>[];
  ref: string | null;
  status: PrfsSetElementStatus;
}
