<?php

if (empty($_POST["end_form_data"])) {
    echo "what are you doing here....";
    die();
}

require "../vendor/autoload.php";

use DevCoder\DotEnv;

//Set this variable to your .env file for correct variables.
$absolutePathToEnvFile = "../../.env";

(new DotEnv($absolutePathToEnvFile))->load();

$mysqli = new mysqli(
    getenv("DATABASE_IP"),
    getenv("DATABASE_USER"),
    getenv("DATABASE_PASS"),
    "it_benchmark");

check_table();


function check_table(): void
{
    global $mysqli;

    // Check if table exists in database.
    if ($mysqli->query("SHOW TABLES LIKE 'contact_info'")->num_rows == 0) {
        generate_table();
    }

    insert_data();

    // Check if the data was inserted correctly.
    if ($mysqli->affected_rows) {
        echo json_encode(true);
        return;
    }

    echo json_encode(false);
}

function insert_data(): void
{
    global $mysqli;

    $personal_data = json_decode($_POST["end_form_data"], true);

    if ($personal_data) {
        $mysqli->query("INSERT INTO `contact_info` (`email`, `first_name`, `last_name`, `company_name`)
        VALUES ('" . $personal_data["email"] . "', '" . $personal_data["first_name"] . "', '" .
            $personal_data["last_name"] . "', '" . $personal_data["company_name"] . "');");
        return;
    }
    echo json_encode(false);
}

function generate_table(): void
{
    global $mysqli;

    $mysqli->query("CREATE TABLE `it_benchmark`.`contact_info`
    (
        `email`        TEXT NULL DEFAULT NULL,
        `first_name`   TEXT NULL DEFAULT NULL,
        `last_name`    TEXT NULL DEFAULT NULL,
        `company_name` TEXT NULL DEFAULT NULL
    );");
}


