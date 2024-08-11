document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => displayProducts(data));

    let cart = [];
    const cartCountEl = document.querySelector('.cart-count');
    const cartItemsEl = document.querySelector('.sidebar .cart-item');
    const totalEl = document.querySelector('.total');

    function displayProducts(products) {
        const root = document.querySelector('.root');
        products.forEach(product => {
            const productEl = document.createElement('div');
            productEl.classList.add('box');
            productEl.innerHTML = `
                <div class="img-box">
                    <img src="${product.image}" alt="${product.title}" class="images">
                </div>
                <div class="bottom">
                    <p>${product.title}</p>
                    <h2>$${product.price.toFixed(2)} <button data-id="${product.id}" class="add-to-cart">Add to Cart</button></h2>
                </div>
            `;
            root.appendChild(productEl);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const product = products.find(p => p.id == productId);
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsEl.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <div class="row-img">
                    <img src="${item.image}" alt="${item.title}" class="rowimg">
                </div>
                <p>${item.title} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                <i class="fa-solid fa-trash" data-id="${item.id}"></i>
            `;
            cartItemsEl.appendChild(cartItemEl);

            cartItemEl.querySelector('.fa-trash').addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        cartCountEl.textContent = cart.length;
        totalEl.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
});






function addToCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    saveCart(); 
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart); 
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.check-out');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'checkout.html';  
        });
    } else {
        console.error('Checkout button not found in the DOM');
    }
});


function goToCheckout() {
    
    const cartData = [
        { id: 1, title: 'Product 1', price: 20 },
        { id: 2, title: 'Product 2', price: 30 }
    ];

    
    localStorage.setItem('cart', JSON.stringify(cartData));

    
    window.location.href = 'checkout.html'; 
}



