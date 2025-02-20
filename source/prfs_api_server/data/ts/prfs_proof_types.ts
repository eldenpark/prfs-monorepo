import { PrfsProofType } from "@taigalabs/prfs-entities/bindings/PrfsProofType";

const ADDR_MEMBERSHIP2_1_CIRCUIT_URL =
  "prfs://00000000-0000-0000-0000-000000000000/addr_membership2_1.spartan.circuit";

const ADDR_MEMBERSHIP2_1_WTNS_GEN_URL =
  "prfs://00000000-0000-0000-0000-000000000000/addr_membership2_1_js/addr_membership2_1.wasm";

const SIMPLE_HASH_1_CIRCUIT_URL =
  "prfs://00000000-0000-0000-0000-000000000001/simple_hash_1_1.spartan.circuit";

const SIMPLE_HASH_1_WTNS_GEN_URL =
  "prfs://00000000-0000-0000-0000-000000000001/simple_hash_1_1_js/simple_hash_1_1.wasm";

const sig_data_circuit_input = {
  desc: "Message over which a signature is made",
  name: "sigData",
  type: "SIG_DATA_1",
  label: "Signature",
  value: "",
};

const simple_hash_1 = {
  desc: "Hash data",
  name: "hashData",
  type: "HASH_DATA_1",
  label: "Hash data",
  value: "",
};

