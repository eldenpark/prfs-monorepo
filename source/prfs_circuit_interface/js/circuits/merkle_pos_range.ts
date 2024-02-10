import { CircuitTypeId } from "../../bindings/CircuitTypeId";
import { SpartanMerkleProof } from "../merkle_proof";

export const MERKLE_SIG_POS_RANGE_V1_CIRCUIT_TYPE: CircuitTypeId = "merkle_sig_pos_range_v1";

export const MERKLE_POS_RANGE_V1_CIRCUIT_ID =
  "0x0000000000000000000000000000000000000000000000000000000000000002";

export const MERKLE_POS_RANGE_V1_CIRCUIT_URL = `prfs://${MERKLE_SIG_POS_RANGE_V1_CIRCUIT_TYPE}/\
${MERKLE_SIG_POS_RANGE_V1_CIRCUIT_TYPE}.spartan.circuit`;

export const MERKLE_POS_RANGE_V1_WTNS_GEN_URL = `prfs://${MERKLE_SIG_POS_RANGE_V1_CIRCUIT_TYPE}/\
${MERKLE_SIG_POS_RANGE_V1_CIRCUIT_TYPE}_js/${MERKLE_SIG_POS_RANGE_V1_CIRCUIT_TYPE}.wasm`;

export interface MerklePosRangeInputs {
  leaf: bigint;
  asset_size: bigint;
  asset_size_max_limit: bigint;
  merkleProof: SpartanMerkleProof;
}
