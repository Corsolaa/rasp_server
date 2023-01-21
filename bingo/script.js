const start_screen = document.querySelector(".start_screen");
const play_screen = document.querySelector(".play_screen");
const loader = document.querySelector(".loader");
const grab_ball = play_screen.querySelector(".grab_ball button");
const balls = play_screen.querySelector(".balls");

const ball_numbers = [1, 75];
let ball_rolled = [];
const ball_colors = ["red", "orange", "pink", "purple", "yellow", "blue", "green", "white", "black"];
const ball_font_color = ["#FFFFFF", "#0F0A00", "#52000E", "#FFFFFF", "#9c00ff", "#FFFFFF", "#FFFFFF", "#000000",
    "#FFFFFF"];

start_screen.addEventListener("click", () => {
    start_screen.classList.toggle("hidden");
    play_screen.classList.toggle("hidden");
});

grab_ball.addEventListener("click", () => {
    grab_ball.disabled = true;
    setTimeout(() => {
        grab_ball.disabled = false;
    }, 1500);
    changeBall();

});

function createBall() {
    const ball = document.createElement("div");
    ball.setAttribute("class", "ball display_center");
    ball.innerHTML = "<div class='inside'><p>X</p></div>"
    ball.style.background = "darkgray";
    ball.style.color = "black";
    balls.appendChild(ball);
}

function changeBall() {
    const ball_array = balls.querySelectorAll(".ball");
    let index = Math.floor(Math.random()*ball_colors.length);
    let ball_number = getBallNumber();
    let ball = ball_array[ball_number - 1];
    ball.innerText = ball_number;
    ball.style.background = ball_colors[index];
    ball.style.color = ball_font_color[index];
    if (ball_colors[index] !== "white") {
        ball.style.border = "2px solid " + ball_font_color[index];
    }
    let ball_text = ball_number;
    if (ball_number < 10) {
        ball_text = "&nbsp;" + ball_number
    }
    if (ball_number === 69) {
        let audio = new Audio("69-mcdonalds.mp3");
        audio.volume = 0.08;
        audio.play();

        grab_ball.innerHTML = "Funny number - " + ball_text;
    }
    else {
        grab_ball.innerHTML = "Pick ball - " + ball_text;
    }
}

function getBallNumber() {
    let min = ball_numbers[0];
    let max = ball_numbers[1] + 1;
    let random = 0;
    if (ball_rolled.length !== ball_numbers[1]) {
        while (true) {
            random = Math.floor(Math.random() * (max - min) + min);
            if (!ball_rolled.includes(random)) {
                ball_rolled.push(random);
                return random
            }
        }
    }
}

function loadBalls() {
    for (let i = 0; i<ball_numbers[1]; i++) {
        createBall();
    }
}

window.addEventListener('load', function () {
    loadBalls();
})