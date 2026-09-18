// ======================================================
// STATLEARN AI - COMPLETE SCRIPT.JS
// ======================================================


// ======================================================
// 1. LOGIN
// ======================================================

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {

        showToast("Please enter Email and Password.", "warning");

        return;
    }


    const registeredEmail =
        localStorage.getItem("userEmail");

    const registeredPassword =
        localStorage.getItem("userPassword");


    // If an account exists, check credentials

    if (registeredEmail && registeredPassword) {

        if (
            email !== registeredEmail ||
            password !== registeredPassword
        ) {

            showToast(
                "Invalid email or password.",
                "danger"
            );

            return;
        }
    }


    // Save login status

    localStorage.setItem(
        "loggedIn",
        "true"
    );


    showToast(
        "Login successful! Welcome back 🎉",
        "success"
    );


    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 1000);

}



// ======================================================
// 2. REGISTRATION
// ======================================================

function registerUser(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const employeeId =
        document.getElementById("employeeId").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const department =
        document.getElementById("department").value;

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Password validation

    if (password.length < 6) {

        showToast(
            "Password must contain at least 6 characters.",
            "warning"
        );

        return;
    }


    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match!",
            "danger"
        );

        return;
    }


    // Save user information

    localStorage.setItem(
        "userName",
        name
    );

    localStorage.setItem(
        "employeeId",
        employeeId
    );

    localStorage.setItem(
        "userEmail",
        email
    );

    localStorage.setItem(
        "department",
        department
    );

    localStorage.setItem(
        "userPassword",
        password
    );


    // Initial learning data

    localStorage.setItem(
        "overallScore",
        "72"
    );

    localStorage.setItem(
        "coursesCompleted",
        "8"
    );

    localStorage.setItem(
        "quizScore",
        "84"
    );

    localStorage.setItem(
        "learningHours",
        "36"
    );


    showToast(
        "Account created successfully! 🎉",
        "success"
    );


    setTimeout(function () {

        window.location.href =
            "index.html";

    }, 1200);

}



// ======================================================
// 3. TOAST NOTIFICATION
// ======================================================

function showToast(message, type = "success") {

    // Remove previous toast

    const oldToast =
        document.getElementById("statToast");

    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement("div");

    toast.id =
        "statToast";


    let icon = "✅";


    if (type === "danger") {

        icon = "❌";

    }

    else if (type === "warning") {

        icon = "⚠️";

    }

    else if (type === "info") {

        icon = "ℹ️";

    }


    toast.innerHTML = `

        <div style="
            position:fixed;
            top:25px;
            right:25px;
            z-index:9999;
            background:white;
            padding:16px 22px;
            border-radius:14px;
            box-shadow:0 8px 30px rgba(0,0,0,0.18);
            min-width:280px;
            border-left:5px solid #667eea;
            animation:slideToast 0.4s ease;
        ">

            <strong>
                ${icon} ${message}
            </strong>

        </div>
    `;


    document.body.appendChild(toast);


    setTimeout(function () {

        toast.remove();

    }, 3000);

}



// ======================================================
// 4. QUIZ / ASSESSMENT
// ======================================================

function submitQuiz() {

    const selected =
        document.querySelector(
            'input[name="q1"]:checked'
        );


    const result =
        document.getElementById(
            "quizResult"
        );


    if (!selected) {

        result.innerHTML = `

            <div class="alert alert-warning mt-4">

                ⚠️ Please select an answer.

            </div>
        `;

        return;
    }


    if (selected.value === "Median") {

        result.innerHTML = `

            <div class="alert alert-success mt-4">

                <h5>
                    🎉 Excellent! Correct Answer
                </h5>

                <p>
                    Median represents the middle
                    value of an ordered dataset.
                </p>

                <strong>
                    +10 competency points
                </strong>

            </div>
        `;


        // Update quiz score

        localStorage.setItem(
            "lastQuizResult",
            "Correct"
        );


        showToast(
            "Correct answer! +10 competency points 🎯",
            "success"
        );

    }

    else {

        result.innerHTML = `

            <div class="alert alert-danger mt-4">

                <h5>
                    ❌ Not quite!
                </h5>

                <p>
                    The correct answer is
                    <b>Median</b>.
                </p>

                <small>
                    Review the Statistical Methods
                    learning material and try again.
                </small>

            </div>
        `;


        localStorage.setItem(
            "lastQuizResult",
            "Incorrect"
        );


        showToast(
            "Keep learning! You can try again 💪",
            "warning"
        );

    }

}



