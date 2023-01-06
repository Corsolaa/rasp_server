import myJson from "./data.json?nocache=123" assert {type: "json"};
const output = document.querySelector("#output");
const ul = document.createElement("ul");
ul.id = "pList";
const inputField = document.createElement("input");
const searchBar = document.querySelector("#searchbar");


function start(){
    createInput();
    searchBar.append(inputField);
    output.append(ul);
    addToPage(myJson.movies);
}

function createInput(){
    inputField.setAttribute("type", "text");
    inputField.placeholder = "Search for names..";
    inputField.id = "input";
}

function inputSearch(){
    let i, a, filter,li;
    filter = inputField.value.toUpperCase();
    li = ul.getElementsByClassName("list");
    for (i = 0; i < li.length; i++) {
        a = li[i].innerHTML;
        if (a.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function addToPage(arr){
    arr.forEach((ele)=>{
        const li = document.createElement("li");
        li.textContent = ele;
        li.classList.add("list");
        ul.append(li);
    })
}

inputField.addEventListener("keyup", inputSearch)

window.onload = start;