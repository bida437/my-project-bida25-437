/* =========================================
   GANG APPAREL SHOPPING CART SYSTEM
========================================= */

/* PRODUCTS */

const products = [
    {
        id: 1,
        name: "GANG APPAREL CAP",
        price: 300,
        image: "images/cap.jpg"
    },

    {
        id: 2,
        name: "OVERSIZED HOODIE",
        price: 900,
        image: "images/hoodie.jpg"
    },

    {
        id: 3,
        name: "CLASSIC STREET TEE",
        price: 500,
        image: "images/tshirt.jpg"
    }
];

/* =========================================
   CART STORAGE
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================================
   SAVE CART
========================================= */

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}

/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId){

    const existingProduct = cart.find(item => item.id === productId);

    if(existingProduct){

        existingProduct.quantity += 1;

    } else {

        const product = products.find(item => item.id === productId);

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    alert("Product added to cart!");

}

/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity(productId){

    const product = cart.find(item => item.id === productId);

    if(product){

        product.quantity += 1;

    }

    saveCart();

    renderCart();

}

/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity(productId){

    const product = cart.find(item => item.id === productId);

    if(product){

        product.quantity -= 1;

        if(product.quantity <= 0){

            cart = cart.filter(item => item.id !== productId);

        }

    }

    saveCart();

    renderCart();

}

/* =========================================
   CALCULATE TOTAL
========================================= */

function calculateTotal(){

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total;

}

/* =========================================
   RENDER CART
========================================= */

function renderCart(){

    const cartContainer = document.getElementById("cart-items");

    const totalElement = document.getElementById("cart-total");

    if(!cartContainer) return;

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `

            <div class="text-center py-5">

                <h3>Your cart is empty</h3>

            </div>

        `;

        if(totalElement){

            totalElement.innerText = "P0";

        }

        return;

    }

    cart.forEach(item => {

        cartContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    <img src="${item.image}" alt="${item.name}">

                </div>

                <div class="product-info">

                    <h3>${item.name}</h3>

                    <h4>P${item.price}</h4>

                    <div class="quantity-box">

                        <button onclick="decreaseQuantity(${item.id})">
                            -
                        </button>

                        <input type="text" value="${item.quantity}" readonly>

                        <button onclick="increaseQuantity(${item.id})">
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

    if(totalElement){

        totalElement.innerText = "P" + calculateTotal();

    }

}

/* =========================================
   CHECKOUT
========================================= */

function checkout(){

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }

    alert("Checkout Total: P" + calculateTotal());

}

/* =========================================
   LOAD CART ON PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderCart();

});
