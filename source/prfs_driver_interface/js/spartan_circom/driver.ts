import { CircuitTypeId } from "@taigalabs/prfs-circuit-interface/bindings/CircuitTypeId";

import { CreateProofEvent, DriverEventListener } from "./events";

export interface CircuitDriverGen {
  newInstance(driverProps: any, eventListener: DriverEventListener): Promise<CircuitDriver>;
  [key: string]: any;
}

export interface CircuitDriver {
  getArtifactCount(): number;
  prove(args: ProveArgs<any>): Promise<ProveReceipt>;
  verify(args: VerifyArgs): Promise<boolean>;
  getBuildStatus(): Promise<any>;
  hash(args: bigint[]): Promise<bigint>;
}

export interface ProveArgs<T> {
  inputs: T;
  circuitTypeId: CircuitTypeId;
  eventListener: (ev: CreateProofEvent) => void;
}

export interface VerifyArgs {
  proof: Proof;
  circuitTypeId: CircuitTypeId;
}

export interface Proof {
  proofBytes: Uint8Array | number[];
  publicInputSer: string;
}

export interface ProveReceipt {
  proof: Proof;
  duration: number;
}

export interface VerifyReceipt {
  verifyResult: boolean;
  error?: string;
}

export interface ProofPublicInput {
  circuitPubInput: Record<string, any>;
  [key: string]: any;
}

export type Uint8ArrayNative = number[];