// ======================================================
// 5. UPLOAD LEARNING MATERIAL
// ======================================================

function generateMCQs() {

    const fileInput =
        document.getElementById(
            "material"
        );


    const result =
        document.getElementById(
            "uploadResult"
        );


    if (!fileInput || !fileInput.files[0]) {

        result.innerHTML = `

            <div class="alert alert-warning">

                ⚠️ Please select a learning material first.

            </div>

        `;

        return;
    }


    const file =
        fileInput.files[0];


    const fileName =
        file.name.toLowerCase();


    const extension =
        fileName.split(".").pop();


    const allowedTypes = [
        "pdf",
        "doc",
        "docx",
        "txt"
    ];


    if (!allowedTypes.includes(extension)) {

        result.innerHTML = `

            <div class="alert alert-danger">

                ❌ Unsupported file.

                <br>

                Please upload PDF, DOC, DOCX or TXT.

            </div>

        `;

        return;
    }


    // Show AI processing

    result.innerHTML = `

        <div class="ai-processing">

            <div class="spinner-border text-primary mb-3">
            </div>

            <h5>
                🤖 AI is analyzing your material...
            </h5>

            <p class="text-muted">
                Identifying topics, skills and competency areas.
            </p>

            <div class="progress mt-3">

                <div
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    style="width:0%"
                    id="aiProgress">

                </div>

            </div>

        </div>

    `;


    let progress = 0;


    const progressBar =
        document.getElementById(
            "aiProgress"
        );


    const interval =
        setInterval(function () {

            progress += 10;


            if (progressBar) {

                progressBar.style.width =
                    progress + "%";

            }


            if (progress >= 100) {

                clearInterval(interval);

            }

        }, 150);


    // Demo AI generation

    setTimeout(function () {

        result.innerHTML = `

            <div class="alert alert-success">

                <h5>
                    🎉 MCQs Generated Successfully!
                </h5>

                <p>
                    <b>File:</b>
                    ${file.name}
                </p>

                <hr>

                <p>
                    🤖 AI identified:
                </p>

                <ul>

                    <li>
                        Statistical Methods
                    </li>

                    <li>
                        Data Analysis
                    </li>

                    <li>
                        Data Interpretation
                    </li>

                </ul>

                <button
                    class="btn btn-success"
                    onclick="window.location.href='assessment.html'">

                    📝 Start Generated Quiz

                </button>

            </div>

        `;


        localStorage.setItem(
            "materialUploaded",
            "true"
        );


        showToast(
            "AI generated your personalized quiz! 🤖",
            "success"
        );


    }, 2000);

}



// ======================================================
// 6. DISPLAY USER INFORMATION
// ======================================================

function displayUserDetails() {

    const name =
        localStorage.getItem(
            "userName"
        );


    const employeeId =
        localStorage.getItem(
            "employeeId"
        );


    const department =
        localStorage.getItem(
            "department"
        );


    const nameElement =
        document.getElementById(
            "userName"
        );


    const employeeElement =
        document.getElementById(
            "employeeIdDisplay"
        );


    const departmentElement =
        document.getElementById(
            "departmentDisplay"
        );


    if (
        nameElement &&
        name
    ) {

        nameElement.innerText =
            name;

    }


    if (
        employeeElement &&
        employeeId
    ) {

        employeeElement.innerText =
            employeeId;

    }


    if (
        departmentElement &&
        department
    ) {

        departmentElement.innerText =
            department;

    }

}



// ======================================================
// 7. LOGOUT
// ======================================================

function logoutUser() {

    localStorage.removeItem(
        "loggedIn"
    );


    showToast(
        "You have been logged out.",
        "info"
    );


    setTimeout(function () {

        window.location.href =
            "index.html";

    }, 800);

}



// ======================================================
// 8. START COURSE
// ======================================================

