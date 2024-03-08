import { ProveReceipt } from "@taigalabs/prfs-driver-interface";

export type ProofGenReceiptRaw = Record<string, string | (() => Promise<any | ProveReceipt>)>;

export async function processReceipt(raw: ProofGenReceiptRaw): Promise<Record<string, any>> {
  const newObj = { ...raw };
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "function") {
      const v = await Promise.resolve(value());
      newObj[key] = v;
    }
  }

  return newObj;
}
