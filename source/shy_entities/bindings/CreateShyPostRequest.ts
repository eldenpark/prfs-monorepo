// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ShyPost } from "./ShyPost";

export interface CreateShyPostRequest {
  post: ShyPost;
  shy_post_proof_id: string;
  proof: Array<number>;
  public_inputs: string;
  public_key: string;
}
