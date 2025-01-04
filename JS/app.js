
// Variables to track the number of items in the cart
let cartCount = 0;

// Function to update cart count next to the basket icon
function updateCartCount() {
    const cartIcon = document.querySelector('nav .nav-links li:last-child');
    cartIcon.innerHTML = `🛒 (${cartCount})`;
}

// Event listeners for "Shop Now" buttons
document.querySelectorAll('.shop-now-btn').forEach(button => {
    button.addEventListener('click', () => {
        const price = button.getAttribute('data-price');
        cartCount++;
        updateCartCount();  // Update the cart count
        alert(`Added to cart! Price: $${price}`);
    });
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-item');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Initially show the first slide
showSlide(currentSlide);

// Cart management
let cart = [];

// Add item to cart
function addToCart(itemId) {
    const price = document.querySelector(`.slider-item:nth-child(${itemId}) .shop-now-btn`).dataset.price;
    const name = document.querySelector(`.slider-item:nth-child(${itemId}) h3`).innerText;

    const item = {
        id: itemId,
        name: name,
        price: parseInt(price),
        quantity: 1
    };

    const existingItem = cart.find((cartItem) => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }


    updateCart();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId);
    updateCart();
}

// Update cart and display modal
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    totalPriceContainer.innerText = totalPrice;

    // Show the modal
    document.getElementById('cart-modal').classList.add('show');
}

// Show/hide cart modal on click
document.getElementById('cart-icon').addEventListener('click', () => {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('show');
});

// Close modal when close button is clicked
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.remove('show');
});
