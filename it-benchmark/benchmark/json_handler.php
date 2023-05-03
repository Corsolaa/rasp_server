<?php

if (empty($_POST["js_data"])) {
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

/** When there are no questions in the database use the questions in the JSON file.
 *  With those questions you can generate the table columns.
 *
 * @return void
 */
function generate_columns(): void
{
    global $mysqli;
    // Load the JSON data from local machine
    $json_file = file_get_contents('questions.json');
    $json_data = json_decode($json_file, true);

    $mysqli->query("CREATE TABLE `questions`
(
    `sect`   VARCHAR(25) NULL DEFAULT NULL,
    `question` TEXT        NULL DEFAULT NULL,
    `points`   TINYINT     NULL DEFAULT NULL,
    `count`    INT         NULL DEFAULT NULL
);");

    $sql_query_begin = "INSERT INTO `questions` (`sect`, `question`, `points`, `count`) VALUES(";

    // Query SQL for every question that there is in the JSON file.
    foreach ($json_data as $section) {
        $header = $section["name"];
        $questions = $section["questions"];
        foreach ($questions as $question) {
            $text = $question["question"];
            $points = $question["points"];
            $sql_query = $sql_query_begin . "'$header', " . "'$text', " . "'$points', " . "'0');";
            $mysqli->query($sql_query);
        }
    }
}

/** Start the program with this function.
 *
 * @return void
 */
function start_program(): void
{
    global $mysqli;
    if ($mysqli->query("SHOW TABLES LIKE 'questions'")->num_rows == 0) {
        generate_columns();
    }
    increment_count();
}

function increment_count(): void
{
    global $mysqli;

    $question_data = json_decode($_POST["js_data"], true);

    $query_peaces = [];

    foreach ($question_data as $section) {
        $questions = $section["questions"];
        foreach ($questions as $question) {
            $text = $question["question"];
            $count = $mysqli->query("SELECT count FROM questions WHERE question like '%$text%'")->fetch_assoc();
            // If a question is missing from the table just stop everything.
            if ($count == NULL) {
                echo json_encode(false);
                return;
            }
            if ($question["points"] != 0) {
                $query_peaces[] = ["question" => $text, "count" => $count["count"] + 1];

            }
        }
    }

    foreach ($query_peaces as $peace) {
        $mysqli->query("UPDATE questions SET count = " . ($peace["count"]) . " WHERE question like '%{$peace["question"]}%'");
    }
	
	increment_quiz_user();

    echo json_encode(true);
}

function increment_quiz_user(): void
{
    global $mysqli;

    if ($mysqli->query("SHOW TABLES LIKE 'quiz_users'")->num_rows == 0) {
        // Create table for quiz_users incrementation.
        $mysqli->query("CREATE TABLE `it_benchmark`.`quiz_users`(`count` INT NOT NULL);");
    }
    // See what count is set to in the database.
    $count = $mysqli->query("SELECT count FROM quiz_users")->fetch_assoc();
    if ($count == NULL) {
        // Fill in the count variable if none is there;
        $mysqli->query("INSERT INTO `quiz_users` VALUES(1);");
    } else {
        // Increment count bij 1.
        $mysqli->query("UPDATE `quiz_users` SET count= " . $count["count"] + 1 . ";");
    }
}

start_program();

$mysqli->close();