const proof_types: PrfsProofType[] = [
  {
    proof_type_id: "ETH_0_0001_1",
    label: "0.0001ETH ownership",
    author: "Prfs",
    desc: "Prove you are one of the wallet owners of a list of all wallets that have 0.0001-0.0002 ETH",
    expression: "Owns 0.0001 ETH",
    img_url: "https://prfs-asset-1.s3.ap-northeast-2.amazonaws.com/Ethereum_logo_translucent.svg",
    img_caption: "0.0001",
    circuit_id: "00000000-0000-0000-0000-000000000000",
    circuit_type_id: "MEMBERSHIP_PROOF_1",
    circuit_driver_id: "SPARTAN_CIRCOM_1",
    circuit_inputs: [
      {
        ref_type: "PRFS_SET",
        ref_value: "00000000-0000-0000-0000-000000000001",
        desc: "Who you are among those",
        name: "merkleProof",
        type: "MERKLE_PROOF_1",
        element_type: "ADDRESS",
        label: "Member",
        value: "",
      },
      sig_data_circuit_input,
    ],
    driver_properties: {
      circuit_url: ADDR_MEMBERSHIP2_1_CIRCUIT_URL,
      wtns_gen_url: ADDR_MEMBERSHIP2_1_WTNS_GEN_URL,
    },
    created_at: "2023-05-01T16:39:57-08:00",
  },
  {
    proof_type_id: "BAYC_1",
    label: "Bored Ape Yacht Club holder",
    author: "Prfs",
    desc: "Prove you are one of the holders of BAYC tokens",
    expression: "Own BAYC token",
    img_url: "https://prfs-asset-1.s3.ap-northeast-2.amazonaws.com/bayc-footer.webp",
    img_caption: "",
    circuit_id: "00000000-0000-0000-0000-000000000000",
    circuit_type_id: "MEMBERSHIP_PROOF_1",
    circuit_driver_id: "SPARTAN_CIRCOM_1",
    circuit_inputs: [
      {
        ref_type: "PRFS_SET",
        ref_value: "10000000-0000-0000-0000-100000000000",
        desc: "Who you are among those",
        name: "merkleProof",
        type: "MERKLE_PROOF_1",
        element_type: "ADDRESS",
        label: "Member",
        value: "",
      },
      sig_data_circuit_input,
    ],
    driver_properties: {
      circuit_url: ADDR_MEMBERSHIP2_1_CIRCUIT_URL,
      wtns_gen_url: ADDR_MEMBERSHIP2_1_WTNS_GEN_URL,
    },
    created_at: "2023-08-01T16:39:57-08:00",
  },
  {
    proof_type_id: "NONCE_MEMBER_1",
    label: "Nonce community member",
    author: "Prfs",
    desc: "This proves a person is a member of Web3 community - Nonce",
    expression: "Nonce member",
    img_url: "https://prfs-asset-1.s3.ap-northeast-2.amazonaws.com/nonce.jpeg",
    img_caption: "",
    circuit_id: "00000000-0000-0000-0000-000000000000",
    circuit_type_id: "MEMBERSHIP_PROOF_1",
    circuit_driver_id: "SPARTAN_CIRCOM_1",
    circuit_inputs: [
      {
        ref_type: "PRFS_SET",
        ref_value: "10000000-0000-0000-0000-000000000001",
        desc: "Who you are among those",
        name: "merkleProof",
        type: "MERKLE_PROOF_1",
        label: "Member",
        element_type: "ADDRESS",
        value: "",
      },
      sig_data_circuit_input,
    ],
    driver_properties: {
      circuit_url: ADDR_MEMBERSHIP2_1_CIRCUIT_URL,
      wtns_gen_url: ADDR_MEMBERSHIP2_1_WTNS_GEN_URL,
    },
    created_at: "2023-05-01T16:39:57-08:00",
  },
  {
    proof_type_id: "AAVE_STAKERS_1",
    label: "Aave liquid stakers 150",
    author: "Prfs",
    desc: "Proves one is the liquid staker on Aave",
    expression: "Is Aave liquid staker",
    img_url: "https://prfs-asset-1.s3.ap-northeast-2.amazonaws.com/aave.png",
    img_caption: "150",
    circuit_id: "00000000-0000-0000-0000-000000000000",
    circuit_type_id: "MEMBERSHIP_PROOF_1",
    circuit_driver_id: "SPARTAN_CIRCOM_1",
    circuit_inputs: [
      {
        ref_type: "PRFS_SET",
        ref_value: "10000000-0000-0000-0000-100000000002",
        desc: "Who you are among those",
        name: "merkleProof",
        type: "MERKLE_PROOF_1",
        label: "Member",
        element_type: "ADDRESS",
        value: "",
      },
      {
        desc: "Message over which a signature is made",
        name: "sigData",
        type: "SIG_DATA_1",
        label: "Signature",
        value: "",
      },
    ],
    driver_properties: {
      circuit_url: ADDR_MEMBERSHIP2_1_CIRCUIT_URL,
      wtns_gen_url: ADDR_MEMBERSHIP2_1_WTNS_GEN_URL,
    },
    created_at: "2023-09-21T16:39:57-08:00",
  },
  {
    proof_type_id: "ZAUTH_SIGN_IN_1",
    label: "ZAuth",
    author: "Prfs",
    desc: "ZAuth sign in",
    expression: "Passes ZAuth",
    img_url:
      "https://prfs-asset-1.s3.ap-northeast-2.amazonaws.com/padlock-clipart-design-illustration-free-png.webp",
    img_caption: "0.0001",
    circuit_id: "00000000-0000-0000-0000-000000000000",
    circuit_type_id: "MEMBERSHIP_PROOF_1",
    circuit_driver_id: "SPARTAN_CIRCOM_1",
    circuit_inputs: [
      {
        desc: "passcode",
        name: "passcode",
        type: "PASSCODE",
        label: "Passcode",
        value: "",
      },
    ],
    driver_properties: {
      circuit_url: ADDR_MEMBERSHIP2_1_CIRCUIT_URL,
      wtns_gen_url: ADDR_MEMBERSHIP2_1_WTNS_GEN_URL,
    },
    created_at: "2023-09-01T16:39:57-08:00",
  },
  {
    proof_type_id: "SIMPLE_HASH_1",
    label: "Simple hash",
    author: "Prfs",
    desc: "Simple hash",
    expression: "Knows hash argument",
    img_url: "https://prfs-asset-1.s3.ap-northeast-2.amazonaws.com/hash.png",
    img_caption: "",
    circuit_id: "00000000-0000-0000-0000-000000000001",
    circuit_type_id: "SIMPLE_HASH_1",
    circuit_driver_id: "SPARTAN_CIRCOM_1",
    circuit_inputs: [simple_hash_1],
    driver_properties: {
      circuit_url: SIMPLE_HASH_1_CIRCUIT_URL,
      wtns_gen_url: SIMPLE_HASH_1_WTNS_GEN_URL,
    },
    created_at: "2023-09-01T16:39:57-08:00",
  },
];

export default proof_types;
