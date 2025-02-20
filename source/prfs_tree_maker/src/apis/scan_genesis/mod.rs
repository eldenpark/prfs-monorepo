use crate::envs::ENVS;
use crate::geth::{GetBalanceRequest, GethClient};
use crate::paths::PATHS;
use crate::TreeMakerError;
use clap::ArgMatches;
use prfs_db_interface::database2::Database2;
use prfs_db_interface::db_apis;
use prfs_entities::entities::EthAccount;
use prfs_entities::sqlx::{Pool, Postgres, Transaction};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, HashMap};
use std::fs::{self};

#[derive(Serialize, Deserialize, Debug)]
struct GenesisEntry {
    wei: String,
}

pub async fn process_genesis_block_accounts(
    geth_client: GethClient,
    _pool: &Pool<Postgres>,
    tx: &mut Transaction<'_, Postgres>,
) -> Result<(), TreeMakerError> {
    let genesis_block_path = PATHS.data_scans.join("genesis_block.json");

    println!("genesis_block_path: {:?}", genesis_block_path);

    let data = fs::read_to_string(&genesis_block_path)?;
    let genesis_block: HashMap<String, GenesisEntry> =
        serde_json::from_str(&data).expect("JSON does not have correct format.");

    let mut balances = BTreeMap::new();
    for (idx, (addr, _)) in genesis_block.iter().enumerate() {
        let addr = format!("0x{}", addr);

        let resp = geth_client
            .eth_getBalance(GetBalanceRequest(&addr, "latest"))
            .await?;

        if let Some(r) = resp.result {
            let wei_str = r.strip_prefix("0x").expect("wei should contain 0x");
            let wei = Decimal::from_str_radix(wei_str, 16).unwrap();
            let acc = EthAccount {
                addr: addr.to_string(),
                wei,
            };

            balances.insert(addr, acc);

            if idx % 200 == 0 {
                let rows_updated = db_apis::insert_eth_accounts(tx, balances, false).await?;
                println!("idx: {}, rows_updated: {}", idx, rows_updated);

                balances = BTreeMap::new();
            }
        }
    }

    Ok(())
}
