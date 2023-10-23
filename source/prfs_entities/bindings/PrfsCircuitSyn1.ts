// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export interface PrfsCircuitSyn1 {
  circuit_id: string;
  circuit_type_id: string;
  label: string;
  desc: string;
  author: string;
  num_public_inputs: number;
  circuit_dsl: string;
  arithmetization: string;
  proof_algorithm: string;
  elliptic_curve: string;
  finite_field: string;
  circuit_driver_id: string;
  driver_version: string;
  driver_properties: Record<string, string>;
  build_properties: Record<string, string>;
  circuit_inputs_meta: Record<string, any>[];
  raw_circuit_inputs_meta: Record<string, any>[];
  created_at: string;
}