function startCourse(courseName) {

    showToast(
        "Opening " + courseName + " course 📚",
        "info"
    );


    localStorage.setItem(
        "currentCourse",
        courseName
    );


    setTimeout(function () {

        alert(
            "📚 Course Started!\n\n" +
            courseName +
            "\n\nYour personalized learning journey has started."
        );

    }, 700);

}



// ======================================================
// 9. iGOT KARMAYOGI
// ======================================================

function openIGOT() {

    showToast(
        "Connecting to iGOT Karmayogi 🇮🇳",
        "info"
    );


    setTimeout(function () {

        alert(
            "🇮🇳 iGOT Karmayogi Integration\n\n" +
            "Relevant government learning resources " +
            "will appear here when the API integration is connected."
        );

    }, 700);

}



// ======================================================
// 10. ANIMATED COUNTERS
// ======================================================

function animateCounter(element, target, suffix = "") {

    if (!element) {

        return;

    }


    let current = 0;


    const increment =
        target / 40;


    const timer =
        setInterval(function () {

            current += increment;


            if (current >= target) {

                current = target;

                clearInterval(timer);

            }


            element.innerText =
                Math.floor(current) + suffix;


        }, 30);

}



// ======================================================
// 11. DASHBOARD COUNTERS
// ======================================================

function loadDashboardStats() {

    const score =
        parseInt(
            localStorage.getItem(
                "overallScore"
            )
        ) || 72;


    const courses =
        parseInt(
            localStorage.getItem(
                "coursesCompleted"
            )
        ) || 8;


    const quiz =
        parseInt(
            localStorage.getItem(
                "quizScore"
            )
        ) || 84;


    const hours =
        parseInt(
            localStorage.getItem(
                "learningHours"
            )
        ) || 36;


    const headings =
        document.querySelectorAll(
            ".stat-card h2"
        );


    if (headings.length >= 4) {

        animateCounter(
            headings[0],
            score,
            "%"
        );


        animateCounter(
            headings[1],
            courses
        );


        animateCounter(
            headings[2],
            quiz,
            "%"
        );


        animateCounter(
            headings[3],
            hours
        );

    }

}



// ======================================================
// 12. ACTIVE NAVIGATION
// ======================================================

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();


    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    links.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}



// ======================================================
// 13. FILE NAME DISPLAY
// ======================================================

function setupFilePreview() {

    const fileInput =
        document.getElementById(
            "material"
        );


    if (!fileInput) {

        return;

    }


    fileInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            const oldPreview =
                document.getElementById(
                    "selectedFile"
                );


            if (oldPreview) {

                oldPreview.remove();

            }


            const preview =
                document.createElement(
                    "div"
                );


            preview.id =
                "selectedFile";


            preview.className =
                "alert alert-info mt-3";


            preview.innerHTML = `

                📄
                <strong>
                    Selected File:
                </strong>

                ${file.name}

                <br>

                <small>
                    Size:
                    ${(file.size / 1024).toFixed(1)}
                    KB
                </small>

            `;


            fileInput.parentElement
                .appendChild(preview);

        }
    );

}



// ======================================================
// 14. PASSWORD STRENGTH
// ======================================================

function passwordStrength() {

    const passwordInput =
        document.getElementById(
            "registerPassword"
        );


    if (!passwordInput) {

        return;

    }


    passwordInput.addEventListener(
        "input",
        function () {

            const password =
                this.value;


            let message =
                "";


            let type =
                "danger";


            if (password.length === 0) {

                message = "";

            }

            else if (password.length < 6) {

                message =
                    "Weak password";

                type =
                    "danger";

            }

            else if (
                password.length >= 6 &&
                password.length < 10
            ) {

                message =
                    "Medium password";

                type =
                    "warning";

            }

            else {

                message =
                    "Strong password 🔐";

                type =
                    "success";

            }


            let strength =
                document.getElementById(
                    "passwordStrength"
                );


            if (!strength) {

                strength =
                    document.createElement(
                        "small"
                    );


                strength.id =
                    "passwordStrength";


                passwordInput
                    .parentElement
                    .appendChild(strength);

            }


            strength.innerText =
                message;


            strength.className =
                "text-" + type;

        }
    );

}



// ======================================================
// 15. SEARCH COURSES
// ======================================================

