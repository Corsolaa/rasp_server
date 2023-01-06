<html lang="en">
<?php require("header.php") ?>
<body>
<a href="/" style="color: pink; font-size: 15px; position: absolute">back</a>
<?php require("parts/page_header.php"); ?>
<a href="https://hero-wars.fandom.com/wiki/Heroes#Mobile" target="_blank">Hero info</a>
<a href="https://hero-wars.fandom.com/wiki/Skins#Hero_Skins" target="_blank">Skin info</a>
<div class="content">
    <div class="row2">
        <div class="column box">
            <?php require("parts/t_artifacts.php") ?>
        </div>
        <div class="column box">
            <?php require("parts/h_artifacts.php") ?>
        </div>
    </div>
    <div class="row2">
        <div class="column box">
            <?php require("parts/t_level.php") ?>
        </div>
        <div class="column box">
            <?php require("parts/h_skin.php");?>
        </div>
    </div>
</body>
</html>