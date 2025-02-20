export interface Envs {
  NEXT_PUBLIC_PRFS_SDK_VERSION: string;
  NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT: string;
  NEXT_PUBLIC_PRFS_ASSET_SERVER_ENDPOINT: string;
}

export const envs: Envs = {
  NEXT_PUBLIC_PRFS_SDK_VERSION: process.env.NEXT_PUBLIC_PRFS_SDK_VERSION,
  NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT: process.env.NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT,
  NEXT_PUBLIC_PRFS_ASSET_SERVER_ENDPOINT: process.env.NEXT_PUBLIC_PRFS_ASSET_SERVER_ENDPOINT,
};
