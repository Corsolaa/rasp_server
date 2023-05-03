import {emptyElement} from "./generateTable.js";

const end_form = document.querySelector(".end-form");
const email_input = end_form.querySelector("input#email");

function show_end_form() {
    end_form.style.display = "flex";
}

function end_form_submit() {
    const inputs = end_form.querySelectorAll("input");
    if (!validateEmail(inputs[0].value)) {
        emailUnValid();
        email_input.focus();
        return;
    }
    const data = get_input_data(inputs)
    end_form_insert(data);
}

function get_input_data(inputs) {
    return {
        email: inputs[0].value,
        first_name: inputs[1].value,
        last_name: inputs[2].value,
        company_name: inputs[3].value
    };
}

function emailUnValid() {
    email_input.classList.add("shake_ele");
    email_input.classList.add("important_border");
    setTimeout(() => {
        email_input.classList.remove("shake_ele");
    }, 501);
}

function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3} ])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function end_form_insert(json) {
    let url = 'end_form_handler.php';
    let formData = new FormData();
    formData.append('end_form_data', JSON.stringify(json));
    fetch(url, {method: 'POST', body: formData})
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            // If statement gets triggered if JSON code with true gets printed from php script.
            if (body) {
                end_form_success()
            } else {
                // This gets triggered when there has been an error in the php file.
                emptyElement(end_form);
                end_form.innerText = "something went wrong, please contact support...";
            }
        });
}

function end_form_success() {
    emptyElement(end_form);
    end_form.innerText = "Uw contact gegevens zijn veilig opgeslagen.";
    end_form.style.textAlign = "center";
    end_form.style.marginTop = "15px";
    end_form.style.marginBottom = "45px";
}

export {end_form_submit, emailUnValid, validateEmail, show_end_form};