use colored::Colorize;
use hyper::Server;
use prfs_api_server::envs::ENVS;
use prfs_api_server::paths::PATHS;
use prfs_api_server::server::router;
use prfs_api_server::server::state::ServerState;
use prfs_api_server::ApiServerError;
use prfs_db_interface::database2::Database2;
use routerify::RouterService;
use std::net::SocketAddr;
use std::sync::Arc;

#[tokio::main]
async fn main() -> Result<(), ApiServerError> {
    println!(
        "{} pkg: {}, curr_dir: {:?}",
        "Starting".green(),
        env!("CARGO_PKG_NAME"),
        std::env::current_dir(),
    );

    ENVS.check();

    let server_state = Arc::new(ServerState::init().await.unwrap());

    let router = router::make_router(server_state).expect("make_router fail");
    let service = RouterService::new(router).expect("router service init fail");

    let addr = SocketAddr::from(([0, 0, 0, 0], 4000));
    let server = Server::bind(&addr).serve(service);

    println!("Prfs backend is running on: {}", addr);
    if let Err(err) = server.await {
        eprintln!("Server error: {}", err);
    }

    Ok(())
}
