import questionsJson from "./data.json" assert {type: "json"}

const forms = document.querySelector(".forms");
const but_submit = document.querySelector(".but_submit");
const popup = document.querySelector(".popup");
const but_back = popup.querySelector(".but_back");

let chart_labels = [];

but_submit.addEventListener("click", () => {
    createRadar();
    togglePopup();
});
but_back.addEventListener("click", () => {
    togglePopup();
});


function togglePopup() {
    popup.classList.toggle("hidden");
    // body.classList.toggle("overflow_hidden");
}


function createTable(form_name, questions, points) {
    let table = document.createElement("div");
    let header = document.createElement("div");

    // Add the right classes to the table and header tag.
    table.classList.add(form_name, "section");
    header.classList.add("title");

    // Put the right h2 tag into the header tag.
    header.innerHTML = "<h2>" + form_name + "</h2>";

    // Append the header tag into the table.
    table.appendChild(header);

    // Loop through all the questions and generate the rows.
    for (let i in questions) {
        let row = document.createElement("div");

        // Give the right class to the div tag.
        row.classList.add("row");

        // Append the question, select and point sections to the row tag.
        row.appendChild(createQuestion(questions[i], i));
        row.appendChild(createSelect(i, points[i]));
        row.appendChild(createPoints());

        // Add the row tag when it's got the right information to the final table tag.
        table.appendChild(row);
    }
    return table;
}

function createQuestion(questionText, number) {
    let question = document.createElement("div");
    let label = document.createElement("label");

    // Add the right class to the div tag.
    question.classList.add("question");

    // Set the right for attribute to the label tag and the right innerText.
    label.htmlFor = "question_" + number.toString();
    label.innerText = questionText;

    // Append the label tag to the final div tag.
    question.appendChild(label);

    return question;
}

function createSelect(number, points) {
    let div = document.createElement("div");
    let select = document.createElement("select");

    // Set attributes for the select tag with the right values.
    select.setAttribute("name", "question_" + number.toString());
    select.setAttribute("id", "question_" + number.toString());

    // Append the option tags into the select tag.
    select.appendChild(createOption("Nee", 0));
    select.appendChild(createOption("Ja", points));

    // Add event listener for later use.
    select.addEventListener("change", () => {
        let row = select.parentElement.parentElement;
        let points = row.querySelector(".points");

        // Change the points value into the value that is selected.
        points.innerText = select.value;
    })

    // Add the select tag to the designated div tag.
    div.appendChild(select);

    return div;
}

function createOption(string, value) {
    let option = document.createElement("option");

    // Set attributes for the option tag and the innerText.
    option.setAttribute("value", value)
    option.innerText = string;

    return option;
}

function createPoints() {
    let div = document.createElement("div");

    // Add class to div tag and set the default innerText.
    div.classList.add("points");
    div.innerText = "0";

    return div;
}

function generateTable() {
    for (let i in questionsJson) {
        // Create variables for selecting questions and points.
        let section = questionsJson[i]
        let questions = []
        let points = []

        // Loop through all the questions that are in the Json file.
        for (let y in section["questions"]) {
            let question = section["questions"][y]

            // Put the variables in the array for later use.
            questions.push(question["question"])
            points.push(question.points)
        }
        chart_labels.push(section.name);

        // When everything is generated append it to the html page.
        forms.appendChild(createTable(section.name, questions, points));
    }
}

function generateRadarData(formData) {
    let returnData = [];
    for (let i = 0; chart_labels.length > i; i++) {
        let points = 0;
        formData[chart_labels[i]].forEach((point) => {
            points += parseInt(point);
        });
        returnData.push(points);
    }
    return returnData;
}

function createRadar() {
    let formData = [];
    chart_labels.forEach(function (chart_label) {
        const section = document.querySelector("." + chart_label)
        const rows = section.querySelectorAll(".row");
        formData[chart_label.toString()] = [];
        rows.forEach(function (row) {
            const points = row.querySelector(".points");
            formData[chart_label.toString()].push(points.innerText)
        });
    });
    new Chart("myChart", {
        type: "radar",
        data: {
            labels: chart_labels,
            datasets: [{
                label: 'My First Dataset',
                data: generateRadarData(formData),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            maintainAspectRatio: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            },
            legend: {display: false},
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        },
    });
}

generateTable();