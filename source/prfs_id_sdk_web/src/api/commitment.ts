export function makeCommitmentSearchParams(args: CommitmentArgs): string {
  const { nonce, appId, cms, publicKey } = args;
  const _cms = encodeURIComponent(JSON.stringify(cms));
  const queryString = `?public_key=${publicKey}&cms=${_cms}&app_id=${appId}&nonce=${nonce}`;
  return queryString;
}

export function parseCommitmentSearchParams(searchParams: URLSearchParams): CommitmentArgs {
  const publicKey = searchParams.get("public_key");
  const appId = searchParams.get("app_id");
  const cms = searchParams.get("cms");
  const nonce = searchParams.get("nonce");

  if (!appId) {
    throw new Error("app id missing");
  }

  if (!publicKey) {
    throw new Error("publicKey missing");
  }

  if (!cms) {
    throw new Error("signInData missing");
  }

  if (!nonce) {
    throw new Error("nonce missing");
  }

  const c = decodeURIComponent(cms);
  const _cms: CommitmentData[] = JSON.parse(c);

  const args: CommitmentArgs = {
    appId,
    nonce: Number(nonce),
    publicKey,
    cms: _cms,
  };

  return args;
}

export interface CommitmentArgs {
  appId: string;
  nonce: number;
  publicKey: string;
  cms: CommitmentData[];
}

export interface CommitmentData {
  name: string;
  preImage: string;
  type: CommitmentType;
}

export enum CommitmentType {
  SIG_POSEIDON_1 = "SIG_POSEIDON_1",
}
