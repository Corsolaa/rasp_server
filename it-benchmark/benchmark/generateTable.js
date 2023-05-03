import {end_form_submit, emailUnValid, validateEmail, show_end_form} from "./end_form.js";
import {createRadar, capitalizeHeader, responseFont} from "./get_radar.js";

let questionsJson;

await fetch("./questions.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        questionsJson = data;
    });

const forms = document.querySelector(".forms");
const page_numb = document.querySelector(".page_numb");
const forms_header = document.querySelector(".forms_header");
const but_submit = document.querySelector(".but_submit");
const end_form = document.querySelector(".end-form");
const end_form_button = end_form.querySelector("button");
const email_input = end_form.querySelector("input#email");
const upper_section_p = document.querySelector(".upper_section p");
const upper_peace = document.querySelector(".upper_peace");
const diagram = document.querySelector(".diagram")
const information = document.querySelector(".information");

let chart_labels = [];
// let chart_labels = ["service_desk", "ict_processen", "service_procecution", "help_me"];
let page_number = 1;
let point_score = [];

end_form_button.addEventListener("click", () => {
    end_form_submit();
});


email_input.addEventListener("focusout", () => {
    if (!email_input.value) {
        email_input.classList.remove("correct_border");
        return;
    }
    if (!validateEmail(email_input.value)) {
        email_input.classList.remove("correct_border");
        emailUnValid();
        return;
    }
    email_input.classList.remove("important_border");
    email_input.classList.add("correct_border");
});

but_submit.addEventListener("click", () => {
    if (checkEverythingFilled()) {
        startQuestionTable(true);
    } else {
        notFilledRed();
    }
});

function checkEverythingFilled() {
    let question = document.querySelectorAll(".question");

    // Loops through all the radiobutton and checks if at latest one of the buttons is checked.
    for (let i = 0; i < question.length; i++) {
        let radio_buttons = question[i].querySelectorAll("input");
        if (!radio_buttons[0].checked && !radio_buttons[1].checked) {
            return false;
        }
    }
    return true;
}

function notFilledRed() {
    let question = document.querySelectorAll(".question");

    // If a radiobutton is not checked the text that is associated to that button gets red color.
    question.forEach(function (question) {
        let radio_buttons = question.querySelectorAll("input");
        let text_ele = question.querySelector("p");
        if (!radio_buttons[0].checked && !radio_buttons[1].checked) {
            text_ele.style.color = "red";
        } else {
            // If filled in after another check it gets colored black again.
            text_ele.style.color = "black";
        }
    });
}

function startQuestionTable(page_up) {
    let total_pages = questionsJson.length;

    if (page_up) {
        grabPoints();
        let questions = document.querySelector(".questions");
        questions.remove();
        page_number++;
        // Go to the top of the page.
        location.href = "#header";
    }

    let button_text = "NAAR STAP " + (page_number + 1) + " VAN " + total_pages;
    // If at the last page change the button to something else.
    if (page_number === total_pages) {
        button_text = "NAAR EINDE TEST";
    }
    but_submit.innerText = button_text;

    // Checks if you are at the last page.
    if (page_number === total_pages + 1) {
        but_submit.remove();
        sendJsonData(point_score);
        return;
    }

    let section = questionsJson[page_number - 1];
    chart_labels.push(section.name);

    // Change header text.
    forms_header.querySelector("h1").innerText = page_number + ". " + capitalizeHeader(section.name);

    let questions_ele = createQuestions(section["questions"]);
    forms.appendChild(questions_ele);

    // Change the top right page counter digits.
    page_numb.innerText = "pagina " + page_number + "/" + total_pages;
}

function sendJsonData(json) {
    let url = 'json_handler.php';
    let formData = new FormData();
    formData.append('js_data', JSON.stringify(json));

    fetch(url, {method: 'POST', body: formData})
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            // If statement gets triggered if JSON code with true gets printed from php script.
            if (body) {
                showRadar(json)
            } else {
                // This gets triggered when there has been an error in the php file.
                emptyElement(forms);
                forms.innerText = "something went wrong, please contact support...";
            }
        });
}

function showRadar(json) {
    forms.remove();
    createCanvas(diagram);
    createRadar(json, questionsJson, chart_labels);
    responseFont();
    information.classList.remove("hidden");
    upper_peace.classList.remove("hidden");
    upper_section_p.classList.remove("hidden");
    show_end_form();
}

