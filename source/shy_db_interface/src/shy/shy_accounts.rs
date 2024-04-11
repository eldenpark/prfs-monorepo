use prfs_db_driver::sqlx::{self, Pool, Postgres, Row, Transaction};
use shy_entities::ShyAccount;

use crate::ShyDbInterfaceError;

pub async fn get_shy_account_by_account_id(
    pool: &Pool<Postgres>,
    account_id: &String,
) -> Result<ShyAccount, ShyDbInterfaceError> {
    let query = r#"
SELECT * FROM shy_accounts
WHERE account_id=$1
"#;

    let row = sqlx::query(query).bind(&account_id).fetch_one(pool).await?;

    let acc = ShyAccount {
        account_id: row.try_get("account_id")?,
        public_key: row.try_get("public_key")?,
        avatar_color: row.try_get("avatar_color")?,
        policy_ids: row.try_get("policy_ids")?,
    };

    Ok(acc)
}

pub async fn insert_shy_account(
    tx: &mut Transaction<'_, Postgres>,
    prfs_account: &ShyAccount,
) -> Result<String, ShyDbInterfaceError> {
    let query = r#"
INSERT INTO shy_accounts
(account_id, avatar_color, public_key, policy_ids)
VALUES ($1, $2, $3, $4) returning account_id
"#;

    let row = sqlx::query(query)
        .bind(&prfs_account.account_id)
        .bind(&prfs_account.avatar_color)
        .bind(&prfs_account.public_key)
        .bind(&prfs_account.policy_ids)
        .fetch_one(&mut **tx)
        .await?;

    let account_id: String = row.try_get("account_id")?;

    return Ok(account_id);
}
