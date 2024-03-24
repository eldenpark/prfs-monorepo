use prfs_db_driver::sqlx::{self, Pool, Postgres, QueryBuilder, Row, Transaction};
use prfs_entities::entities::PrfsTreeNode;
use prfs_entities::tree_api::NodePos;
use rust_decimal::Decimal;

use crate::DbInterfaceError;

pub async fn get_prfs_tree_nodes_by_pos(
    pool: &Pool<Postgres>,
    tree_id: &String,
    pos: &Vec<NodePos>,
) -> Result<Vec<PrfsTreeNode>, DbInterfaceError> {
    let mut query_builder: QueryBuilder<Postgres> = QueryBuilder::new(
        r#"
SELECT *
FROM prfs_tree_nodes
WHERE tree_id=
"#,
    );

    query_builder.push_bind(&tree_id);
    query_builder.push(" AND (pos_w, pos_h) in ");
    query_builder.push_tuples(pos, |mut b, p| {
        b.push_bind(p.pos_w).push_bind(p.pos_h);
    });

    query_builder.push(" ORDER BY pos_h ASC");

    let query = query_builder.build();
    let rows = query.fetch_all(pool).await?;

    let nodes = rows
        .iter()
        .map(|n| {
            let tree_id = n.try_get("tree_id")?;
            let set_id = n.try_get("set_id")?;
            let pos_w = n.try_get("pos_w")?;
            let pos_h = n.try_get("pos_h")?;
            let val = n.try_get("val")?;
            let meta = n.try_get("meta")?;

            Ok(PrfsTreeNode {
                tree_id,
                set_id,
                pos_w,
                pos_h,
                meta,
                val,
            })
        })
        .collect::<Result<Vec<PrfsTreeNode>, DbInterfaceError>>()?;

    Ok(nodes)
}

pub async fn get_prfs_tree_leaf_indices(
    pool: &Pool<Postgres>,
    tree_id: &String,
    leaf_vals: &Vec<String>,
) -> Result<Vec<PrfsTreeNode>, DbInterfaceError> {
    let mut query_builder: QueryBuilder<Postgres> = QueryBuilder::new(
        r#"
SELECT *
FROM prfs_tree_nodes
WHERE tree_id=
"#,
    );

    query_builder.push_bind(&tree_id);
    query_builder.push(" AND pos_h = 0 AND (val) in ");
    query_builder.push_tuples(leaf_vals, |mut b, leaf| {
        b.push_bind(leaf);
    });

    let query = query_builder.build();
    let rows = query.fetch_all(pool).await?;

    let nodes = rows
        .iter()
        .map(|n| {
            let tree_id = n.try_get("tree_id")?;
            let set_id = n.try_get("set_id")?;
            let pos_w = n.try_get("pos_w")?;
            let pos_h = n.try_get("pos_h")?;
            let val = n.try_get("val")?;
            let meta = n.try_get("meta")?;

            Ok(PrfsTreeNode {
                tree_id,
                set_id,
                pos_w,
                pos_h,
                meta,
                val,
            })
        })
        .collect::<Result<Vec<PrfsTreeNode>, DbInterfaceError>>()?;

    Ok(nodes)
}

pub async fn get_prfs_tree_leaf_nodes_by_set_id(
    pool: &Pool<Postgres>,
    set_id: &String,
    page_idx: i32,
    page_size: i32,
) -> Result<Vec<PrfsTreeNode>, DbInterfaceError> {
    let query = r#"
SELECT * from prfs_tree_nodes nodes 
WHERE set_id=$1 AND pos_h=0 
ORDER BY pos_w ASC
OFFSET $2
LIMIT $3
"#;

    // println!("query: {}", query);
    let offset = page_idx * page_size;

    let rows = sqlx::query(&query)
        .bind(&set_id)
        .bind(&offset)
        .bind(&page_size)
        .fetch_all(pool)
        .await?;

    let nodes: Vec<PrfsTreeNode> = rows
        .iter()
        .map(|n| {
            let tree_id = n.try_get("tree_id").expect("set_id should exist");
            let set_id = n.try_get("set_id").expect("set_id should exist");
            let pos_w = n.try_get("pos_w").expect("pos_w should exist");
            let pos_h = n.try_get("pos_h").expect("pos_h should exist");
            let val = n.try_get("val").expect("val should exist");
            let meta = n.get("meta");

            PrfsTreeNode {
                tree_id,
                set_id,
                pos_w,
                pos_h,
                val,
                meta,
            }
        })
        .collect();

    Ok(nodes)
}

