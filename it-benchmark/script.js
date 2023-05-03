const benchmark_button = document.querySelector(".benchmark_button");
const agree_button = document.querySelector(".agree_button");
const text_peaces = document.querySelectorAll(".text_peace");
const middle_section = document.querySelector(".middle_section").querySelectorAll("div");

let inside = false
let smoll = false

benchmark_button.addEventListener("click", () => {
    location.href= "#lower_part";
});

agree_button.addEventListener("click", () => {
        location.href= "benchmark";
});

function checkResize() {
    let ele = window;
    if (ele.innerWidth <= 1100) {
        if (!inside) {
            let keep = text_peaces[1].innerHTML;
            text_peaces[1].innerHTML = text_peaces[2].innerHTML;
            text_peaces[2].innerHTML = keep;
            inside = true
        }
    }
    if (ele.innerWidth > 1100) {
        if (inside) {
            let keep = text_peaces[2].innerHTML;
            text_peaces[2].innerHTML = text_peaces[1].innerHTML;
            text_peaces[1].innerHTML = keep;
            inside = false
        }
    }
    if (ele.innerWidth <= 450) {
        if (!smoll) {
            let keep = text_peaces[1].innerHTML;

            text_peaces[1].innerHTML = text_peaces[4].innerHTML;
            text_peaces[4].innerHTML = keep;

            keep = text_peaces[1].innerHTML;

            text_peaces[1].innerHTML = text_peaces[3].innerHTML;
            text_peaces[3].innerHTML = keep;
            console.log(middle_section)

            smoll = true
        }
    }
    if (ele.innerWidth > 450) {
        if (smoll) {
            let keep = text_peaces[3].innerHTML;

            text_peaces[3].innerHTML = text_peaces[1].innerHTML;
            text_peaces[1].innerHTML = keep;

            keep = text_peaces[4].innerHTML;

            text_peaces[4].innerHTML = text_peaces[1].innerHTML;
            text_peaces[1].innerHTML = keep;


            smoll = false
        }
    }

}

checkResize();

window.addEventListener('resize', checkResize);