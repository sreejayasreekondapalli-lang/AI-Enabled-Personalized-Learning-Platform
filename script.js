function loginUser(event) {

    event.preventDefault();

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    if (email !== "" && password !== "") {

        alert("Login successful!");

        window.location.href = "dashboard.html";

    }

}


function submitQuiz() {

    let selected = document.querySelector(
        'input[name="q1"]:checked'
    );

    let result = document.getElementById("quizResult");


    if (!selected) {

        result.innerHTML =
            '<div class="alert alert-warning mt-4">' +
            'Please select an answer.' +
            '</div>';

        return;
    }


    if (selected.value === "Median") {

        result.innerHTML =
            '<div class="alert alert-success mt-4">' +
            '<b>Correct! 🎉</b><br>' +
            'Median represents the middle value of an ordered dataset.' +
            '</div>';

    } else {

        result.innerHTML =
            '<div class="alert alert-danger mt-4">' +
            '<b>Incorrect.</b><br>' +
            'The correct answer is Median.' +
            '</div>';

    }

}


function generateMCQs() {

    let file =
        document.getElementById("material").files[0];

    let result =
        document.getElementById("uploadResult");


    if (!file) {

        result.innerHTML =
            '<div class="alert alert-warning">' +
            'Please select a learning material first.' +
            '</div>';

        return;
    }


    result.innerHTML =
        '<div class="alert alert-info">' +
        '🤖 AI is analyzing your material...<br>' +
        'MCQs will be generated here.' +
        '</div>';

}