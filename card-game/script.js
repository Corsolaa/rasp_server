log("loaded");
// All the card type that you can have.
let cardTypes = ["H", "S", "D", "C"];
// All the card values that you can have.
let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// Dictionary's to find the image that is related to the image source.
let typeHelper = {
    "H": "hearts",
    "S": "spades",
    "D": "diamonds",
    "C": "clubs"}
let valueHelper = {
    "J": "jack",
    "Q": "queen",
    "K": "king",
    "A": "ace"}
//                              until here /\
let DOCImage = document.querySelector(".cardImage");

// Shows the card on the screen on which card you passed
// GIVE: card: the card coordinates that you want to show (C5, SA)
function showCard(card){
    let type = card.split("")[0];
    let value = card.split("")[1];
    if (card.length === 3) {
        value = card.split("")[1] + card.split("")[2];
    }
    let src = "";
    if (checkCard(type, value)) {
        if (dictInclude(valueHelper, value)) {
            src = "cardImages/" + valueHelper[value] + "_of_" + typeHelper[type] + ".png";
            log(src);
        }
        else {
            src = "cardImages/" + value + "_of_" + typeHelper[type] + ".png";
            log(src);
        }
        DOCImage.setAttribute("src", src)
    }
}

// It lets you can include into a dictionary.
// GIVE: dict:  the dictionary you want to check
//       value: the value that you want to check in the dictionary
// RETURNS: BOOLEAN
function dictInclude(dict, value) {
    let valueHelperIndex = [];
    if (Object.keys(dict).length > 0) {
        for (let key in dict) {
            valueHelperIndex.push(key);
        }
        if (valueHelperIndex.includes(value)) {
            return true;
        }
    }
    else {
        log("Dict is empty");
    }
    return false;
}

// Checks if the card is a valid card in the array.
// GIVE: the card type that you want to check.
//       the card value that you want to check.
// RETURNS: BOOLEAN
function checkCard(cardType, cardValue){
    if (!cardTypes.includes(cardType)) {
        log("The type " + cardType.toUpperCase() + " doesn't exist");
        return false;
    }
    if (!cardValues.includes(cardValue)) {
        log("The value " + cardValue.toUpperCase() + " doesn't exist");
        return false;
    }
    return true;
}

// set's logging attributes
function log(message) {
    console.log(message);
}

// If you want an random integer.
// GIVE: max: a max amount that the digit can go.
// RETURN: INTEGER
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function chooseRandomCard() {
    let randType = randomInt(cardTypes.length);
    let randValue = randomInt(cardValues.length);
    showCard(cardTypes[randType] + cardValues[randValue]);
}

// shows you the value and the length
// GIVE: obj: an object or variable that you want to know the value of, and it's length
function var_dump(obj) {
    log("---------------------");
    log("Value:  " + obj);
    log("Length: " + obj.length);
    log("---------------------");
}

chooseRandomCard();