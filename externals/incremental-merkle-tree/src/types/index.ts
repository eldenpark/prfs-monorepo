export type Node = any

export type HashFunction = (values: Node[]) => Node

export type AsyncHashFunction = (values: Node[]) => Promise<Node>

export type MerkleProof = {
  root: any
  leaf: any
  leafIndex: number
  siblings: any[]
  pathIndices: number[]
}

