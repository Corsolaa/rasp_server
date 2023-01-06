import {updateSliders} from "./updateSliders.js";
import hero_table from "../json/hero.json" assert {type: "json"};
import skin_table from "../json/h_skin_stones.json" assert {type: "json"};

// Div elements from the document.
const h_skin_sliders = document.querySelector(".h_skin_sliders");
const h_skin_result = document.querySelector(".h_skin_result");

// Slider elements.
const slider_range = h_skin_sliders.querySelector(".slider_range");
const slider1_range = h_skin_sliders.querySelector(".slider1_range");

// When the sliders have input run a function.
slider_range.addEventListener("input", function (e) {
    updateHeroSkinSliders("slider_level", e.target.value);
});
slider1_range.addEventListener("input", function (e) {
    updateHeroSkinSliders("slider1_level", e.target.value);
});

// Elements used for the selecting of the hero skins.
const skin_selector = document.querySelector(".skin_selector");
const hero_selector = skin_selector.querySelector(".hero_selector");
const hero_names = hero_selector.querySelector("#hero_names");

const h_skin_result_image = h_skin_result.querySelector("img");
const h_skin_result_count = h_skin_result.querySelector("p");

// level counters.
let cur_h_skin_level = 0;
let end_h_skin_level = 1;

// The hero that you have selected.
let selected_hero = 0;
let main_stat = "";
let data = [];

// When the select option changes it changes the skin selector.
hero_names.addEventListener("change", loadSkins);

// Elements for the skin type selectors.
const skin_type_selector = skin_selector.querySelector(".skin_type_selector");
const skin_types = skin_type_selector.querySelector("#skin_types");

skin_types.addEventListener("change", selectSkinStoneSize);

function updateHeroSkinSliders(selector, value) {
    let slider_info = updateSliders(h_skin_sliders, selector, value, cur_h_skin_level, end_h_skin_level);
    cur_h_skin_level = slider_info[0];
    end_h_skin_level = slider_info[1];
    updateHeroSkinResults();
}

function updateHeroSkinResults() {
    let entry = parseInt(cur_h_skin_level);
    let end = parseInt(end_h_skin_level);
    let skin_stones = 0;
    let add = 0;
    let begin = 0;
    if (entry <= end) {
        if (skin_types.value === "default") {
            begin = -1;
        }
        while (entry < end) {
            switch (true) {
                case (entry > begin && entry < 5):
                    add = data[0]["skin_stones"];
                    break;
                case (entry > 4 && entry < 10):
                    add = data[1]["skin_stones"];
                    break;
                case (entry > 9 && entry < 15):
                    add = data[2]["skin_stones"];
                    break;
                case (entry > 14 && entry < 20):
                    add = data[3]["skin_stones"];
                    break;
                case (entry > 19 && entry < 25):
                    add = data[4]["skin_stones"];
                    break;
                case (entry > 24 && entry < 30):
                    add = data[5]["skin_stones"];
                    break;
                case (entry > 29 && entry < 35):
                    add = data[6]["skin_stones"];
                    break;
                case (entry > 34 && entry < 40):
                    add = data[7]["skin_stones"];
                    break;
                case (entry > 39 && entry < 45):
                    add = data[8]["skin_stones"];
                    break;
                case (entry > 44 && entry < 50):
                    add = data[9]["skin_stones"];
                    break;
                case (entry > 49 && entry < 55):
                    add = data[10]["skin_stones"];
                    break;
                case (entry > 54 && entry < 60):
                    add = data[11]["skin_stones"];
                    break;
            }
            skin_stones += add;
            entry++;
        }
        h_skin_result_count.innerText = skin_stones.toString();
    }
}

function selectSkinStoneSize() {
    switch (skin_types.value) {
        case "default":
            data = skin_table[0].data;
            slider_range.querySelector("input").min = "0";
            break;
        case "champion":
            data = skin_table[1].data;
            slider_range.querySelector("input").min = "1";
            slider_range.querySelector("span").innerText = "level 1";
            break;
        case "winter":
            data = skin_table[2].data;
            slider_range.querySelector("input").min = "1";
            slider_range.querySelector("span").innerText = "level 1";
            break;
        default:
            data = skin_table[3].data;
            slider_range.querySelector("input").min = "1";
            slider_range.querySelector("span").innerText = "level 1";
            break;
    }
    updateHeroSkinResults();
}

// Loads all the heros from the table and inserts it in the selector.
function loadHeros() {
    for (let i = 1; i < hero_table.length; i++) {
        createOptions(hero_names, hero_table[i].name);
    }
    loadSkins();
    selectSkinStoneSize();
}

function changeSkinStoneImage() {
    h_skin_result_image.src = "images/" + main_stat.toLowerCase() + "_skin_stones.png";
}

// Loads the correct skin types for the selected hero.
function loadSkins() {
    selected_hero = indexSelect(hero_names, hero_names.value) + 1;
    main_stat = hero_table[selected_hero]["main_stat"];
    // Removes all elements from the select element.
    skin_types.innerHTML = "";
    // Sets to right index for hero table selection.
    let keys = [];
    for (let key in hero_table[selected_hero]["skins"]) {
        keys.push(key);
    }
    for (let i = 0; i < keys.length; i++) {
        createOptions(skin_types, keys[i])
    }
    changeSkinStoneImage();
}

// Creates an option element with the right values and appends it to the set parent.
function createOptions(select, values) {
    let option = document.createElement("option");
    option.value = values;
    option.innerText = capitalizeText(values);
    // Appends option element to set parent select element.
    select.appendChild(option);
}

//Capitalizes the string
function capitalizeText(value) {
    let textArray = value.split(" ")
    let capitalizedText = ""
    // Conjunctions that you don't want to capitalize.
    let conjunctions = ["and"];
    for (let i = 0; i < textArray.length; i++) {
        // Checks if the string peace has a conjunction word in it.
        if (conjunctions.includes(textArray[i])) {
            capitalizedText += " " + textArray[i] + " ";
            // Skip to capitalize word part.
            continue;
        }
        // Upper case the first letter of the string that is selected.
        capitalizedText += textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1);
        // If there is a space in between put a space back.
        if (textArray.length > 1) {
            capitalizedText += " ";
        }
    }
    return capitalizedText;
}

// Select the index of the element with the correct text inside it
function indexSelect(ele, text) {
    // Loop through all child elements in parent element.
    for (let i = 0; i < ele.length; i++) {
        // Checks if the child node value is the value you are looking for.
        if (ele[i].childNodes[0].nodeValue === capitalizeText(text)) {
            // Returns the index of the element you're looking for.
            return i;
        }
    }
    // If the value is not in the elements it returns undefined.
    return undefined;
}

loadHeros();