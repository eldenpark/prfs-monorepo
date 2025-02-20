import { DynamicSetJson } from "@taigalabs/prfs-entities/bindings/DynamicSetJson";

const dynamic_sets: DynamicSetJson[] = [
  {
    prfs_set: {
      set_id: "10000000-0000-0000-0000-100000000000",
      set_type: "Dynamic",
      label: "Board Ape Yacht Club holders (23/08/30)",
      author: "Prfs",
      desc: "BAYC token holder addresses",
      hash_algorithm: "Poseidon",
      cardinality: BigInt(0),
      merkle_root: "",
      element_type: "Ethereum address",
      tree_depth: 32,
      finite_field: "Z_(2^256-2^32-977)",
      elliptic_curve: "Secp256k1",
      created_at: "2023-08-29T00:00:00-00:00",
    },
    elements_path: "sets/bayc_nft_holders_23_08_30.csv",
  },
  {
    prfs_set: {
      set_id: "10000000-0000-0000-0000-000000000001",
      set_type: "Dynamic",
      label: "Nonce community members",
      author: "Prfs",
      desc: "Nonce community member addresses",
      hash_algorithm: "Poseidon",
      cardinality: BigInt(0),
      merkle_root: "",
      element_type: "Ethereum address",
      tree_depth: 32,
      finite_field: "Z_(2^256-2^32-977)",
      elliptic_curve: "Secp256k1",
      created_at: "2023-09-12T00:00:00-00:00",
    },
    elements_path: "sets/nonce_community_members_23_09_12.csv",
  },
  {
    prfs_set: {
      set_id: "10000000-0000-0000-0000-100000000002",
      set_type: "Dynamic",
      label: "Aave biggest liquid stakers (23/09/21)",
      author: "Prfs",
      desc: "Aave liquid staker addresses",
      hash_algorithm: "Poseidon",
      cardinality: BigInt(0),
      merkle_root: "",
      element_type: "Ethereum address",
      tree_depth: 32,
      finite_field: "Z_(2^256-2^32-977)",
      elliptic_curve: "Secp256k1",
      created_at: "2023-08-29T00:00:00-00:00",
    },
    elements_path: "sets/aave_liquid_stakers_23_09_21.csv",
  },
];

export default dynamic_sets;
