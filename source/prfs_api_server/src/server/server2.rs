use colored::Colorize;
use prfs_axum_lib::axum::{self, Router};
use prfs_axum_lib::tower_http::trace::TraceLayer;
use prfs_common_server_state::ServerState;
use std::net::SocketAddr;
use std::sync::Arc;

use crate::router::router2;
use crate::server::state::init_server_state;

const PORT: u16 = 4000;

pub async fn run_server() {
    let server_state = {
        let s = init_server_state().await.unwrap();
        Arc::new(s)
    };

    let _ = tokio::join!(
        serve(
            using_serve_dir_with_handler_as_service(server_state).await,
            PORT
        ),
        // start_listening_to_prfs_id_session_db_events(server_state_clone)
    );
}

async fn using_serve_dir_with_handler_as_service(server_state: Arc<ServerState>) -> Router {
    router2::route(server_state).await
}

async fn serve(app: Router, port: u16) {
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    let local_addr = listener.local_addr().unwrap();

    tracing::info!("Listening on {}", local_addr.to_string().green());

    axum::serve(listener, app.layer(TraceLayer::new_for_http()))
        .await
        .unwrap();
}