function createCanvas(parEle) {
    let canvas = document.createElement("canvas");
    canvas.id = "myChart";
    canvas.style.width = "inherited";
    canvas.style.height = "inherited";
    parEle.appendChild(canvas);
}

function emptyElement(ele) {
    while (ele.firstElementChild) {
        ele.firstElementChild.remove();
    }
}

function createQuestions(questions) {
    let ele_questions = document.createElement("div");
    ele_questions.classList.add("questions");

    // Loop through all the questions in the array.
    for (let i in questions) {
        // Make div element for a question.
        let question = document.createElement("div");
        question.classList.add("question");

        // Make a p element for text inside of question.
        let questionText = document.createElement("p");

        // Gets question text out of array and put numbering in the front.
        questionText.innerText = parseInt(i) + 1 + ". " + questions[i]["question"];

        // Create the radio buttons for the question.
        let radioButtons = createRadioButton(i.toString(), questions[i]["points"]);

        question.appendChild(questionText);
        question.appendChild(radioButtons);

        ele_questions.appendChild(question);

    }
    return ele_questions;
}

function createRadioButton(digit, point) {
    let ele_radio_buttons = document.createElement("div");
    ele_radio_buttons.classList.add("radio_buttons");

    let questionName = "question_" + digit;

    ele_radio_buttons.appendChild(createInput(questionName, "yes", point));
    ele_radio_buttons.appendChild(createLabel(questionName, "yes", "Ja"));
    ele_radio_buttons.appendChild(createInput(questionName, "no", 0));
    ele_radio_buttons.appendChild(createLabel(questionName, "no", "Nee"));

    return ele_radio_buttons;
}

function createInput(questionName, boolean, point) {
    let input = document.createElement("input");

    // Sets the correct attributes for the input element.
    input.setAttribute("type", "radio");
    input.setAttribute("name", questionName);
    input.id = questionName + "_" + boolean;
    input.value = point;

    return input;
}

function createLabel(questionName, boolean, text) {
    let label = document.createElement("label");

    label.innerText = text;
    label.setAttribute("for", questionName + "_" + boolean);

    return label;
}

function grabPoints() {
    let questions = document.querySelectorAll(".question");
    let topic = chart_labels.slice(-1)[0];

    // Makes the temp JSON data spot to later push into final data array.
    let json_data = {name: topic, questions: []};

    for (let i = 0; i < questions.length; i++) {
        let radio_buttons = questions[i].querySelectorAll("input");

        // Prepares the peace of the string that needs to be removed.
        let remove_string = (i + 1).toString() + ". ";
        if (radio_buttons[0].checked) {
            let question_text = questions[i].querySelector("p").innerText;

            // Remove numbering.
            question_text = question_text.split(remove_string)[1];
            // Select first 7 words of string.
            question_text = question_text.split(" ").slice(0, 7).join(" ");

            let points_gained = radio_buttons[0].value;
            // Pushes the JSON data in right format.
            json_data.questions.push({question: question_text, points: points_gained});
        }
    }
    // Add the section with the questions with the point values attached.
    point_score.push(json_data);
}

window.onresize = responseFont;


export {emptyElement};

startQuestionTable(false);

// showRadar(JSON.parse("[{\"name\":\"service_desk\",\"questions\":[{\"question\":\"Beoordeeld uw organisatie de " +
//     "ondersteuning van ICT\",\"points\":\"25\"},{\"question\":\"Ik evalueer regelmatig de gebruikersvragen, zodat ik" +
//     "\",\"points\":\"25\"},{\"question\":\"Ik wil graag dat mijn eindgebruikers altijd\",\"points\":\"25\"}]},{\"name" +
//     "\":\"service_operations\",\"questions\":[{\"question\":\"Ik beschik over een actueel overzicht van\",\"points\":" +
//     "\"10\"},{\"question\":\"Ik weet welke koppelingen mijn kernapplicaties hebben\",\"points\":\"10\"},{\"question\":" +
//     "\"Ik besteed aandacht aan het beheer van\",\"points\":\"30\"}]},{\"name\":\"ict_processen\",\"questions\":[{" +
//     "\"question\":\"Ik heb een goed en actueel overzicht\",\"points\":\"10\"},{\"question\":\"Ik heb een " +
//     "goed werkend in-, uit-\",\"points\":\"10\"},{\"question\":\"Ik kan snel schakelen en ben wendbaar\"," +
//     "\"points\":\"20\"}]}]"))
// but_submit.remove();