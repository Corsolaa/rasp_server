<?php
//$json = file_get_contents("movies_data.json");
//$movie_data = json_decode($json, true);
//var_dump($movie_data);
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="This is a website that shows all the movies that I have watched.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow"/>
    <meta name="author" content="Bruno B">

    <title>Films gekeken</title>

    <link rel="stylesheet" href="main.css">
    <link rel="icon" href="icon.ico">
</head>
<body>
<div class="content">
    <div class="header">
        <div class="top">
            <h1>Films gekeken</h1>
            <a href="upload.php">Film Bijvoegen</a>
        </div>
        <div class="search">
            <label for="search_movie">
                <input type="text" id="search_movie">
                <img src="search-icon.webp" alt="search-icon">
            </label>
        </div>
    </div>
    <div class="movie_display">
        <div class="movie">
            Wreck it Ralph
        </div>
    </div>
</div>
</body>
</html>


