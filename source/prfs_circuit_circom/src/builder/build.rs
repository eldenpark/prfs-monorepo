use crate::{paths::PATHS, CircuitBuildJson, CircuitBuildListJson, CircuitsJson, FileKind};
use chrono::{DateTime, NaiveDateTime, Utc};
use colored::Colorize;
use prfs_driver_type::{driver_ids, drivers::spartan_circom_driver::SpartanCircomDriverProperties};
use prfs_entities::entities::PrfsCircuit;
use std::{io::Write, process::Command};

pub fn run() {
    let now = Utc::now();
    let timestamp = now.timestamp_millis();

    println!(
        "{} building {}, timestamp: {}",
        "Start".green(),
        env!("CARGO_PKG_NAME"),
        timestamp
    );

    clean_build();

    let mut circuits_json = read_circuits_json();

    let mut circuit_list = vec![];
    for mut circuit in &mut circuits_json.circuits {
        compile_circuits(&circuit);
        make_spartan(&circuit, timestamp);
        create_build_json(&mut circuit, timestamp);

        circuit_list.push(circuit.circuit_id.to_string());
    }

    create_list_json(&circuit_list, timestamp);
}

fn clean_build() {
    if PATHS.build.exists() {
        std::fs::remove_dir_all(&PATHS.build).unwrap();
    }
}

fn get_path_segment(circuit: &PrfsCircuit, file_kind: FileKind, timestamp: i64) -> String {
    match file_kind {
        FileKind::R1CS => {
            format!("{}/{}.r1cs", &circuit.circuit_id, &circuit.label,)
        }
        FileKind::Spartan => {
            format!(
                "{}/{}_{}.spartan.circuit",
                circuit.circuit_id, circuit.label, timestamp
            )
        }
        FileKind::WtnsGen => {
            format!(
                "{}/{}_js/{}.wasm",
                circuit.circuit_id, circuit.label, circuit.label,
            )
        }
    }
}

fn make_spartan(circuit: &PrfsCircuit, timestamp: i64) {
    let r1cs_src_path = PATHS
        .build
        .join(get_path_segment(circuit, FileKind::R1CS, timestamp));
    let spartan_circuit_path =
        PATHS
            .build
            .join(get_path_segment(circuit, FileKind::Spartan, timestamp));

    circuit_reader::make_spartan_instance(
        &r1cs_src_path,
        &spartan_circuit_path,
        circuit.public_inputs.len(),
    );
}

fn read_circuits_json() -> CircuitsJson {
    let circuits_json_path = PATHS.circuits.join("circuits.json");
    println!("Read circuits.json path: {:?}", circuits_json_path);

    circuits_json_path.try_exists().unwrap();

    let bytes = std::fs::read(circuits_json_path).unwrap();
    let circuits: CircuitsJson = serde_json::from_slice(&bytes).unwrap();

    return circuits;
}

fn compile_circuits(circuit: &PrfsCircuit) {
    let driver_id = &circuit.driver.driver_id;

    let driver: SpartanCircomDriverProperties = match driver_id.as_str() {
        driver_ids::SPARTAN_CIRCOM_DRIVER_TYPE => {
            serde_json::from_str(&circuit.driver.properties.to_string()).unwrap()
        }
        _ => panic!(
            "We cannot compile a circuit of this type, driver: {:?}",
            driver_id.as_str()
        ),
    };

    let circuit_src_path = PATHS.circuits.join(&driver.instance_path);
    println!("circuit_src_path: {:?}", circuit_src_path);

    let build_path = PATHS.build.join(&circuit.circuit_id);
    println!("circuit_build_path: {:?}", build_path);

    std::fs::create_dir_all(&build_path).unwrap();

    let status = Command::new("circom-secq")
        .args([
            circuit_src_path.to_str().unwrap(),
            "--r1cs",
            "--wasm",
            "--prime",
            "secq256k1",
            "-o",
            build_path.to_str().unwrap(),
        ])
        .status()
        .expect("circom-secq command failed to start");

    assert!(status.success());
}

fn create_build_json(circuit: &mut PrfsCircuit, timestamp: i64) {
    let mut driver_props: SpartanCircomDriverProperties =
        serde_json::from_str(&circuit.driver.properties.to_string()).unwrap();
    let wtns_gen_path = get_path_segment(&circuit, FileKind::WtnsGen, timestamp);
    let spartan_circuit_path = get_path_segment(&circuit, FileKind::Spartan, timestamp);

    driver_props.wtns_gen_url = format!("prfs://{}", wtns_gen_path);
    driver_props.circuit_url = format!("prfs://{}", spartan_circuit_path);
    circuit.driver.properties =
        sqlx::types::Json::from(serde_json::to_value(driver_props).unwrap());

    let naive = NaiveDateTime::from_timestamp_millis(timestamp).unwrap();
    let datetime: DateTime<Utc> = DateTime::from_utc(naive, Utc);
    circuit.created_at = datetime;

    let circuit_build_json = CircuitBuildJson {
        timestamp,
        inner: circuit.clone(),
    };

    let build_json_path = PATHS
        .build
        .join(format!("{}/build.json", circuit.circuit_id));
    let mut fd = std::fs::File::create(&build_json_path).unwrap();
    let build_json_str = serde_json::to_string_pretty(&circuit_build_json).unwrap();
    fd.write_all(&build_json_str.into_bytes()).unwrap();

    println!(
        "{} build.json, path: {:?}, build_json: {:#?}",
        "Created".green(),
        build_json_path,
        circuit_build_json,
    );
}

fn create_list_json(circuits_json: &Vec<String>, timestamp: i64) {
    let build_list_json = CircuitBuildListJson {
        timestamp,
        circuits: circuits_json.clone(),
    };

    let build_list_json_path = PATHS.build.join("list.json");
    let mut fd = std::fs::File::create(&build_list_json_path).unwrap();
    let build_json_str = serde_json::to_string_pretty(&build_list_json).unwrap();
    fd.write_all(&build_json_str.into_bytes()).unwrap();

    println!(
        "{} build list, path: {:?}",
        "Created".green(),
        build_list_json_path
    );
}
