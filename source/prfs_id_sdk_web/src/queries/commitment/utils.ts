import { sigPoseidon } from "@taigalabs/prfs-crypto-js";

import { PRFS_ATTESTATION_STEM } from "../attestation";

export const WALLET_CACHE_KEY = "wallet_cache_key";
export const WALLET_CM_STEM = "WALLET";

export async function makeWalletCacheKeyCm(sk: string, idx: number) {
  return sigPoseidon(sk, `${WALLET_CM_STEM}_${idx}`);
}

export async function makeAppSignInCm(sk: string, appId: string) {
  return sigPoseidon(sk, appId);
}

export function makeAtstCmPreImage(arg: string) {
  return `${PRFS_ATTESTATION_STEM}${arg}`;
}

export function makeAtstCm(sk: string, arg: string) {
  return sigPoseidon(sk, makeAtstCmPreImage(arg));
}
