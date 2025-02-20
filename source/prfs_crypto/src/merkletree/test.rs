use super::{merklepath::make_sibling_path, tree::make_merkle_proof};
use crate::{convert_hex_into_32bytes, hash_from_bytes, verify, PrfsCryptoError};
// use ff::PrimeField;
use primitive_types::U256;
use rs_merkle::Hasher;
// use secq256k1::field::BaseField;

#[test]
fn test_merkle_path() {
    let sibling_path = make_sibling_path(4, 0);

    println!("sibling_path: {:?}", sibling_path);
}

#[test]
fn test_merkle_proof() -> Result<(), PrfsCryptoError> {
    println!("test_merkle_proof()");

    let depth: u8 = 32;

    let addrs = [
        "0x5247cdfffeeff5fac15e214c6bfcca5e45a135c0",
        "0x4f6fcaae3fc4124acaccc780c6cb0dd69ddbeff8",
        "0x50d34ee0ac40da7779c42d3d94c2072e5625395f",
        "0x51c0e162bd86b63933262d558a8953def4e30c85",
        //
        "0x33d10ab178924ecb7ad52f4c0c8062c3066607ec",
        "0x53c8f1af4885182eae85779833548c8f5bc5d91a",
        "0x5683e37f839bf91cccfb1c8a677c770af5d2f690",
        "0x5aee774c6e2533288b0a5547dc4f6be8d85907ab",
        //
        "0x5b140f8f4000fce4ac0baf88cb39dfdcf9c48cae",
        "0x5d1762d202afbb376c2ffb99fba0bab6b08cdea6",
        "0x604c8ff002b78cac70aff07adb7338e541d3a348",
        "0x62195385a55b3f2f77f13e355af8f5a2caf6ac78",
        //
        "0x6383e90818f26c4a01df881bd6ad6af416d50076",
        "0x6420d34e50fa91e21f6864828709c392473f220a",
        "0x6438ed942eea0f102950d06c74e73cf677f4655f",
        "0x67284e6473dd2afca0782e24dae6d79f712c270f",
    ];

    let leaves: Vec<String> = addrs.iter().map(|addr| addr.to_string()).collect();

    for leaf in addrs.iter() {
        println!("leaf: {:#?}, len: {}", leaf, leaf.len());
        // convert_bytes_into_decimal_str(bytes);
    }

    let leaf_idx = 4;

    let sibling_path = make_sibling_path(depth, leaf_idx);
    println!("sibling_path: {:#?}", sibling_path);

    let proof = make_merkle_proof(leaves.clone(), leaf_idx, depth).unwrap();
    println!("proof: {:#?}", proof);

    let l = &leaves[leaf_idx as usize];
    let leaf = convert_hex_into_32bytes(l).unwrap();
    verify(proof, leaf);

    Ok(())
}
