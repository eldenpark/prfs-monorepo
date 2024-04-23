pub mod bindgen;

use prfs_axum_lib::generate_api_error_codes;
use prfs_axum_lib::ApiHandleErrorCode;
use serde::{Deserialize, Serialize};

generate_api_error_codes! {
    PrfsApiErrorCodes,
    PRFS_API_ERROR_CODES,
    (String::from("20000000"), SUCCESS, "Success");
    (String::from("40000000"), UNKNOWN_ERROR, "Unknown error");
    (String::from("40000001"), CANNOT_FIND_USER, "Can't find a user");
    (String::from("40000002"), USER_ALREADY_EXISTS, "User already exists");
    (String::from("40000003"), NO_POLICY_ATTACHED, "User has no policy attached");
    (String::from("400000A0"), NOT_MACHING_SIG_MSG, "Signature might have been made on an invalid msg");
    (String::from("400000A1"), INVALID_SIG, "Signature is invalid");
    (String::from("40000B00"), RECORD_INSERT_FAIL, "Unable to insert the record");
}
