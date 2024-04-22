use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::{CreatePrfsProofRequest, CreatePrfsProofResponse};

use super::{
    AddPrfsIndexRequest, AddPrfsIndexResponse, CreatePrfsDynamicSetElementRequest,
    CreatePrfsDynamicSetElementResponse, CreatePrfsPollRequest, CreatePrfsPollResponse,
    CreatePrfsProofInstanceRequest, CreatePrfsProofInstanceResponse, CreatePrfsProofRecordRequest,
    CreatePrfsProofRecordResponse, CreatePrfsProofTypeRequest, CreatePrfsProofTypeResponse,
    CreatePrfsSetRequest, CreatePrfsSetResponse, GetLeastRecentPrfsIndexRequest,
    GetLeastRecentPrfsIndexResponse, GetPrfsCircuitByCircuitIdRequest,
    GetPrfsCircuitByCircuitIdResponse, GetPrfsCircuitDriverByDriverIdRequest,
    GetPrfsCircuitDriverByDriverIdResponse, GetPrfsCircuitDriversRequest,
    GetPrfsCircuitDriversResponse, GetPrfsCircuitTypeByCircuitTypeIdRequest,
    GetPrfsCircuitTypeByCircuitTypeIdResponse, GetPrfsCircuitTypesRequest,
    GetPrfsCircuitTypesResponse, GetPrfsCircuitsRequest, GetPrfsCircuitsResponse,
    GetPrfsIndicesRequest, GetPrfsIndicesResponse, GetPrfsPollByPollIdRequest,
    GetPrfsPollByPollIdResponse, GetPrfsPollsRequest, GetPrfsPollsResponse,
    GetPrfsProofInstanceByInstanceIdRequest, GetPrfsProofInstanceByInstanceIdResponse,
    GetPrfsProofInstanceByShortIdRequest, GetPrfsProofInstanceByShortIdResponse,
    GetPrfsProofInstancesRequest, GetPrfsProofInstancesResponse, GetPrfsProofRecordRequest,
    GetPrfsProofRecordResponse, GetPrfsProofTypeByProofTypeIdRequest,
    GetPrfsProofTypeByProofTypeIdResponse, GetPrfsProofTypesRequest, GetPrfsProofTypesResponse,
    GetPrfsSetBySetIdRequest, GetPrfsSetBySetIdResponse, GetPrfsSetsRequest, GetPrfsSetsResponse,
    SignInPrfsAccountRequest, SignInPrfsAccountResponse, SignUpPrfsAccountRequest,
    SubmitPrfsPollResponseRequest, SubmitPrfsPollResponseResponse,
};

#[derive(Serialize, Deserialize, Debug, TS)]
#[allow(non_camel_case_types)]
#[serde(tag = "type")]
#[ts(export)]
pub enum PrfsApiRequest {
    GetPrfsCircuits(GetPrfsCircuitsRequest),
    GetPrfsCircuitByCircuitId(GetPrfsCircuitByCircuitIdRequest),
    sign_in_prfs_account(SignInPrfsAccountRequest),
    sign_up_prfs_account(SignUpPrfsAccountRequest),
    GetPrfsCircuitDrivers(GetPrfsCircuitDriversRequest),
    GetPrfsCircuitDriverByDriverId(GetPrfsCircuitDriverByDriverIdRequest),
    GetPrfsCircuitTypes(GetPrfsCircuitTypesRequest),
    GetPrfsCircuitTypeByCircuitTypeId(GetPrfsCircuitTypeByCircuitTypeIdRequest),
    get_least_recent_prfs_index(GetLeastRecentPrfsIndexRequest),
    get_prfs_indices(GetPrfsIndicesRequest),
    add_prfs_index(AddPrfsIndexRequest),
    GetPrfsPolls(GetPrfsPollsRequest),
    CreatePrfsPoll(CreatePrfsPollRequest),
    GetPrfsPollByPollId(GetPrfsPollByPollIdRequest),
    SubmitPrfsPollResponse(SubmitPrfsPollResponseRequest),
    GetPrfsProofInstances(GetPrfsProofInstancesRequest),
    get_prfs_proof_instance_by_instance_id(GetPrfsProofInstanceByInstanceIdRequest),
    get_prfs_proof_instance_by_short_id(GetPrfsProofInstanceByShortIdRequest),
    create_prfs_proof_instance(CreatePrfsProofInstanceRequest),
    create_prfs_proof(CreatePrfsProofRequest),
    get_prfs_proof_types(GetPrfsProofTypesRequest),
    get_prfs_proof_type_by_proof_type_id(GetPrfsProofTypeByProofTypeIdRequest),
    CreatePrfsProofType(CreatePrfsProofTypeRequest),
    get_prfs_set_by_set_id(GetPrfsSetBySetIdRequest),
    GetPrfsSets(GetPrfsSetsRequest),
    create_prfs_set(CreatePrfsSetRequest),
    CreatePrfsDynamicSetElement(CreatePrfsDynamicSetElementRequest),
    create_prfs_proof_record(CreatePrfsProofRecordRequest),
    get_prfs_proof_record(GetPrfsProofRecordRequest),
}

#[derive(Serialize, Deserialize, Debug, TS)]
#[allow(non_camel_case_types)]
#[serde(tag = "type")]
#[ts(export)]
pub enum PrfsApiResponse {
    GetPrfsCircuits(GetPrfsCircuitsResponse),
    GetPrfsCircuitByCircuitId(GetPrfsCircuitByCircuitIdResponse),
    sign_up_prfs_account(SignUpPrfsAccountRequest),
    sign_in_prfs_account(SignInPrfsAccountResponse),
    GetPrfsCircuitDrivers(GetPrfsCircuitDriversResponse),
    GetPrfsCircuitDriverByDriverId(GetPrfsCircuitDriverByDriverIdResponse),
    GetPrfsCircuitTypes(GetPrfsCircuitTypesResponse),
    GetPrfsCircuitTypeByCircuitTypeId(GetPrfsCircuitTypeByCircuitTypeIdResponse),
    get_least_recent_prfs_index(GetLeastRecentPrfsIndexResponse),
    get_prfs_indices(GetPrfsIndicesResponse),
    add_prfs_index(AddPrfsIndexResponse),
    GetPrfsPolls(GetPrfsPollsResponse),
    CreatePrfsPoll(CreatePrfsPollResponse),
    GetPrfsPollByPollId(GetPrfsPollByPollIdResponse),
    SubmitPrfsPollResponse(SubmitPrfsPollResponseResponse),
    GetPrfsProofInstances(GetPrfsProofInstancesResponse),
    get_prfs_proof_instance_by_instance_id(GetPrfsProofInstanceByInstanceIdResponse),
    get_prfs_proof_instance_by_short_id(GetPrfsProofInstanceByShortIdResponse),
    create_prfs_proof_instance(CreatePrfsProofInstanceResponse),
    create_prfs_proof(CreatePrfsProofResponse),
    get_prfs_proof_types(GetPrfsProofTypesResponse),
    get_prfs_proof_type_by_proof_type_id(GetPrfsProofTypeByProofTypeIdResponse),
    CreatePrfsProofType(CreatePrfsProofTypeResponse),
    get_prfs_set_by_set_id(GetPrfsSetBySetIdResponse),
    GetPrfsSets(GetPrfsSetsResponse),
    create_prfs_set(CreatePrfsSetResponse),
    CreatePrfsDynamicSetElement(CreatePrfsDynamicSetElementResponse),
    create_prfs_proof_record(CreatePrfsProofRecordResponse),
    get_prfs_proof_record(GetPrfsProofRecordResponse),
}
