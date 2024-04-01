mod build_cmd;
mod build_handle;
mod cmds;
mod create_envs;
mod deps;
mod paths;

use crate::{
    build_handle::BuildHandle,
    cmds::{
        build_prfs_api_server, build_prfs_crypto_js, dev_prfs_api_server, dev_prfs_asset_server,
        dev_prfs_console_webapp, dev_prfs_docs_website, dev_prfs_id_webapp, dev_prfs_poll_webapp,
        dev_prfs_proof_webapp, dev_shy_webapp, docker_run_default, docker_run_default_debug,
        docker_run_default_local, docker_run_prfs_proof_webapp, seed_shy_api_data,
        start_prfs_api_server, start_prfs_api_server_local, start_prfs_asset_server,
        start_prfs_console_webapp, start_prfs_docs_website, start_prfs_id_webapp,
        start_prfs_poll_webapp, start_prfs_proof_webapp, start_shy_webapp, test, vercel_deploy,
    },
};
use chrono::prelude::*;
use clap::{command, Arg};
use colored::Colorize;
use std::env;

pub type CiError = Box<dyn std::error::Error + Sync + Send>;

fn main() {
    let matches = command!()
        .version("v0.1")
        .propagate_version(true)
        .arg_required_else_help(true)
        // build
        .subcommand(command!("build"))
        .subcommand(command!("build_prfs_driver_spartan_js"))
        .subcommand(command!(build_prfs_crypto_js::CMD_NAME))
        .subcommand(command!(build_prfs_api_server::CMD_NAME))
        .subcommand(command!("build_circuits"))
        // dev mode
        .subcommand(command!(dev_prfs_console_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(dev_prfs_proof_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(dev_prfs_poll_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(dev_prfs_id_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!("dev_shy_webapp").arg(Arg::new("extra_args")))
        .subcommand(command!(dev_prfs_docs_website::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(dev_prfs_asset_server::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(dev_prfs_api_server::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!("dev_snap"))
        // prod mode
        .subcommand(command!(start_prfs_api_server::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_api_server_local::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_asset_server::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_console_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_proof_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_id_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_poll_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_shy_webapp::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(start_prfs_docs_website::CMD_NAME).arg(Arg::new("extra_args")))
        // docker
        .subcommand(command!("docker_run_postgres").arg(Arg::new("extra_args")))
        .subcommand(command!("docker_run_webapp_console").arg(Arg::new("extra_args")))
        .subcommand(command!("docker_run_webapp_proof").arg(Arg::new("extra_args")))
        .subcommand(command!("docker_run_api_server").arg(Arg::new("extra_args")))
        .subcommand(command!("docker_run_asset_server").arg(Arg::new("extra_args")))
        .subcommand(command!(docker_run_default::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(docker_run_default_debug::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!(docker_run_default_local::CMD_NAME).arg(Arg::new("extra_args")))
        .subcommand(command!("docker_down_all").arg(Arg::new("extra_args")))
        // seed
        .subcommand(command!("seed_shy_api_data"))
        .subcommand(command!("seed_assets"))
        // test
        .subcommand(
            command!(test::CMD_NAME).arg(
                Arg::new("extra_args")
                    .trailing_var_arg(true)
                    .allow_hyphen_values(true),
            ),
        )
        // tmux
        .subcommand(command!("tmux").arg(Arg::new("extra_args")))
        // Vercel
        .subcommand(command!(vercel_deploy::CMD_NAME).arg(Arg::new("extra_args")))
        .get_matches();

    let now = Utc::now();
    let timestamp = now.timestamp_millis().to_string();
    println!("{} ci: {} ({})", "Starting".green(), now, timestamp);

    match matches.subcommand() {
        // build
        Some(("build", sub_matches)) => {
            cmds::build::run(sub_matches, &timestamp);
        }
        Some(("build_prfs_driver_spartan_js", sub_matches)) => {
            cmds::build_prfs_driver_spartan_js::run(sub_matches, &timestamp);
        }
        Some((build_prfs_api_server::CMD_NAME, sub_matches)) => {
            cmds::build_prfs_api_server::run(sub_matches, &timestamp);
        }
        Some((build_prfs_crypto_js::CMD_NAME, sub_matches)) => {
            cmds::build_prfs_crypto_js::run(sub_matches, &timestamp);
        }
        Some(("build_circuits", sub_matches)) => {
            cmds::build_circuits::run(sub_matches, &timestamp);
        }
        // dev mode
        Some((dev_prfs_console_webapp::CMD_NAME, sub_matches)) => {
            cmds::dev_prfs_console_webapp::run(sub_matches);
        }
        Some((dev_prfs_proof_webapp::CMD_NAME, sub_matches)) => {
            dev_prfs_proof_webapp::run(sub_matches);
        }
        Some((dev_prfs_poll_webapp::CMD_NAME, sub_matches)) => {
            dev_prfs_poll_webapp::run(sub_matches);
        }
        Some((dev_prfs_id_webapp::CMD_NAME, sub_matches)) => {
            dev_prfs_id_webapp::run(sub_matches);
        }
        Some((dev_shy_webapp::CMD_NAME, sub_matches)) => {
            dev_shy_webapp::run(sub_matches);
        }
        Some((dev_prfs_asset_server::CMD_NAME, sub_matches)) => {
            dev_prfs_asset_server::run(sub_matches);
        }
        Some((dev_prfs_api_server::CMD_NAME, sub_matches)) => {
            dev_prfs_api_server::run(sub_matches);
        }
        Some((dev_prfs_docs_website::CMD_NAME, sub_matches)) => {
            dev_prfs_docs_website::run(sub_matches);
        }
        Some(("dev_snap", sub_matches)) => {
            cmds::dev_snap::run(sub_matches);
        }
        // prod mode
        Some((start_prfs_api_server::CMD_NAME, sub_matches)) => {
            start_prfs_api_server::run(sub_matches);
        }
        Some((start_prfs_api_server_local::CMD_NAME, sub_matches)) => {
            start_prfs_api_server_local::run(sub_matches);
        }
        Some((start_prfs_asset_server::CMD_NAME, sub_matches)) => {
            start_prfs_asset_server::run(sub_matches);
        }
        Some((start_prfs_console_webapp::CMD_NAME, sub_matches)) => {
            start_prfs_console_webapp::run(sub_matches);
        }
        Some((start_prfs_proof_webapp::CMD_NAME, sub_matches)) => {
            start_prfs_proof_webapp::run(sub_matches);
        }
        Some((start_prfs_id_webapp::CMD_NAME, sub_matches)) => {
            start_prfs_id_webapp::run(sub_matches);
        }
        Some((start_prfs_poll_webapp::CMD_NAME, sub_matches)) => {
            start_prfs_poll_webapp::run(sub_matches);
        }
        Some((start_shy_webapp::CMD_NAME, sub_matches)) => {
            cmds::start_shy_webapp::run(sub_matches);
        }
        Some((start_prfs_docs_website::CMD_NAME, sub_matches)) => {
            start_prfs_docs_website::run(sub_matches);
        }
        // docker
        Some(("docker_run_postgres", sub_matches)) => {
            cmds::docker_run_postgres::run(sub_matches);
        }
        Some((docker_run_prfs_proof_webapp::CMD_NAME, sub_matches)) => {
            cmds::docker_run_prfs_proof_webapp::run(sub_matches);
        }
        Some(("docker_run_api_server", sub_matches)) => {
            cmds::docker_run_api_server::run(sub_matches);
        }
        Some((docker_run_default::CMD_NAME, sub_matches)) => {
            docker_run_default::run(sub_matches);
        }
        Some((docker_run_default_debug::CMD_NAME, sub_matches)) => {
            docker_run_default_debug::run(sub_matches);
        }
        Some((docker_run_default_local::CMD_NAME, sub_matches)) => {
            docker_run_default_local::run(sub_matches);
        }
        Some(("docker_down_all", sub_matches)) => {
            cmds::docker_down_all::run(sub_matches);
        }
        // misc
        Some((seed_shy_api_data::CMD_NAME, sub_matches)) => {
            seed_shy_api_data::run(sub_matches);
        }
        Some(("seed_assets", sub_matches)) => {
            cmds::seed_assets::run(sub_matches);
        }
        // Tmux
        Some(("tmux", sub_matches)) => {
            cmds::tmux::run(sub_matches);
        }
        // Vercel
        Some((vercel_deploy::CMD_NAME, sub_matches)) => {
            cmds::vercel_deploy::run(sub_matches);
        }
        //
        Some((test::CMD_NAME, sub_matches)) => {
            cmds::test::run(sub_matches);
        }
        _ => unreachable!("Subcommand not defined"),
    }
}
