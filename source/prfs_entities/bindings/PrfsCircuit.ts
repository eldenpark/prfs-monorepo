// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CircuitTypeId } from "./CircuitTypeId";

export type PrfsCircuit = {
  circuit_id: string;
  circuit_type_id: CircuitTypeId;
  label: string;
  desc: string;
  author: string;
  num_public_inputs: number;
  circuit_dsl: string;
  arithmetization: string;
  proof_algorithm: string;
  elliptic_curve: string;
  finite_field: string;
  build_properties: Record<string, string>;
  circuit_driver_id: "spartan_circom_v1" | "o1js_v1";
  driver_version: string;
  driver_properties: Record<string, string>;
  raw_circuit_inputs_meta: Record<string, any>[];
  created_at: string;
};
