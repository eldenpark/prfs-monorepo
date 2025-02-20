import checkParameter from "./checkParameter"
import { AsyncHashFunction, Node } from "./types"

export default async function asyncUpdate(
  index: number,
  value: Node,
  depth: number,
  arity: number,
  nodes: Node[][],
  zeroes: Node[],
  hash: AsyncHashFunction
): Promise<Node> {
  checkParameter(index, "index", "number")

  if (index < 0 || index >= nodes[0].length) {
    throw new Error("The leaf does not exist in this tree")
  }

  let node = value

  for (let level = 0; level < depth; level += 1) {
    const position = index % arity
    const levelStartIndex = index - position
    const levelEndIndex = levelStartIndex + arity

    const children = []
    nodes[level][index] = node

    for (let i = levelStartIndex; i < levelEndIndex; i += 1) {
      if (i < nodes[level].length) {
        children.push(nodes[level][i])
      } else {
        children.push(zeroes[level])
      }
    }

    node = await hash(children)
    index = Math.floor(index / arity)
  }

  return node
}
