




document.addEventListener('DOMContentLoaded', () => {
    try {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];

        
        displayCartItems(cartData);
    } catch (error) {
        console.error('Error retrieving cart items:', error);
    }
});

function displayCartItems(cartData) {
    const orderSummary = document.querySelector('.order-summary');
    orderSummary.innerHTML = ''; 
    if (!cartData || cartData.length === 0) {
        orderSummary.innerHTML = '<p>No items in the cart.</p>';
        return;
    }

    cartData.forEach(product => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';

        const itemName = document.createElement('h4');
        itemName.textContent = product.title; 

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${product.price}`; 

        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPrice);
        orderSummary.appendChild(itemElement);
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'order-item';
    const totalAmount = cartData.reduce((total, product) => total + product.price, 0);
    totalElement.innerHTML = `<p>Order Total:</p><h4>$${totalAmount.toFixed(2)}</h4>`;
    orderSummary.appendChild(totalElement);
}









document.addEventListener('DOMContentLoaded', function () {
    const shippingForm = document.getElementById('shipping-form');
    const cancelButton = document.querySelector('.cancel-button');
    const saveButton = document.querySelector('.save-button');
    
   
    saveButton.disabled = true;

    
    function checkFormValidity() {
        let isValid = true;
        const requiredFields = shippingForm.querySelectorAll('input[required]');

        requiredFields.forEach(function (field) {
            if (!field.value.trim()) {
                isValid = false;
            }
        });

        saveButton.disabled = !isValid; 
    }

    shippingForm.addEventListener('input', checkFormValidity);

    cancelButton.addEventListener('click', function () {
        shippingForm.reset(); 
        saveButton.disabled = true; 
    });

    saveButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        if (!saveButton.disabled) {
            alert('Address saved successfully!');
            shippingForm.reset(); 
            saveButton.disabled = true; 
        }
    });
});
