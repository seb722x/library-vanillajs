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



// shopping-cart
function handleAddToCartClick(event) {
    const addButton = event.target; // Obtiene el botón "Add to Cart" 
    const bookBox = addButton.closest(".box"); // Encuentra el contenedor 

    if (bookBox) {
        const imageNumber = bookBox.querySelector("img").getAttribute("src").match(/\d+/)[0]; // número de la imagen
        const bookDetails = bookInfo[imageNumber]; // detalles del libro del objeto bookInfo

        if (bookDetails) {
            const title = bookDetails.title;
            const price = bookDetails.price;

            addItemToCart(title, parseFloat(price));
        }
    }
}

// Event-listener "Add to Cart"
const addToCartButtons = document.querySelectorAll(".btn");
addToCartButtons.forEach(button => {
    button.addEventListener("click", handleAddToCartClick);
});



//shopping cart

const cartButton = document.querySelector(".fa-shopping-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal = document.getElementById("cartTotal");
const closeCartButton = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkout");
const cartItemsContainer = document.querySelector(".cart-items");
const clearCartButton = document.getElementById("clearCartButton"); 

let totalPrice = 0;

cartButton.addEventListener("click", function () {
    cartOverlay.style.display = "block";
});

closeCartButton.addEventListener("click", function () {
    cartOverlay.style.display = "none";
});


clearCartButton.addEventListener("click", function () {
    clearCart();
});
// Simulation
function addItemToCart(title, price) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `<p>${title} - $${price}</p>`;
    cartItemsContainer.appendChild(cartItem);
    totalPrice += price;
    updateTotal();

    
}


// remove element from cart

function clearCart() {
    cartItemsContainer.innerHTML = ""; // Eliminar todos los elementos del carrito
    totalPrice = 0; // Reiniciar el precio total
    updateTotal(); // Actualizar el total en el carrito
}

// update element cart
function updateTotal() {
    cartTotal.textContent = `$${totalPrice}`;
}

// cart listening
document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const closeBtn = document.getElementById("close-btn");
    const overlayCard = document.getElementById("overlay-card");
    const bookTitle = document.getElementById("book-title");
    const bookAuthor = document.getElementById("book-author");
    const bookDescription = document.getElementById("book-description");
    const searchBox = document.getElementById("search-box");

    function displayBookInfo(book) {
        bookTitle.textContent = book.title;
        bookAuthor.textContent = `Precio: $${book.price}`;
        bookDescription.textContent = "";
        overlayCard.style.display = "flex";
    }

    searchBtn.addEventListener("click", function () {
        const searchTerm = searchBox.value.toLowerCase();

        for (const id in bookInfo) {
            const book = bookInfo[id];
            if (book.title.toLowerCase().includes(searchTerm)) {
                displayBookInfo(book);
                return; 
            }
        }

        bookTitle.textContent = "Libro no encontrado";
        bookAuthor.textContent = "";
        bookDescription.textContent = "";
        overlayCard.style.display = "flex";
    });

    searchBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evitar que se recargue la página
            const searchTerm = searchBox.value.toLowerCase();

            for (const id in bookInfo) {
                const book = bookInfo[id];
                if (book.title.toLowerCase().includes(searchTerm)) {
                    displayBookInfo(book);
                    return; 
                }
            }

            bookTitle.textContent = "Libro no encontrado";
            bookAuthor.textContent = "";
            bookDescription.textContent = "";
            overlayCard.style.display = "flex";
        }
    });

    closeBtn.addEventListener("click", function () {
        overlayCard.style.display = "none";
    });
});