function searchCourses() {

    const searchBox =
        document.getElementById(
            "courseSearch"
        );


    if (!searchBox) {

        return;

    }


    searchBox.addEventListener(
        "input",
        function () {

            const search =
                this.value.toLowerCase();


            const cards =
                document.querySelectorAll(
                    ".course-card"
                );


            cards.forEach(function (card) {

                const text =
                    card.innerText
                    .toLowerCase();


                if (
                    text.includes(search)
                ) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

}



// ======================================================
// 16. SCROLL ANIMATION
// ======================================================

function setupScrollAnimation() {

    const cards =
        document.querySelectorAll(
            ".stat-card, .dashboard-card, .course-card, .analytics-card"
        );


    cards.forEach(function (card) {

        card.style.transition =
            "all 0.5s ease";

    });

}



// ======================================================
// 17. PREVENT BACK TO DASHBOARD AFTER LOGOUT
// ======================================================

function checkLoginStatus() {

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();


    const publicPages = [
        "",
        "index.html",
        "register.html"
    ];


    if (
        !publicPages.includes(
            currentPage
        )
    ) {

        const loggedIn =
            localStorage.getItem(
                "loggedIn"
            );


        // For demo purposes we don't
        // block pages if localStorage
        // is empty.

        if (loggedIn === "false") {

            window.location.href =
                "index.html";

        }

    }

}



// ======================================================
// 18. WELCOME MESSAGE
// ======================================================

function showWelcomeMessage() {

    const name =
        localStorage.getItem(
            "userName"
        );


    const welcome =
        document.getElementById(
            "welcomeMessage"
        );


    if (
        welcome &&
        name
    ) {

        welcome.innerHTML =
            "Welcome back, " +
            name +
            "! 👋";

    }

}



// ======================================================
// 19. AI RECOMMENDATION
// ======================================================

function generateRecommendation() {

    const recommendation =
        document.getElementById(
            "aiRecommendation"
        );


    if (!recommendation) {

        return;

    }


    const recommendations = [

        {
            skill:
                "Statistical Methods",

            time:
                "4 hours",

            reason:
                "Your assessment shows a competency gap in statistical concepts."
        },

        {
            skill:
                "Data Visualization",

            time:
                "3 hours",

            reason:
                "Improving visualization skills can strengthen your data interpretation."
        },

        {
            skill:
                "Emerging Technologies",

            time:
                "5 hours",

            reason:
                "AI and modern technologies are important for future-ready statistical work."
        }

    ];


    const item =
        recommendations[
            Math.floor(
                Math.random() *
                recommendations.length
            )
        ];


    recommendation.innerHTML = `

        <h4>
            🤖 AI Recommendation
        </h4>

        <p>
            ${item.reason}
        </p>

        <h5>
            ${item.skill}
        </h5>

        <p>
            Recommended learning time:
            <b>${item.time}</b>
        </p>

        <a
            href="courses.html"
            class="btn btn-primary">

            View Recommended Courses

        </a>

    `;

}



// ======================================================
// 20. PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayUserDetails();

        loadDashboardStats();

        setActiveNavigation();

        setupFilePreview();

        passwordStrength();

        searchCourses();

        setupScrollAnimation();

        showWelcomeMessage();

        generateRecommendation();

    }
);



// ======================================================
// 21. EXTRA CSS ANIMATION
// ======================================================

const extraStyle =
    document.createElement("style");


extraStyle.innerHTML = `

    @keyframes slideToast {

        from {

            opacity:0;

            transform:
                translateX(50px);

        }

        to {

            opacity:1;

            transform:
                translateX(0);

        }

    }


    .ai-processing {

        text-align:center;

        padding:25px;

        border-radius:15px;

        background:#f8f9ff;

    }


    .nav-link.active {

        font-weight:bold;

        border-bottom:
            2px solid white;

    }


    .course-card,
    .stat-card,
    .dashboard-card,
    .analytics-card {

        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;

    }


    .course-card:hover,
    .stat-card:hover,
    .analytics-card:hover {

        transform:
            translateY(-5px);

        box-shadow:
            0 12px 30px
            rgba(0,0,0,0.12);

    }

`;


document.head.appendChild(
    extraStyle
);