console.log("im connected")



//login
document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.getElementById("loginContainer");
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");
    const messageBox = document.getElementById("messageBox");
    const closeButton = document.getElementById("closeButton");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const registerSubmit = document.getElementById("registerSubmit");
    const backToLogin = document.getElementById("backToLogin");
    const message = document.getElementById("message");

    const loginBtn = document.getElementById("login-btn");
    loginBtn.addEventListener("click", function() {
        loginContainer.style.display = "flex";
        loginBox.style.display = "block";
        registerBox.style.display = "none";
    });

    loginButton.addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const savedUser = localStorage.getItem(username);

        if (savedUser && JSON.parse(savedUser).password === password) {
            showMessage("Login successful!");
        } else {
            showMessage("Incorrect credentials.");
        }
    });

    registerButton.addEventListener("click", function() {
        loginBox.style.display = "none";
        registerBox.style.display = "block";
    });

    registerSubmit.addEventListener("click", function() {
        const regName = document.getElementById("regName").value;
        const regEmail = document.getElementById("regEmail").value;
        const regPassword = document.getElementById("regPassword").value;

        if (!localStorage.getItem(regEmail)) {
            const newUser = {
                name: regName,
                email: regEmail,
                password: regPassword
            };
            localStorage.setItem(regEmail, JSON.stringify(newUser));
            showMessage("Registration successful! You can now log in.");
            registerBox.style.display = "none";
            loginBox.style.display = "block";
        } else {
            showMessage("User with this email already exists.");
        }
    });

    backToLogin.addEventListener("click", function() {
        registerBox.style.display = "none";
        loginBox.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        hideLoginContainer();
    });

    function showMessage(msg) {
        message.textContent = msg;
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
    }

    function hideLoginContainer() {
        loginContainer.style.display = "none";
    }
});
