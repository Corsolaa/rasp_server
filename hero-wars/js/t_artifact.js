import {updateSliders} from "./updateSliders.js";
import titanJson from "../json/t_artifact_cost.json" assert {type: "json"};

// Div elements from section used
const t_arti_sliders = document.querySelector(".t_arti_sliders");
const t_arti_result = document.querySelector(".t_arti_result");

// Slider elements
const slider_range = t_arti_sliders.querySelector(".slider_range");
const slider1_range = t_arti_sliders.querySelector(".slider1_range");

// level counters
let cur_t_arti_level = 1;
let end_t_arti_level = 1;

slider_range.addEventListener("input", function (e) {
    updateArtifactTitanSliders("slider_level", e.target.value);
})
slider1_range.addEventListener("input", function (e) {
    updateArtifactTitanSliders("slider1_level", e.target.value);
})

function updateArtifactTitanSliders(selector, value) {
    let slider_info = updateSliders(t_arti_sliders, selector, value, cur_t_arti_level, end_t_arti_level);
    cur_t_arti_level = slider_info[0];
    end_t_arti_level = slider_info[1];
    updateTitanArtifactResults();
}

function updateTitanArtifactResults() {
    let current = parseInt(cur_t_arti_level) + 1;
    let end = parseInt(end_t_arti_level);
    let dust = 0, gold = 0;
    if (current <= end) {
        while (current <= end) {
            dust += titanJson[current]["powder"];
            gold += titanJson[current]["gold"];
            current++;
        }
    }
    t_arti_result.querySelector(".dust").querySelector("p").innerText =
        dust.toLocaleString().toString() + " ";
    t_arti_result.querySelector(".gold").querySelector("p").innerText =
        gold.toLocaleString().toString() + " ";
}