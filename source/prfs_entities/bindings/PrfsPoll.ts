// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export interface PrfsPoll {
  poll_id: string;
  label: string;
  plural_voting: boolean;
  proof_type_id: string;
  author: string;
  description: string;
  questions: Record<string, any>[];
  created_at: number;
}
