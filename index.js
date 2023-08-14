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

//init

window.onscroll = () => {
    if(window.scrollY > 81){
        document.querySelector('.header .header-b2').classList.add('active');
    }else{
        document.querySelector('.header .header-b2').classList.remove('active');
    }
}


window.onload = () => {
    if(window.scrollY > 80){
        document.querySelector('.header .header-b2').classList.add('active');
    }else{
        document.querySelector('.header .header-b2').classList.remove('active');
    }
}




// books-wall
const imageWrapper = document.getElementById("imageWrapper");
const nextButton = document.getElementById("nextButton");
const imagesPerPage = 8;
let currentPage = 0;
const totalImages = 8;


const bookInfo = {
    1: {
        title: "la biblia",
        price: 80000
    },
    2: {
        title: "Código de davinci",
        price: 90000
    },
    3: {
        title: "Don quijote de la amncha",
        price: 44000
    },
    
    4: {
        title: "El hobbit",
        price: 60000
    },
    
    5: {
        title: "Harry potter",
        price: 100000
    },
    
    6: {
        title: "Viaje al centro de la tierra",
        price: 90000
    },

    7: {
        title: "Mobie Dick",
        price: 90000
    },

    8: {
        title: "Una vida con propósito",
        price: 90000
    },
  
};



// function to load images in the wrapper
function loadImages(startIndex) {
    imageWrapper.innerHTML = ""; // Limpiar 

    for (let i = startIndex; i < startIndex + imagesPerPage; i++) {
        const imageNumber = (i % totalImages) + 1; // Cambio aquí
        const imageSrc = `assets/books/${imageNumber}.jpg`;

        const box = document.createElement("div");
        box.classList.add("box");

        const icons = document.createElement("div");
        icons.classList.add("icons");
       

        const image = document.createElement("div");
        image.classList.add("image");
        image.innerHTML = `<img src="${imageSrc}" alt="">`;

        const content = document.createElement("div");
        content.classList.add("content");
        const imageNumberStr = imageNumber.toString(); // Convertir el número de imagen a cadena para acceder a bookInfo
        if (bookInfo.hasOwnProperty(imageNumberStr)) {
            const bookDetails = bookInfo[imageNumberStr];
            content.innerHTML = `
                <h3>${bookDetails.title}</h3>
                <div class="price"><span>${bookDetails.price}</span></div>
                <a href="#" class="btn"> add to cart</a>
            `;
        }

        box.appendChild(icons);
        box.appendChild(image);
        box.appendChild(content);
        imageWrapper.appendChild(box);
    }
}


// load first images
loadImages(currentPage);

