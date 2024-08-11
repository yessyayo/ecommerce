//javascript for hamburger
const hamBurger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav ul')

hamBurger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});



// hero-section javascript
const productsApiUrl = 'https://fakestoreapi.com/products';

function setHeroBackground() {
    fetch(productsApiUrl)
        .then(response => response.json()) 
        .then(products => {
            if (products.length > 0 && products[5]) {
                const imageUrl = products[5].image;
                const heroSection = document.querySelector('.hero-section');

                heroSection.style.backgroundImage = `url(${imageUrl})`;
            } else {
                console.warn('Not enough products available to set the hero background.');
            }
        })
        .catch(error => console.error('Error fetching product image:', error));
}
setHeroBackground();



//feature section javascript

let cartCount = 0;
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}


function addToCart() {
    cartCount += 1;
    updateCartCount(cartCount);
    localStorage.setItem('cartCount', cartCount); 
}

document.addEventListener('DOMContentLoaded', () => {
    
    cartCount = 0;
    updateCartCount(cartCount);
    
    
    updateFeatureItems(); 
});


function updateFeatureItems() {
    const productsApiUrl = 'https://fakestoreapi.com/products';

    fetch(productsApiUrl)
        .then(response => response.json())
        .then(products => {
            if (products.length > 7) {
                const productElements = document.querySelectorAll('.product');

                productElements.forEach((productElement, index) => {
                    const productIndex = index + 7; 
                    if (productIndex < products.length) {
                        const product = products[productIndex];

                        if (index === 0) {
                            productElement.style.backgroundImage = `url(${product.image})`;
                            productElement.style.backgroundSize = 'cover';
                            productElement.style.backgroundPosition = 'center';
                        } else {
                            const imgElement = productElement.querySelector('img');
                            const categoryElement = productElement.querySelector('.product-category');
                            const cartButton = productElement.querySelector('.add-to-cart');

                            if (imgElement && categoryElement && cartButton) {
                                imgElement.src = product.image;
                                imgElement.alt = product.title;
                                categoryElement.textContent = product.category;
                                
                                
                                cartButton.removeEventListener('click', addToCart);
                                cartButton.addEventListener('click', (event) => {
                                    event.preventDefault(); 
                                    addToCart(); 
                                });

                                cartButton.href = `https://fakestoreapi.com/products/${product.id}`;
                            }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching product data:', error));
}








// javascript for trending products
function displayProductCategories() {
    fetch(productsApiUrl)
        .then(response => response.json()) 
        .then(products => {
            const productCatalogs = document.querySelectorAll('.product-catalog');
            const uniqueCategories = [...new Set(products.map(product => product.category))].slice(0, 3);

            uniqueCategories.forEach((category, index) => {
                const productElement = productCatalogs[index];

                const product = products.find(prod => prod.category === category);
                if (product) {
                    const imgElement = productElement.querySelector('img');
                    imgElement.src = product.image;
                    imgElement.alt = product.title;

                    const headingElement = productElement.querySelector('h3');
                    headingElement.textContent = category.toUpperCase();

                    const descriptionElement = productElement.querySelector('p');
                    descriptionElement.textContent = product.description;
                }
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}
displayProductCategories();









