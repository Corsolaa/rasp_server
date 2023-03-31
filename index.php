<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Archive server</title>

    <link rel="icon" href="./favicon.ico">
    <link rel="stylesheet" href="./style.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./fontAwesome.js" crossorigin="anonymous"></script>
</head>
<body>
<header class="header">
    <h1> This is my archive </h1>
    <p> please respect the websites that are displayed here </p>
</header>
<div class="content center">
    <div class="phone">
        <?php
        class website
        {
            public $title;
            public $icon_class;
            public $link;
            function __construct($title, $icon_class, $link)
            {
                $this->title = $title;
                $this->icon_class = $icon_class;
                $this->link = $link;
            }
        }

        $websites[] = new website("Movies", "fa-solid fa-film", "movies");
        $websites[] = new website("Hoaloha", "fa-solid fa-umbrella-beach", "hoaloha");
        $websites[] = new website("PhpMyAdmin", "fa-solid fa-wand-magic-sparkles", "phpmyadmin");
        $websites[] = new website("Hero Wars", "fa-solid fa-screwdriver-wrench", "hero-wars");

        $websites[] = new website("Bingo", "fa-solid fa-circle-dot", "bingo");
        $websites[] = new website("Brian", "fa-solid fa-b", "brian");
        $websites[] = new website("IT Benchmark", "fa-solid fa-wrench", "it-benchmark");
        $websites[] = new website("Woon-Quiz", "fa-solid fa-v", "woon-quiz");

        $websites[] = new website("Card Game", "fa-solid fa-heart", "card-game");
        $websites[] = new website("Jungheinrich", "fa-solid fa-j", "jungheinrich");


        for ($i=0;$i < count($websites);$i++) {
            echo '
            <div class="app">
                <a href="'.$websites[$i]->link.'">
                    <div class="icon">
                        <i class="'.$websites[$i]->icon_class.'"></i>
                    </div>
                    <div class="text">
                        '.$websites[$i]->title.'
                    </div>
                </a>
            </div>
            ';
        }
        ?>
    </div>
</div>
