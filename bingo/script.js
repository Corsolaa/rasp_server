const start_screen = document.querySelector(".start_screen");
const play_screen = document.querySelector(".play_screen");
const loader = document.querySelector(".loader");
const grab_ball = play_screen.querySelector(".grab_ball");
const balls = play_screen.querySelector(".balls");

const ball_numbers = [1, 73];
let ball_rolled = [];
const ball_colors = ["red", "orange", "pink", "purple", "yellow", "blue", "green", "white", "black"];
const ball_font_color = ["#FFFFFF", "#0F0A00", "#52000E", "#FFFFFF", "#AD0000", "#FFFFFF", "#FFFFFF", "#000000",
    "#FFFFFF"];

start_screen.addEventListener("click", () => {
    start_screen.classList.toggle("hidden");
    play_screen.classList.toggle("hidden");
});

grab_ball.addEventListener("click", () => {
    const ball = document.createElement("div");
    ball.setAttribute("class", "ball display_center");
    ball.innerHTML = "<div class='inside'><p>"+getBallNumber().toString()+"</p></div>"
    let index = Math.floor(Math.random()*ball_colors.length);
    ball.style.background = ball_colors[index];
    ball.style.color = ball_font_color[index];
    balls.appendChild(ball);
});

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