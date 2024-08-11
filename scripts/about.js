const hamBurger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav ul')

hamBurger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});


// Product section
let allProductsArray = [];
let cartCount = 0;

function getProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then((data) => {
            allProductsArray = data; 
            displayProducts(allProductsArray); 
        });
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
}


function addToCart(event) {
    event.preventDefault(); 
    cartCount++;
    
    updateCartCount();
}

function displayProducts(products) {
    let productSection = document.querySelector(".product-section");
    let allProductsHTML = "";

    products.forEach(product => {
        let productHTML = `
            <div class="product-gallery">
                <div class="product-details">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <h4 class="product-title">${product.title}</h4>
                    <h6 class="product-category">${product.category}</h6>
                    <div class="product-price-container">
                        <h4 class="product-price">$${product.price}</h4>
                        <button><a href="#" data-productId="${product.id}" class="add-to-cart">Add to Cart</a></button>
                    </div>
                </div>
            </div>
        `;

        allProductsHTML += productHTML;
    });

    productSection.innerHTML = allProductsHTML;

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

document.querySelector(".category-links").addEventListener("click", function(event) {
    if (event.target.classList.contains("category-btn")) {
        let selectedCategory = event.target.getAttribute("data-category");
        let filteredProducts = allProductsArray;

        if (selectedCategory !== "all") {
            filteredProducts = allProductsArray.filter(product => product.category === selectedCategory);
        }

        displayProducts(filteredProducts);
    }
});
getProducts();






