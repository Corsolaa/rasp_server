import {updateSliders} from "./updateSliders.js";

// Div elements from section used
const h_arti_sliders = document.querySelector(".hero_arti_sliders");
const h_arti_result = document.querySelector(".h_arti_result");

// Slider elements
const slider_range = h_arti_sliders.querySelector(".slider_range");
const slider1_range = h_arti_sliders.querySelector(".slider1_range");

// level counters
let cur_h_arti_level = 1;
let end_h_arti_level = 1;

slider_range.addEventListener("input", function(e) {
    updateHeroArtifactSliders("slider_level", e.target.value);
});
slider1_range.addEventListener("input", function(e) {
    updateHeroArtifactSliders("slider1_level", e.target.value);
});

function updateHeroArtifactSliders(selector, value) {
    let slider_info = updateSliders(h_arti_sliders, selector, value, cur_h_arti_level, end_h_arti_level);
    cur_h_arti_level = slider_info[0];
    end_h_arti_level = slider_info[1];
    updateHeroArtifactResults();
}

function updateHeroArtifactResults() {
    let current = parseInt(cur_h_arti_level);
    let end = parseInt(end_h_arti_level);
    let h_arti_white = 0, h_arti_green = 0, h_arti_blue = 0, h_arti_violet = 0, h_arti_orange = 0;
    if (current <= end) {
        while (current < end) {
            switch (true) {
                case (current > 0 && current < 25):
                    h_arti_white += current * 2 + 1;
                    break;
                case (current > 24 && current < 50):
                    h_arti_green += current + 5;
                    break;
                case (current > 49 && current < 70):
                    h_arti_blue += current - 20;
                    break;
                case (current > 69 && current < 85):
                    h_arti_violet += current - 40;
                    break;
                case (current > 84 && current < 100):
                    h_arti_orange += current - 55;
                    break;
                default:
                    console.log("stop tempering whit my program...");
                    break;
            }
            current++;
        }
        h_arti_result.querySelector(".h_arti_white").innerText = h_arti_white.toString();
        h_arti_result.querySelector(".h_arti_green").innerText = h_arti_green.toString();
        h_arti_result.querySelector(".h_arti_blue").innerText = h_arti_blue.toString();
        h_arti_result.querySelector(".h_arti_violet").innerText = h_arti_violet.toString();
        h_arti_result.querySelector(".h_arti_orange").innerText = h_arti_orange.toString();
    }
}

