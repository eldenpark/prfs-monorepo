import { parseArgs } from "node:util";
import fs from "fs";
import path from "path";
import chalk from "chalk";

import { Envs } from "./src/envs";

const DOT_ENV_PATH = path.resolve(".env");

function run() {
  console.log("%s createEnvs.ts prfs web launch", chalk.green("Launching"));

  createEnvs();
}

function createEnvs() {
  const { values } = parseArgs({
    options: {
      production: {
        type: "boolean",
      },
      teaser: {
        type: "boolean",
      },
    },
  });

  console.log("cli args: %j", values);

  const { production, teaser } = values;

  const env_dev: Envs = {
    NEXT_PUBLIC_IS_TEASER: teaser ? "yes" : "no",
    NEXT_PUBLIC_WEBAPP_CONSOLE_ENDPOINT: "http://localhost:3000",
    NEXT_PUBLIC_WEBAPP_VACADE_ENDPOINT: "http://localhost:3022",
    NEXT_PUBLIC_WEBAPP_PROOF_ENDPOINT: "http://localhost:3020",
    NEXT_PUBLIC_WEBAPP_POLL_ENDPOINT: "http://localhost:3021",
    NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT: "http://localhost:4000",
    NEXT_PUBLIC_PRFS_ASSET_SERVER_ENDPOINT: "http://localhost:4010",
    NEXT_PUBLIC_PRFS_SDK_WEB_ENDPOINT: "http://localhost:3010",
    NEXT_PUBLIC_PRFS_ZAUTH_ENDPOINT: "http://localhost:3011",
  };

  const env_prod: Envs = {
    NEXT_PUBLIC_IS_TEASER: teaser ? "yes" : "no",
    NEXT_PUBLIC_WEBAPP_CONSOLE_ENDPOINT: "http://console.prfs.xyz",
    NEXT_PUBLIC_WEBAPP_PROOF_ENDPOINT: "http://prfs.xyz",
    NEXT_PUBLIC_WEBAPP_VACADE_ENDPOINT: "http://vacade.prfs.xyz",
    NEXT_PUBLIC_WEBAPP_POLL_ENDPOINT: "http://poll.prfs.xyz",
    NEXT_PUBLIC_PRFS_API_SERVER_ENDPOINT: "https://api.prfs.xyz",
    NEXT_PUBLIC_PRFS_ASSET_SERVER_ENDPOINT: "https://asset.prfs.xyz",
    NEXT_PUBLIC_PRFS_SDK_WEB_ENDPOINT: "https://sdk.prfs.xyz",
    NEXT_PUBLIC_PRFS_ZAUTH_ENDPOINT: "http://zauth.org",
  };

  const envs = production ? env_prod : env_dev;
  console.log("Writing envs to %s, envs: %o", DOT_ENV_PATH, envs);

  writeEnvsToDotEnv(envs);
}

function writeEnvsToDotEnv(envs: Envs) {
  let ws = fs.createWriteStream(DOT_ENV_PATH);

  for (const [key, val] of Object.entries(envs)) {
    ws.write(`${key}=${val}\n`);
  }

  ws.close();
}

run();
