const benchmark_button = document.querySelector(".benchmark_button");
const agree_button = document.querySelector(".agree_button");
const begin_test_check = document.querySelector("#begin_test_check");

benchmark_button.addEventListener("click", () => {
    location.href= "#lower_part";
});

agree_button.addEventListener("click", () => {
    if(begin_test_check.checked) {
        location.href= "benchmark";
    }
});