pub async fn get_prfs_tree_root(
    pool: &Pool<Postgres>,
    set_id: &String,
) -> Result<PrfsTreeNode, DbInterfaceError> {
    let query = r#"
SELECT * 
FROM prfs_tree_nodes 
WHERE set_id=$1 AND pos_h=31 AND pos_w=0
"#;
    // println!("query: {}", query);

    let row = sqlx::query(&query).bind(&set_id).fetch_one(pool).await?;

    let pos_w = row.try_get("pos_w").expect("pos_w should exist");
    let pos_h = row.try_get("pos_h").expect("pos_h should exist");
    let val = row.try_get("val").expect("val should exist");
    let tree_id = row.try_get("tree_id").expect("tree_id should exist");
    let set_id = row.try_get("set_id").expect("set_id should exist");
    let meta = row.get("meta");

    let n = PrfsTreeNode {
        tree_id,
        pos_w,
        pos_h,
        val,
        set_id,
        meta,
    };

    Ok(n)
}

pub async fn insert_prfs_tree_nodes(
    tx: &mut Transaction<'_, Postgres>,
    nodes: &[PrfsTreeNode],
    update_on_conflict: bool,
) -> Result<u64, DbInterfaceError> {
    let mut query_builder: QueryBuilder<Postgres> = QueryBuilder::new(
        r#"
INSERT INTO prfs_tree_nodes 
(pos_w, pos_h, val, meta, set_id, tree_id)
"#,
    );

    query_builder.push_values(nodes, |mut b, node| {
        b.push_bind(node.pos_w)
            .push_bind(node.pos_h)
            .push_bind(node.val.clone())
            .push_bind(node.meta.clone())
            .push_bind(node.set_id.clone())
            .push_bind(node.tree_id.clone());
    });

    if update_on_conflict {
        query_builder.push("ON CONFLICT (pos_w, pos_h, tree_id)");
        query_builder.push("DO UPDATE SET val = excluded.val, updated_at = now()");
    }

    let query = query_builder.build();
    // println!("query: {}", query.sql());
    let result = query.execute(&mut **tx).await?;

    Ok(result.rows_affected())
}

pub async fn get_largest_pos_w_tree_leaf_node(
    pool: &Pool<Postgres>,
    set_id: &String,
) -> Result<Option<Decimal>, DbInterfaceError> {
    let query = r#"
SELECT * 
FROM prfs_tree_nodes
WHERE set_id=$1 AND pos_h=0
ORDER BY pos_w desc
"#;
    // println!("query: {}", query);

    let row = sqlx::query(&query)
        .bind(&set_id)
        .fetch_optional(pool)
        .await?;

    if let Some(r) = row {
        let pos_w: Decimal = r.get("pos_w");

        Ok(Some(pos_w))
    } else {
        return Ok(None);
    }
}

pub async fn insert_prfs_tree_node(
    tx: &mut Transaction<'_, Postgres>,
    node: &PrfsTreeNode,
) -> Result<Decimal, DbInterfaceError> {
    let query = r#"
INSERT INTO prfs_tree_nodes
(set_id, pos_w, pos_h, val, "meta")
VALUES ($1, $2, $3, $4, $5) 
RETURNING pos_w"#;

    let row = sqlx::query(query)
        .bind(&node.set_id)
        .bind(&node.pos_w)
        .bind(&node.pos_h)
        .bind(&node.val)
        .bind(&node.meta)
        .fetch_one(&mut **tx)
        .await?;

    let pos_w: Decimal = row.get("pos_w");

    return Ok(pos_w);
}

pub async fn update_prfs_tree_node(
    tx: &mut Transaction<'_, Postgres>,
    node: &PrfsTreeNode,
) -> Result<Decimal, DbInterfaceError> {
    let query = r#"
INSERT INTO prfs_tree_nodes
(set_id, pos_w, pos_h, val, "meta")
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (pos_w, pos_h, set_id) 
DO UPDATE SET val=excluded.val, meta=excluded.meta, updated_at = now()
RETURNING pos_w
"#;

    let row = sqlx::query(query)
        .bind(&node.set_id)
        .bind(&node.pos_w)
        .bind(&node.pos_h)
        .bind(&node.val)
        .bind(&node.meta)
        .fetch_one(&mut **tx)
        .await
        .unwrap();

    let pos_w: Decimal = row.get("pos_w");

    return Ok(pos_w);
}

pub async fn delete_prfs_non_leaf_nodes_by_set_id(
    tx: &mut Transaction<'_, Postgres>,
    set_id: &String,
) -> Result<u64, DbInterfaceError> {
    let query = r#"
DELETE FROM prfs_tree_nodes
WHERE set_id=$1 AND pos_h!=0
"#;

    let result = sqlx::query(query).bind(&set_id).execute(&mut **tx).await?;

    return Ok(result.rows_affected());
}

pub async fn delete_prfs_tree_nodes(
    tx: &mut Transaction<'_, Postgres>,
    set_id: &String,
) -> Result<u64, DbInterfaceError> {
    let query = r#"
DELETE FROM prfs_tree_nodes
WHERE set_id=$1
"#;

    let result = sqlx::query(query).bind(&set_id).execute(&mut **tx).await?;

    return Ok(result.rows_affected());
}
