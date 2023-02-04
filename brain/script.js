const popup = document.querySelector(".popup");
const button1 = popup.querySelector(".button1");
const button2 = popup.querySelector(".button2");
const img_warning = popup.querySelector(".img_warning");
const img_info = popup.querySelector(".img_info");
const error_message = popup.querySelector(".error_message");

let counter = 0;
let counter_ignore = 0;

let questions = [
    {
        image: "warning",
        text: "However, I just have one question for you...",
        button1: "",
        button2: "OK",
        width: "450px"
    },
    {
        image: "info",
        text: "Will you be my valentine?",
        button1: "Yes",
        button2: "No?",
        width: "280px"
    },
    {
        image: "info",
        text: "Please?",
        button1: "Yes",
        button2: "No?",
        width: "225px"
    },
    {
        image: "warning",
        text: "fuck you",
        button1: "",
        button2: "OK",
        width: "200px"
    },
    {
        image: "warning",
        text: "nice",
        button1: "",
        button2: "OK",
        width: "175px"
    },
];

button1.addEventListener("click", () => {
    clickButton1();
});
button2.addEventListener("click", () => {
    clickButton2();
});

function cycleButtons(question) {
    if (question.image === "info") {
        img_info.classList.remove("hidden");
        img_warning.classList.add("hidden");
    }
    if (question.image === "warning") {
        img_info.classList.add("hidden");
        img_warning.classList.remove("hidden");
    }
    error_message.innerText = question.text;
    if (question.button1 === "") {
        button1.classList.add("hidden");
    } else {
        button1.classList.remove("hidden");
    }
    button1.innerText = question.button1;
    button2.innerText = question.button2;
    popup.style.width = question.width;
    popup.style.top = "165px";
    popup.style.left = "580px";
}

function clickButton1() {
    switch (counter) {
        case 0:
            console.log("cheating slut...");
            break;
        case 1:
            console.log("cheating slut...");
            break;
        case 2:
            cycleButtons(questions[4]);
            counter = 15;
            break;
        case 3:
            cycleButtons(questions[4]);
            counter = 15;
            break;
        case 15:
            console.log("cheating slut...");
            break;
    }
}

function clickButton2() {
    switch (counter) {
        case 0:
            cycleButtons(questions[counter]);
            counter++;
            break;
        case 1:
            cycleButtons(questions[counter]);
            counter++;
            break;
        case 2:
            cycleButtons(questions[counter]);
            counter++;
            break;
        case 3:
            questions[2].text += "?";
            cycleButtons(questions[2]);
            if (counter_ignore === 4) {
                cycleButtons(questions[3]);
                counter = 15;
            }
            counter_ignore += 1;
            break;
        case 15:
            popup.classList.add("hidden");
            break;
    }
}

dragElement(document.querySelector(".popup"));

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.querySelector(".popup .drag").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}