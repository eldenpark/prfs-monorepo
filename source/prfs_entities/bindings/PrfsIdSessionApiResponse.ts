// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { DeletePrfsIdSessionValueResponse } from "./DeletePrfsIdSessionValueResponse";
import type { PutPrfsIdSessionValueResponse } from "./PutPrfsIdSessionValueResponse";

export type PrfsIdSessionApiResponse =
  | ({ type: "put_prfs_id_session_value" } & PutPrfsIdSessionValueResponse)
  | ({ type: "delete_prfs_id_session_value" } & DeletePrfsIdSessionValueResponse);
