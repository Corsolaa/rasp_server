const quiz_sector = document.querySelector(".quiz_sector");
const quiz_contact = document.querySelector(".quiz_contact");
const quiz_digit = quiz_sector.querySelector(".quiz_digit");
const quiz_digit2 = quiz_sector.querySelector(".quiz_digit2");
const quiz_question = quiz_sector.querySelector(".quiz_question");
const quiz_result = document.querySelector(".quiz_result");
const quiz_img = quiz_sector.querySelector(".quiz_img");
const img_loader = quiz_sector.querySelector(".img_loader");
const quiz_images = quiz_img.querySelectorAll("img");

const quiz_images_order = shuffle([[1, "Scandinavisch"], [2, "Industrieel"], [3, "Modern"], [4, "Klassiek"], [5, "Landelijk"], [6, "Vintage"]]);
let quiz_order = [["bankstel"], ["stoelen"], ["badkamer"], ["bedden"], ["thuis"], ["lampen"], ["zitstoel"], ["keuken"], ["sfeer"], ["wonen"],];
const quiz_text = ["", "Waar zou jij het liefst een hele avond tafelen?", "In welke badkamer kom jij helemaal tot rust",
    "Van welk bed droom jij?", "Waar voel jij je het meeste thuis?", "Welke lamp zie jij graag branden",
    "Op welke stoel plof jij het liefst neer?", "In welke keuken zie jij jezelf wel koken?",
    "Waarmee breng jij sfeer in huis", "Waar zou jij graag willen wonen?"];
let images_index = 0;

let scores = [["scandinavisch", 0], ["industrieel", 0], ["modern", 0], ["klassiek", 0], ["landelijk", 0], ["vintage", 0]];

setImages();

function imageClick(digit) {
    saveScore(quiz_images_order[digit - 1][1]);
    quiz_order[images_index - 1][1] = quiz_images_order[digit - 1][1];
    if (images_index < 10) {
        shuffle(quiz_images_order);
        setImages();
    } else {
        images_index++;
    }
    quiz_digit.innerHTML = "Vraag " + (images_index).toString() + ": ";
    quiz_digit2.innerHTML = "Vraag " + (images_index).toString() + " van 10";
    quiz_question.innerHTML = quiz_text[images_index - 1];
    if (images_index === 11) {
        quiz_sector.style.display = "none";
        quiz_contact.style.display = "block";
        quiz_result.innerHTML = calcQuizResult();
    }
}

function imgLoader() {
    quiz_img.style.display =  "none";
    img_loader.style.display = "block";
    quiz_digit2.style.borderRadius = "25px";
    setTimeout(function (){
        img_loader.style.display = "none";
        quiz_img.style.display =  "flex";
        quiz_digit2.style.borderRadius = "25px 25px 0 0";
    }, 1500);
}

function saveScore(choice) {
    switch (choice) {
        case "Scandinavisch":
            scores[0][1]++;
            break;
        case "Industrieel":
            scores[1][1]++;
            break;
        case "Modern":
            scores[2][1]++;
            break;
        case "Klassiek":
            scores[3][1]++;
            break;
        case "Landelijk":
            scores[4][1]++;
            break;
        case "Vintage":
            scores[5][1]++;
            break;
    }
}

function setImages() {
    let index = 0;
    quiz_images.forEach(function (img) {
        img.src = "./images/" + quiz_order[images_index][0] + "/" +
            quiz_order[images_index][0] + "-" + quiz_images_order[index][0] + ".png";
        index++;
    });
    images_index++;
    imgLoader();
}

function calcQuizResult() {
    let largest = scores[0][1];
    let result = scores[0][0];
    for (let i = 0; i < scores.length; i++) {
        // console.log(scores[i][1]);
        if (largest < scores[i][1]) {
            largest = scores[i][1];
            result = scores[i][0];
        }
    }
    return result;
}

// Array randomizer
function shuffle(array) {
    let currentIndex = array.length
    let randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}