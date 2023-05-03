const end_form = document.querySelector(".end-form");
let chartObject = null;

function createRadar(data, questionsJson, chart_labels) {
    let formData = [];

    data.forEach((section) => {
        formData[section.name] = [];
        let points = 0;
        section.questions.forEach((question) => {
            points += parseInt(question.points);
        });
        formData[section.name].push(points)
    });

    let labels = chart_labels

    for (let i in labels) {
        for (let y in labels[i]) {
            if (labels[i][y] === "_"){
                if (labels[i].split("_")[1] !== "desk") {
                    labels[i] = labels[i].split("_")
                }

            }
        }
    }

    labels = capitalizeHeader(labels);

    for (let i in labels) {
        if (Array.isArray(labels[i])) {
            labels[i][0] = (parseInt(i) + 1) + ". " + labels[i][0]
        }
        else {
            labels[i] = (parseInt(i) + 1) + ". " + labels[i]
        }
    }

    chartObject = new Chart("myChart", {
        type: "radar", data: {
            labels: labels,
            datasets: [{
                label: 'dataset',
                data: generateRadarData(formData, questionsJson),
                fill: false,
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderColor: '#e31937',
            }]
        },
        options: {
            aspectRatio: 1,
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {enabled: false},
            hover: {mode: null},
            scale: {
                angleLines: {
                    color: "rgb(0, 0, 0, 0)"
                },
                pointLabels: {
                    fontStyle: "bold",
                    fontColor: "red",
                    fontSize: 25
                },
                gridLines: {
                    lineWidth: 9,
                    color: "#3b6e8f"
                },
                ticks: {
                    callback: (value) => `${value / 10}          `,
                    fontSize: 30,
                    fontColor: "#3b6e8f",
                    backdropColor: "rgb(0, 0, 0, 0)",
                    beginAtZero: true,
                    max: 40,
                    stepSize: 10
                }
            },
            legend: {
                display: false,
                labels: {
                    fontColor: "red",
                }
            },
            elements: {
                line: {
                    borderWidth: 4
                },
                point: {
                    radius: 0
                }
            }
        },
    });
}

function generateRadarData(formData, questionsJson) {
    let returnData = [];

    // Calculate the percentage of the question that is filled in yes.
    for (let i in formData) {
        let total = totalPoints(questionsJson, i);
        returnData.push((formData[i] / total) * 40).toFixed(3)
    }

    return returnData;
}

function totalPoints(questionsJson, index) {
    let total = 0;

    questionsJson.forEach((section) => {
        if (section.name === index) {
            section.questions.forEach((quest) => {
                total += parseInt(quest.points);
            });
        }
    });

    return total;
}

// !!!!!!!!!!!!!!!DONT TOUCH THIS FREAKING FUNCTION!!!!!!!!!!!!!!!
function capitalizeHeader(str) {
    if (Array.isArray(str)) {
        for (let i in str) {
            if (Array.isArray(str[i])) {
                for (let y in str[i]) {
                    str[i][y] = str[i][y].replace('_', ' ').toUpperCase();
                }
            }
            else {
                str[i] = str[i].replace('_', ' ').toUpperCase();
            }
        }
    } else {
        str = str.replace('_', ' ').toUpperCase();
    }
    return str;

}

function responseFont() {
    if (chartObject !== null) {
        if (window.outerWidth > 1100) {
            chartObject.options.scale.ticks.fontSize = 10;
            chartObject.options.scale.pointLabels.fontSize = 15;
            chartObject.update();
        }
        if (window.outerWidth > 760 && window.outerWidth <= 1100) {
            chartObject.options.scale.ticks.fontSize = 30;
            chartObject.options.scale.pointLabels.fontSize = 20;
            chartObject.update();
        }
        if (450 < window.outerWidth && window.outerWidth <= 760) {
            chartObject.options.scale.gridLines.lineWidth = 9;
            chartObject.options.scale.ticks.fontSize = 15;
            chartObject.options.scale.pointLabels.fontSize = 13;
            chartObject.update();
        }
        if (window.outerWidth <= 450) {
            chartObject.options.scale.gridLines.lineWidth = 4;
            chartObject.options.scale.pointLabels.fontSize = 10;
            chartObject.options.scale.ticks.fontSize = 11;
            chartObject.update();
        }
    }
}

export {createRadar, capitalizeHeader, responseFont};