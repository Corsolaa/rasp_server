<h1>Titan artifact</h1>
<div class="t_arti_sliders">
    <div class='slider'>
        <p>Current artifact level.</p>
        <label class="slider_range">
            <input type="range" min='1' max='120' value="0" step='1'/>
            <span class="slider_level">level 1</span>
        </label>
    </div>
    <div class='slider'>
        <p>The artifact level that you want</p>
        <label class="slider1_range">
            <input type="range" min='1' max='120' value="0" step='1'/>
            <span class="slider1_level">level 1</span>
        </label>
    </div>
</div>
<div class="t_arti_result slider_result">
    <div class="t_arti_result_item dust">
        <p>0</p>
        <img src="<?php echo "images/fairy_dust.png"; ?>" alt="fairy_dust">
    </div>
    <div class="t_arti_result_item gold">
        <p>0</p>
        <img src="<?php echo "images/gold_coin.png"; ?>" alt="gold_coin">
    </div>
</div>
<script type="module" src="js/t_artifact.js"></script>