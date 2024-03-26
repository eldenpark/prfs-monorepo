import { CachedProveReceipt, ProveReceipt } from "@taigalabs/prfs-driver-interface";

import { createQueryString } from "../search_params";
import { CommitmentQuery } from "../queries/commitment";
import { CreateProofQuery } from "../queries/create_proof";
import { EncryptQuery } from "../queries/encrypt";
import { AppSignInQuery } from "../queries/app_sign_in";
import { RandKeyPairQuery } from "../queries/rand_key_pair";
import { AppSignInResult, CommitmentReceipt, EncryptedReceipt, RandKeyPairReceipt } from "..";

export function makeProofGenSearchParams(args: ProofGenArgs): string {
  const s = "?" + createQueryString(args);
  return s;
}

export function parseProofGenSearchParams(searchParams: URLSearchParams): ProofGenArgs {
  const public_key = searchParams.get("public_key");
  const app_id = searchParams.get("app_id");
  const nonce = searchParams.get("nonce");
  const queries = searchParams.get("queries");
  const session_key = searchParams.get("session_key");

  if (!app_id) {
    throw new Error("app id missing");
  }

  if (!public_key) {
    throw new Error("public key missing");
  }

  if (!queries) {
    throw new Error("query missing");
  }

  if (!nonce) {
    throw new Error("nonce missing");
  }

  if (!session_key) {
    throw new Error("session_key missing");
  }

  const args: ProofGenArgs = {
    app_id,
    nonce: Number(nonce),
    public_key,
    session_key,
    queries: JSON.parse(decodeURIComponent(queries)),
  };

  return args;
}

export interface ProofGenArgs {
  nonce: number;
  app_id: string;
  queries: ProofGenQuery[];
  public_key: string;
  session_key: string;
}

export interface ProofGenSuccessPayload {
  receipt: Record<string, any>;
}

export type ProofGenReceiptItems =
  | ProveReceipt
  | CachedProveReceipt
  | CommitmentReceipt
  | RandKeyPairReceipt
  | AppSignInResult
  | EncryptedReceipt;

export type ProofGenQuery =
  | CommitmentQuery
  | CreateProofQuery
  | EncryptQuery
  | AppSignInQuery
  | RandKeyPairQuery;
