import {updateSliders} from "./updateSliders.js";

// Div elements from section used
const t_level_sliders = document.querySelector(".titan_level_sliders");
const t_level_result = document.querySelector(".t_level_result");

// Slider elements
const slider_range = t_level_sliders.querySelector(".slider_range");
const slider1_range = t_level_sliders.querySelector(".slider1_range");

// level counters
let cur_t_level_level = 1;
let end_t_level_level = 1;

slider_range.addEventListener("input", function (e) {
    updateTitanLevelSliders("slider_level", e.target.value);
});
slider1_range.addEventListener("input", function (e) {
    updateTitanLevelSliders("slider1_level", e.target.value);
});

function updateTitanLevelSliders(selector, value) {
    let slider_info = updateSliders(t_level_sliders, selector, value, cur_t_level_level, end_t_level_level);
    cur_t_level_level = slider_info[0];
    end_t_level_level = slider_info[1];
    updateTitanLevelResults();
}

function updateTitanLevelResults() {
    let current = 0;
    let entry = parseInt(cur_t_level_level);
    let end = parseInt(end_t_level_level);
    let t_level_multiplier = 0;
    let titan_potion = 0;
    if (current <= end) {
        while (current < end) {
            if (entry <= current) {
                titan_potion += (100 + t_level_multiplier);
            }
            switch (true) {
                case (current > 0 && current < 30):
                    t_level_multiplier += 10;
                    break;
                case (current > 29 && current < 50):
                    t_level_multiplier += 50;
                    break;
                case (current > 49 && current < 70):
                    t_level_multiplier += 100;
                    break;
                case (current > 69 && current < 81):
                    t_level_multiplier += 200;
                    break;
                case (current > 80 && current < 99):
                    t_level_multiplier += 400;
                    break;
                case (current > 98 && current < 109):
                    t_level_multiplier += 600;
                    break;
                case (current > 108 && current < 120):
                    t_level_multiplier += 800;
                    break;
            }
            current++;
        }
    }
    t_level_result.querySelector(".titan_potion").querySelector("p").innerText =
        titan_potion.toLocaleString().toString();
}