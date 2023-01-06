<h1>Hero artifact</h1>
<div class="hero_arti_sliders">
    <div class='slider'>
        <p>Current artifact level.</p>
        <label class="slider_range">
            <input type="range" min='1' max='100' value="0" step='1'/>
            <span class="slider_level">level 1</span>
        </label>
    </div>
    <div class='slider'>
        <p>The artifact level that you want</p>
        <label class="slider1_range">
            <input type="range" min='1' max='100' value="0" step='1'/>
            <span class="slider1_level">level 1</span>
        </label>
    </div>
</div>
<div class="h_arti_result slider_result">
    <div class="h_arti_white">0</div>
    <div class="h_arti_green">0</div>
    <div class="h_arti_blue">0</div>
    <div class="h_arti_violet">0</div>
    <div class="h_arti_orange">0</div>
</div>
<script type="module" src="<?php echo "js/h_artifact.js";?>"></script>