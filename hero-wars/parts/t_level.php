<h1>Titan Level</h1>
<div class="titan_level_sliders">
    <div class='slider'>
        <p>Current titan level.</p>
        <label class="slider_range">
            <input type="range" min='1' max='120' value="0" step='1'/>
            <span class="slider_level">level 1</span>
        </label>
    </div>
    <div class='slider'>
        <p>The titan level that you want</p>
        <label class="slider1_range">
            <input type="range" min='1' max='120' value="0" step='1'/>
            <span class="slider1_level">level 1</span>
        </label>
    </div>
</div>
<div class="t_level_result slider_result">
    <div class="t_level_item titan_potion">
        <p>0</p>
        <img src="<?php echo "images/titan_potion.png"?>" alt="titan_potion">
    </div>
</div>
<script type="module" src="<?php echo "js/t_level.js";?>"></script>