<h1>Hero Skins</h1>
<div class="skin_selector vert_center">
    <div class="hero_selector">
        <label for="hero_names">Choose your hero:</label>
        <select name="hero_names" id="hero_names">
        </select>
    </div>
    <div class="skin_type_selector">
        <label for="skin_types">Choose your skin type:</label>
        <select name="skin_types" id="skin_types">
        </select>
    </div>
</div>
<div class="h_skin_sliders">
    <div class='slider'>
        <p>Current hero skin level.</p>
        <label class="slider_range">
            <input type="range" min='0' max='60' value="0" step='1'/>
            <span class="slider_level">level 0</span>
        </label>
    </div>
    <div class='slider'>
        <p>The hero skin level that you want</p>
        <label class="slider1_range">
            <input type="range" min='1' max='60' value="0" step='1'/>
            <span class="slider1_level">level 1</span>
        </label>
    </div>
</div>
<div class="h_skin_result slider_result">
    <div class="h_skin_item">
        <p>0</p>
        <img src="/images/agility_skin_stones.png" alt="skin_stone">
    </div>
</div>

<script type="module" src="js/h_skin.js"></script>
<script type="module" src="js/generate_hero_data.js"></script>