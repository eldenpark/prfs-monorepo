use prfs_db_driver::sqlx::{self, Pool, Postgres, Row, Transaction};
use prfs_entities::entities::PrfsTree;

use crate::DbInterfaceError;

pub async fn get_latest_prfs_tree_by_set_id(
    pool: &Pool<Postgres>,
    set_id: &String,
) -> Result<Option<PrfsTree>, DbInterfaceError> {
    let query = r#"
SELECT * 
FROM prfs_trees
WHERE set_id=$1
ORDER BY updated_at
DESC
LIMIT 1
"#;

    let row = sqlx::query(&query)
        .bind(&set_id)
        .fetch_optional(pool)
        .await?;

    if let Some(r) = row {
        let label = r.try_get("label")?;
        let tree_id = r.try_get("tree_id")?;
        let set_id = r.try_get("set_id")?;
        let merkle_root = r.try_get("merkle_root")?;
        let elliptic_curve = r.try_get("elliptic_curve")?;
        let finite_field = r.try_get("finite_field")?;
        let tree_depth = r.try_get("tree_depth")?;

        let t = PrfsTree {
            label,
            tree_id,
            set_id,
            merkle_root,
            elliptic_curve,
            finite_field,
            tree_depth,
        };

        Ok(Some(t))
    } else {
        Ok(None)
    }
}

pub async fn insert_prfs_tree(
    tx: &mut Transaction<'_, Postgres>,
    tree: &PrfsTree,
) -> Result<String, DbInterfaceError> {
    let query = r#"
INSERT INTO prfs_trees 
(tree_id, set_id, "label", tree_depth, elliptic_curve, finite_field, merkle_root)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING tree_id
"#;

    let row = sqlx::query(&query)
        .bind(&tree.tree_id)
        .bind(&tree.set_id)
        .bind(&tree.label)
        .bind(&tree.tree_depth)
        .bind(&tree.elliptic_curve)
        .bind(&tree.finite_field)
        .bind(&tree.merkle_root)
        .fetch_one(&mut **tx)
        .await?;

    let tree_id: String = row.try_get("tree_id")?;

    return Ok(tree_id);
}
