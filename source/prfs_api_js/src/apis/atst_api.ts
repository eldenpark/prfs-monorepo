import { api, ApiResponse } from "@taigalabs/prfs-api-lib-js";
import { PrfsAtstApiRequest } from "@taigalabs/prfs-entities/bindings/PrfsAtstApiRequest";
import { PrfsAtstApiResponse } from "@taigalabs/prfs-entities/bindings/PrfsAtstApiResponse";
import { AttestTwitterAccRequest } from "@taigalabs/prfs-entities/bindings/AttestTwitterAccRequest";
import { AttestTwitterAccResponse } from "@taigalabs/prfs-entities/bindings/AttestTwitterAccResponse";
import { ValidateTwitterAccRequest } from "@taigalabs/prfs-entities/bindings/ValidateTwitterAccRequest";
import { ValidateTwitterAccResponse } from "@taigalabs/prfs-entities/bindings/ValidateTwitterAccResponse";
import { GetTwitterAccAtstsRequest } from "@taigalabs/prfs-entities/bindings/GetTwitterAccAtstsRequest";
import { GetTwitterAccAtstsResponse } from "@taigalabs/prfs-entities/bindings/GetTwitterAccAtstsResponse";
import { GetTwitterAccAtstRequest } from "@taigalabs/prfs-entities/bindings/GetTwitterAccAtstRequest";
import { GetTwitterAccAtstResponse } from "@taigalabs/prfs-entities/bindings/GetTwitterAccAtstResponse";
import { FetchCryptoAssetRequest } from "@taigalabs/prfs-entities/bindings/FetchCryptoAssetRequest";
import { FetchCryptoAssetResponse } from "@taigalabs/prfs-entities/bindings/FetchCryptoAssetResponse";
import { CreateCryptoAssetSizeAtstRequest } from "@taigalabs/prfs-entities/bindings/CreateCryptoAssetSizeAtstRequest";
import { CreateCryptoAssetSizeAtstResponse } from "@taigalabs/prfs-entities/bindings/CreateCryptoAssetSizeAtstResponse";
import { GetCryptoAssetSizeAtstsRequest } from "@taigalabs/prfs-entities/bindings/GetCryptoAssetSizeAtstsRequest";
import { GetCryptoAssetSizeAtstsResponse } from "@taigalabs/prfs-entities/bindings/GetCryptoAssetSizeAtstsResponse";
import { GetCryptoAssetSizeAtstRequest } from "@taigalabs/prfs-entities/bindings/GetCryptoAssetSizeAtstRequest";
import { GetCryptoAssetSizeAtstResponse } from "@taigalabs/prfs-entities/bindings/GetCryptoAssetSizeAtstResponse";
import { ComputeCryptoAssetSizeTotalValuesRequest } from "@taigalabs/prfs-entities/bindings/ComputeCryptoAssetSizeTotalValuesRequest";
import { ComputeCryptoAssetSizeTotalValuesResponse } from "@taigalabs/prfs-entities/bindings/ComputeCryptoAssetSizeTotalValuesResponse";

type RequestName =
  | "attest_twitter_acc"
  | "validate_twitter_acc"
  | "get_twitter_acc_atsts"
  | "get_twitter_acc_atst"
  | "fetch_crypto_asset"
  | "create_crypto_asset_size_atst"
  | "get_crypto_asset_size_atsts"
  | "get_crypto_asset_size_atst"
  | "compute_crypto_asset_size_total_values";

type Req<T extends RequestName> = //
  T extends "attest_twitter_acc"
    ? AttestTwitterAccRequest
    : T extends "validate_twitter_acc"
    ? ValidateTwitterAccRequest
    : T extends "get_twitter_acc_atsts"
    ? GetTwitterAccAtstsRequest
    : T extends "get_twitter_acc_atst"
    ? GetTwitterAccAtstRequest
    : T extends "fetch_crypto_asset"
    ? FetchCryptoAssetRequest
    : T extends "create_crypto_asset_size_atst"
    ? CreateCryptoAssetSizeAtstRequest
    : T extends "get_crypto_asset_size_atsts"
    ? GetCryptoAssetSizeAtstsRequest
    : T extends "get_crypto_asset_size_atst"
    ? GetCryptoAssetSizeAtstRequest
    : T extends "compute_crypto_asset_size_total_values"
    ? ComputeCryptoAssetSizeTotalValuesRequest
    : never;

type Resp<T extends RequestName> = //
  T extends "attest_twitter_acc"
    ? ApiResponse<AttestTwitterAccResponse>
    : T extends "validate_twitter_acc"
    ? ApiResponse<ValidateTwitterAccResponse>
    : T extends "get_twitter_acc_atsts"
    ? ApiResponse<GetTwitterAccAtstsResponse>
    : T extends "get_twitter_acc_atst"
    ? ApiResponse<GetTwitterAccAtstResponse>
    : T extends "fetch_crypto_asset"
    ? ApiResponse<FetchCryptoAssetResponse>
    : T extends "create_crypto_asset_size_atst"
    ? ApiResponse<CreateCryptoAssetSizeAtstResponse>
    : T extends "get_crypto_asset_size_atsts"
    ? ApiResponse<GetCryptoAssetSizeAtstsResponse>
    : T extends "get_crypto_asset_size_atst"
    ? ApiResponse<GetCryptoAssetSizeAtstResponse>
    : T extends "compute_crypto_asset_size_total_values"
    ? ApiResponse<ComputeCryptoAssetSizeTotalValuesResponse>
    : any;

let endpoint: string;
if (typeof process !== "undefined") {
  if (!process.env.NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT) {
    throw new Error("atst api endpoint not defined");
  }
  endpoint = `${process.env.NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT}/atst_api/v0`;
} else {
  throw new Error("process is undefined");
}

// export async function atstApi<T extends RequestName>(name: T, req: Req<T>): Promise<Resp<T>> {
//   return (await api(
//     {
//       path: name,
//       req,
//     },
//     endpoint,
//   )) as Resp<T>;
// }

export async function atstApi<
  T extends { type: PrfsAtstApiRequest["type"] },
  R extends { type: T["type"] } & PrfsAtstApiResponse,
>(req: T): Promise<ApiResponse<R>> {
  return api<R>(
    {
      path: req.type,
      req,
    },
    endpoint,
  );
}
