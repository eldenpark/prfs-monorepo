// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CryptoAsset } from "./CryptoAsset";

export interface CreateCryptoAssetSizeAtstRequest {
  atst_id: string;
  atst_type: string;
  wallet_addr: string;
  serial_no: string;
  cm: string;
  crypto_assets: Array<CryptoAsset>;
}
