use halo2curves::{
    ff::{Field, PrimeField},
    secp256k1::Fp,
};
use neptune::{poseidon::PoseidonConstants, Poseidon};
use poseidon::poseidon_k256::hash;
use sha2::digest::typenum::{U1, U2};

use crate::{convert_bytes_to_field_elem_vec, hash_from_bytes, poseidon_32};

#[test]
pub fn test_poseidon() {
    let arr: &[u8] = &[
        50, 99, 48, 53, 50, 54, 57, 56, 97, 99, 52, 48, 102, 98, 57, 57, 101, 57, 52, 56, 100, 100,
        102, 98, 50, 102, 102, 57, 57, 101, 49, 54, 100, 102, 99, 56, 53, 49, 53, 51, 57, 52, 97,
        98, 98, 52, 49, 100, 101, 50, 100, 101, 98, 100, 54, 52, 102, 56, 100, 49, 48, 55, 100, 98,
        51, 98, 101, 54, 50, 50, 97, 99, 48, 49, 53, 51, 97, 57, 100, 52, 50, 99, 49, 98, 51, 52,
        102, 56, 53, 99, 52, 100, 52, 55, 57, 54, 50, 102, 98, 50, 54, 54, 49, 53, 98, 51, 51, 54,
        100, 48, 97, 57, 98, 55, 98, 100, 101, 99, 55, 98, 51, 98, 57, 48, 52, 98, 102, 49,
    ];

    let arr: &[u8] = &[
        50, 99, 48, 53, 50, 54, 57, 56, 97, 99, 52, 48, 102, 98, 57, 57, 101, 57, 52, 56, 100, 100,
        102, 98, 50, 102, 102, 57, 57, 101, 49, 54, 100, 102, 99, 56, 53, 49, 53, 51, 57, 52, 97,
        98, 98, 52, 49, 100, 101, 50, 100, 101, 98, 100, 54, 52, 102, 56, 100, 49, 48, 55, 100, 98,
        51, 98, 101, 54, 50, 50, 97, 99, 48, 49, 53, 51, 97, 57, 100, 52, 50, 99, 49, 98, 51, 52,
        102, 56, 53, 99, 52, 100, 52, 55,
        57,
        //54,
        //50,
        // 102, 98, 50, 54, 54, 49, 53, 98, 51, 51, 54,
        // 100, 48, 97, 57, 98, 55, 98, 100, 101, 99, 55, 98, 51, 98, 57, 48, 52, 98, 102, 49,
    ];

    println!("arr: {:?} len: {}", arr, arr.len());

    let res = hash_from_bytes(arr).unwrap();
    println!("res: {:?}", res);
}

#[test]
pub fn test_poseidon2() {
    let arg1 = &[0u8; 32];
    let arg2 = &[0u8; 32];
    let res = poseidon_32(&arg1);
    println!("res: {:?}", res);
}

#[test]
pub fn test_poseidon3() {
    // let test_arity = 2;
    let arr = [0u8; 64];
    let input = convert_bytes_to_field_elem_vec(&arr).unwrap();
    println!("input: {:?}", input);

    // let result = hash(vec![Fp::ZERO, Fp::ZERO]);
    // println!("result: {:?}", result);

    let preimage = vec![Fp::ZERO, Fp::ZERO];
    let constants = PoseidonConstants::new();

    let mut h = Poseidon::<Fp, U2>::new_with_preimage(&preimage, &constants);
    let res = h.hash();
    let res_bytes = res.to_bytes();
    println!("res: {:?}, bytes: {:?}", res, res_bytes);
}
