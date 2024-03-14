import { PrfsSignUpRequest } from "@taigalabs/prfs-entities/bindings/PrfsSignUpRequest";
import { PrfsSignUpResponse } from "@taigalabs/prfs-entities/bindings/PrfsSignUpResponse";
import { PrfsSignInRequest } from "@taigalabs/prfs-entities/bindings/PrfsSignInRequest";
import { PrfsSignInResponse } from "@taigalabs/prfs-entities/bindings/PrfsSignInResponse";
import { GetPrfsCircuitDriversRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitDriversRequest";
import { GetPrfsCircuitDriversResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitDriversResponse";
import { GetPrfsCircuitDriverByDriverIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitDriverByDriverIdRequest";
import { GetPrfsCircuitDriverByDriverIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitDriverByDriverIdResponse";
import { GetPrfsCircuitTypesRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitTypesRequest";
import { GetPrfsCircuitTypesResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitTypesResponse";
import { GetPrfsCircuitTypeByCircuitTypeIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitTypeByCircuitTypeIdRequest";
import { GetPrfsCircuitTypeByCircuitTypeIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitTypeByCircuitTypeIdResponse";
import { GetPrfsCircuitsRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitsRequest";
import { GetPrfsCircuitsResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitsResponse";
import { GetPrfsCircuitByCircuitIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitByCircuitIdRequest";
import { GetPrfsCircuitByCircuitIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsCircuitByCircuitIdResponse";
import { GetPrfsProofInstanceByShortIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsProofInstanceByShortIdResponse";
import { GetPrfsProofInstanceByShortIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsProofInstanceByShortIdRequest";
import { GetPrfsProofInstancesResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsProofInstancesResponse";
import { GetPrfsProofInstancesRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsProofInstancesRequest";
import { GetPrfsProofInstanceByInstanceIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsProofInstanceByInstanceIdRequest";
import { GetPrfsProofInstanceByInstanceIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsProofInstanceByInstanceIdResponse";
import { CreatePrfsProofInstanceRequest } from "@taigalabs/prfs-entities/bindings/CreatePrfsProofInstanceRequest";
import { CreatePrfsProofInstanceResponse } from "@taigalabs/prfs-entities/bindings/CreatePrfsProofInstanceResponse";
import { GetPrfsProofTypesRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsProofTypesRequest";
import { GetPrfsProofTypeByProofTypeIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsProofTypeByProofTypeIdRequest";
import { GetPrfsProofTypeByProofTypeIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsProofTypeByProofTypeIdResponse";
import { GetPrfsProofTypesResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsProofTypesResponse";
import { CreatePrfsProofTypeRequest } from "@taigalabs/prfs-entities/bindings/CreatePrfsProofTypeRequest";
import { CreatePrfsProofTypeResponse } from "@taigalabs/prfs-entities/bindings/CreatePrfsProofTypeResponse";
import { GetPrfsSetsRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsSetsRequest";
import { GetPrfsSetsBySetTypeRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsSetsBySetTypeRequest";
import { GetPrfsSetsResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsSetsResponse";
import { GetPrfsSetBySetIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsSetBySetIdRequest";
import { GetPrfsSetBySetIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsSetBySetIdResponse";
import { CreatePrfsSetRequest } from "@taigalabs/prfs-entities/bindings/CreatePrfsSetRequest";
import { CreatePrfsSetResponse } from "@taigalabs/prfs-entities/bindings/CreatePrfsSetResponse";
import { CreatePrfsDynamicSetElementRequest } from "@taigalabs/prfs-entities/bindings/CreatePrfsDynamicSetElementRequest";
import { CreatePrfsDynamicSetElementResponse } from "@taigalabs/prfs-entities/bindings/CreatePrfsDynamicSetElementResponse";
import { GetPrfsTreeLeafNodesBySetIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsTreeLeafNodesBySetIdRequest";
import { GetPrfsTreeLeafIndicesRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsTreeLeafIndicesRequest";
import { GetPrfsTreeNodesByPosRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsTreeNodesByPosRequest";
import { GetPrfsTreeNodesResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsTreeNodesResponse";
import { UpdatePrfsTreeNodeRequest } from "@taigalabs/prfs-entities/bindings/UpdatePrfsTreeNodeRequest";
import { UpdatePrfsTreeNodeResponse } from "@taigalabs/prfs-entities/bindings/UpdatePrfsTreeNodeResponse";
// import { ComputePrfsSetMerkleRootRequest } from "@taigalabs/prfs-entities/bindings/ComputePrfsSetMerkleRootRequest";
import { ComputePrfsSetMerkleRootResponse } from "@taigalabs/prfs-entities/bindings/ComputePrfsSetMerkleRootResponse";
import { CreatePrfsPollRequest } from "@taigalabs/prfs-entities/bindings/CreatePrfsPollRequest";
import { CreatePrfsPollResponse } from "@taigalabs/prfs-entities/bindings/CreatePrfsPollResponse";
import { GetPrfsPollsRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsPollsRequest";
import { GetPrfsPollsResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsPollsResponse";
import { GetPrfsPollByPollIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsPollByPollIdRequest";
import { GetPrfsPollByPollIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsPollByPollIdResponse";
import { SubmitPrfsPollResponseRequest } from "@taigalabs/prfs-entities/bindings/SubmitPrfsPollResponseRequest";
import { SubmitPrfsPollResponseResponse } from "@taigalabs/prfs-entities/bindings/SubmitPrfsPollResponseResponse";
import { GetPrfsPollResultByPollIdRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsPollResultByPollIdRequest";
import { GetPrfsPollResultByPollIdResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsPollResultByPollIdResponse";
import { ImportPrfsSetElementsRequest } from "@taigalabs/prfs-entities/bindings/ImportPrfsSetElementsRequest";
import { ImportPrfsSetElementsResponse } from "@taigalabs/prfs-entities/bindings/ImportPrfsSetElementsResponse";
import { GetPrfsSetElementsRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsSetElementsRequest";
import { GetPrfsSetElementsResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsSetElementsResponse";
import { GetPrfsSetElementRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsSetElementRequest";
import { GetPrfsSetElementResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsSetElementResponse";
import { GetLeastRecentPrfsIndexRequest } from "@taigalabs/prfs-entities/bindings/GetLeastRecentPrfsIndexRequest";
import { GetLeastRecentPrfsIndexResponse } from "@taigalabs/prfs-entities/bindings/GetLeastRecentPrfsIndexResponse";
import { GetPrfsIndicesRequest } from "@taigalabs/prfs-entities/bindings/GetPrfsIndicesRequest";
import { GetPrfsIndicesResponse } from "@taigalabs/prfs-entities/bindings/GetPrfsIndicesResponse";
import { AddPrfsIndexRequest } from "@taigalabs/prfs-entities/bindings/AddPrfsIndexRequest";
import { AddPrfsIndexResponse } from "@taigalabs/prfs-entities/bindings/AddPrfsIndexResponse";

import { api } from "../utils";
import { ApiResponse } from "../types";

type RequestName =
  | "sign_up_prfs_account"
  | "sign_in_prfs_account"
  | "get_prfs_circuit_drivers"
  | "get_prfs_circuit_driver_by_driver_id"
  | "get_prfs_circuit_types"
  | "get_prfs_circuit_type_by_circuit_type_id"
  | "get_prfs_circuits"
  | "get_prfs_circuit_by_circuit_id"
  | "create_prfs_proof_instance"
  | "get_prfs_proof_instances"
  | "get_prfs_proof_instance_by_instance_id"
  | "get_prfs_proof_instance_by_short_id"
  | "create_prfs_proof_type"
  | "get_prfs_proof_types"
  | "get_prfs_proof_type_by_proof_type_id"
  | "get_prfs_sets"
  | "create_prfs_set"
  | "get_prfs_sets_by_set_type"
  | "get_prfs_set_by_set_id"
  | "create_prfs_dynamic_set_element"
  | "get_prfs_tree_nodes_by_pos"
  | "get_prfs_tree_leaf_nodes_by_set_id"
  | "get_prfs_tree_leaf_indices"
  | "update_prfs_tree_node"
  // | "compute_prfs_set_merkle_root"
  | "create_prfs_poll"
  | "get_prfs_polls"
  | "get_prfs_poll_by_poll_id"
  | "submit_prfs_poll_response"
  | "get_prfs_poll_result_by_poll_id"
  | "create_social_post"
  | "get_social_posts"
  | "import_prfs_set_elements"
  | "get_prfs_set_elements"
  | "get_prfs_set_element"
  | "create_tree_of_prfs_set"
  | "get_least_recent_prfs_index"
  | "get_prfs_indices"
  | "add_prfs_index";

type Req<T extends RequestName> = //
  T extends "sign_up_prfs_account"
    ? PrfsSignUpRequest
    : T extends "sign_in_prfs_account"
    ? PrfsSignInRequest
    : T extends "get_prfs_circuit_drivers"
    ? GetPrfsCircuitDriversRequest
    : T extends "get_prfs_circuit_driver_by_driver_id"
    ? GetPrfsCircuitDriverByDriverIdRequest
    : T extends "get_prfs_circuit_types"
    ? GetPrfsCircuitTypesRequest
    : T extends "get_prfs_circuit_type_by_circuit_type_id"
    ? GetPrfsCircuitTypeByCircuitTypeIdRequest
    : T extends "get_prfs_circuits"
    ? GetPrfsCircuitsRequest
    : T extends "get_prfs_circuit_by_circuit_id"
    ? GetPrfsCircuitByCircuitIdRequest
    : T extends "create_prfs_proof_instance"
    ? CreatePrfsProofInstanceRequest
    : T extends "get_prfs_proof_instances"
    ? GetPrfsProofInstancesRequest
    : T extends "get_prfs_proof_instance_by_instance_id"
    ? GetPrfsProofInstanceByInstanceIdRequest
    : T extends "get_prfs_proof_instance_by_short_id"
    ? GetPrfsProofInstanceByShortIdRequest
    : T extends "create_prfs_proof_type"
    ? CreatePrfsProofTypeRequest
    : T extends "get_prfs_proof_types"
    ? GetPrfsProofTypesRequest
    : T extends "get_prfs_proof_type_by_proof_type_id"
    ? GetPrfsProofTypeByProofTypeIdRequest
    : T extends "get_prfs_sets"
    ? GetPrfsSetsRequest
    : T extends "create_prfs_set"
    ? CreatePrfsSetRequest
    : T extends "get_prfs_sets_by_set_type"
    ? GetPrfsSetsBySetTypeRequest
    : T extends "get_prfs_set_by_set_id"
    ? GetPrfsSetBySetIdRequest
    : T extends "create_prfs_dynamic_set_element"
    ? CreatePrfsDynamicSetElementRequest
    : T extends "get_prfs_tree_nodes_by_pos"
    ? GetPrfsTreeNodesByPosRequest
    : T extends "get_prfs_tree_leaf_nodes_by_set_id"
    ? GetPrfsTreeLeafNodesBySetIdRequest
    : T extends "get_prfs_tree_leaf_indices"
    ? GetPrfsTreeLeafIndicesRequest
    : T extends "update_prfs_tree_node"
    ? UpdatePrfsTreeNodeRequest
    : // : T extends "compute_prfs_set_merkle_root"
    // ? ComputePrfsSetMerkleRootRequest
    T extends "create_prfs_poll"
    ? CreatePrfsPollRequest
    : T extends "get_prfs_polls"
    ? GetPrfsPollsRequest
    : T extends "get_prfs_poll_by_poll_id"
    ? GetPrfsPollByPollIdRequest
    : T extends "submit_prfs_poll_response"
    ? SubmitPrfsPollResponseRequest
    : T extends "get_prfs_poll_result_by_poll_id"
    ? GetPrfsPollResultByPollIdRequest
    : T extends "import_prfs_set_elements"
    ? ImportPrfsSetElementsRequest
    : T extends "get_prfs_set_elements"
    ? GetPrfsSetElementsRequest
    : T extends "get_prfs_set_element"
    ? GetPrfsSetElementRequest
    : T extends "get_least_recent_prfs_index"
    ? GetLeastRecentPrfsIndexRequest
    : T extends "get_prfs_indices"
    ? GetPrfsIndicesRequest
    : T extends "add_prfs_index"
    ? AddPrfsIndexRequest
    : never;

type Resp<T> = //
  T extends "sign_up_prfs_account"
    ? ApiResponse<PrfsSignUpResponse>
    : T extends "sign_in_prfs_account"
    ? ApiResponse<PrfsSignInResponse>
    : T extends "get_prfs_circuit_drivers"
    ? ApiResponse<GetPrfsCircuitDriversResponse>
    : T extends "get_prfs_circuit_driver_by_driver_id"
    ? ApiResponse<GetPrfsCircuitDriverByDriverIdResponse>
    : T extends "get_prfs_circuit_types"
    ? ApiResponse<GetPrfsCircuitTypesResponse>
    : T extends "get_prfs_circuit_type_by_circuit_type_id"
    ? ApiResponse<GetPrfsCircuitTypeByCircuitTypeIdResponse>
    : T extends "get_prfs_circuits"
    ? ApiResponse<GetPrfsCircuitsResponse>
    : T extends "get_prfs_circuit_by_circuit_id"
    ? ApiResponse<GetPrfsCircuitByCircuitIdResponse>
    : T extends "create_prfs_proof_instance"
    ? ApiResponse<CreatePrfsProofInstanceResponse>
    : T extends "get_prfs_proof_instances"
    ? ApiResponse<GetPrfsProofInstancesResponse>
    : T extends "get_prfs_proof_instance_by_instance_id"
    ? ApiResponse<GetPrfsProofInstanceByInstanceIdResponse>
    : T extends "get_prfs_proof_instance_by_short_id"
    ? ApiResponse<GetPrfsProofInstanceByShortIdResponse>
    : T extends "create_prfs_proof_type"
    ? ApiResponse<CreatePrfsProofTypeResponse>
    : T extends "get_prfs_proof_types"
    ? ApiResponse<GetPrfsProofTypesResponse>
    : T extends "get_prfs_proof_type_by_proof_type_id"
    ? ApiResponse<GetPrfsProofTypeByProofTypeIdResponse>
    : T extends "get_prfs_sets"
    ? ApiResponse<GetPrfsSetsResponse>
    : T extends "create_prfs_set"
    ? ApiResponse<CreatePrfsSetResponse>
    : T extends "get_prfs_sets_by_set_type"
    ? ApiResponse<GetPrfsSetsResponse>
    : T extends "get_prfs_set_by_set_id"
    ? ApiResponse<GetPrfsSetBySetIdResponse>
    : T extends "create_prfs_dynamic_set_element"
    ? ApiResponse<CreatePrfsDynamicSetElementResponse>
    : T extends "get_prfs_tree_nodes_by_pos"
    ? ApiResponse<GetPrfsTreeNodesResponse>
    : T extends "get_prfs_tree_leaf_nodes_by_set_id"
    ? ApiResponse<GetPrfsTreeNodesResponse>
    : T extends "get_prfs_tree_leaf_indices"
    ? ApiResponse<GetPrfsTreeNodesResponse>
    : T extends "update_prfs_tree_node"
    ? ApiResponse<UpdatePrfsTreeNodeResponse>
    : // : T extends "compute_prfs_set_merkle_root"
    // ? ApiResponse<ComputePrfsSetMerkleRootResponse>
    T extends "create_prfs_poll"
    ? ApiResponse<CreatePrfsPollResponse>
    : T extends "get_prfs_polls"
    ? ApiResponse<GetPrfsPollsResponse>
    : T extends "get_prfs_poll_by_poll_id"
    ? ApiResponse<GetPrfsPollByPollIdResponse>
    : T extends "submit_prfs_poll_response"
    ? ApiResponse<SubmitPrfsPollResponseResponse>
    : T extends "get_prfs_poll_result_by_poll_id"
    ? ApiResponse<GetPrfsPollResultByPollIdResponse>
    : T extends "import_prfs_atsts_to_prfs_set"
    ? ApiResponse<GetPrfsPollResultByPollIdResponse>
    : T extends "import_prfs_set_elements"
    ? ApiResponse<ImportPrfsSetElementsResponse>
    : T extends "get_prfs_set_elements"
    ? ApiResponse<GetPrfsSetElementsResponse>
    : T extends "get_prfs_set_element"
    ? ApiResponse<GetPrfsSetElementResponse>
    : T extends "get_least_recent_prfs_index"
    ? ApiResponse<GetLeastRecentPrfsIndexResponse>
    : T extends "get_prfs_indices"
    ? ApiResponse<GetPrfsIndicesResponse>
    : T extends "add_prfs_index"
    ? ApiResponse<AddPrfsIndexResponse>
    : any;

let endpoint: string;
if (typeof process !== "undefined") {
  if (!process.env.NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT) {
    throw new Error("prfs api endpoint not defined");
  }
  endpoint = `${process.env.NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT}/api/v0`;
} else {
  throw new Error("process is undefined");
}

export async function prfsApi2<T extends RequestName>(name: T, req: Req<T>): Promise<Resp<T>> {
  return (await api<T>(
    {
      path: name,
      req,
    },
    endpoint,
  )) as Resp<T>;
}
