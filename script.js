// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartItemCountSpan = document.getElementById("cart-item-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsList = document.getElementById("cart-items"); // Only on checkout page
  const totalPriceElement = document.getElementById("total-price"); // Only on checkout page
  const checkoutButton = document.getElementById("checkout-button"); // Only on checkout page

  let cart = JSON.parse(localStorage.getItem("rentalCart")) || [];
  updateCartCount(); // Update cart icon on all pages

  if (addToCartButtons) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.dataset.id;
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);

        const newItem = { id: itemId, name: itemName, price: itemPrice };
        cart.push(newItem);
        localStorage.setItem("rentalCart", JSON.stringify(cart));
        updateCartCount();
        // Optionally provide feedback to the user (e.g., "Added to cart!")
      });
    });
  }

  function updateCartCount() {
    if (cartItemCountSpan) {
      cartItemCountSpan.textContent = cart.length;
    }
  }

  // Functions specifically for the checkout page
  if (window.location.pathname.includes("checkout.html")) {
    updateCheckoutDisplay();

    function updateCheckoutDisplay() {
      cartItemsList.innerHTML = "";
      let total = 0;

      if (cart.length > 0) {
        cart.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
          cartItemsList.appendChild(listItem);
          total += item.price;
        });
        checkoutButton.disabled = false;
      } else {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "Your cart is empty.";
        cartItemsList.appendChild(emptyMessage);
        checkoutButton.disabled = true;
      }

      totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
      updateCheckoutButtonLink();
    }

    function updateCheckoutButtonLink() {
      // ... (same WhatsApp link generation logic as before) ...
    }
  }
});

// Define the path to your JSON file
// const productsPath = "/dummy/products.json";
const productsPath = "https://raw.githubusercontent.com/antsf/outdoor-gear-rentals/refs/heads/main/dummy/products.json";

// Use fetch to load the JSON data
fetch(productsPath)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((productData) => {
    // Now you can use productData here
    const productList = productData.products;

    console.log("product list", productList);

    let productCardsHTML = ""; // Accumulate the HTML for all cards

    productList.forEach((product) => {
      const imageContent = product.imageUrl
        ? `<img src="${product.imageUrl}" alt="${product.name}" class="product-image">`
        : `<svg class="product-image-placeholder" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2z"/>
                        <path d="M8 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM5.66 8.54a.5.5 0 0 1-.88-.446l-.025-.12.8-1.3a.5.5 0 0 1 .88.446l.025.12-.8 1.3zM10.34 8.54a.5.5 0 0 1 .88-.446l-.025-.12-.8-1.3a.5.5 0 0 1-.88.446l-.025.12.8 1.3z"/>
                    </svg>`;

      const cardHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    ${imageContent}
                </div>
                <div class="product-details">
                    <h2 class="product-title">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <div class="price-availability">
                        <span class="price">${product.price}K<span class="price-unit">/${product.price_unit}</span></span>
                        <span class="availability">${product.availability} available</span>
                    </div>
                    <button class="add-to-cart-button">
                        ${product.button_text}
                    </button>
                </div>
            </div>
        `;
      productCardsHTML += cardHTML; // Accumulate HTML
    });
    document.querySelector(".gear-list").innerHTML = productCardsHTML; // Set HTML of the grid container
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
    // Optionally display an error message to the user
    document.querySelector(
      ".grid"
    ).innerHTML = `<p>Error loading product data: ${error.message}</p>`;
  });

// Define the path to your JSON file
// const categoryPath = "/dummy/categories.json";
const categoryPath = "https://raw.githubusercontent.com/antsf/outdoor-gear-rentals/refs/heads/main/dummy/categories.json";

// Use fetch to load the JSON data
fetch(categoryPath)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((categoryData) => {
    // Now you can use productData here
    const categoryList = categoryData.categories;

    console.log("category list", categoryList);

    categoryList.forEach((category) => {
      const categoryCard = document.createElement("div");
      categoryCard.className = "category-card";
      categoryCard.style.backgroundImage = `url(${category.imageUrl})`;

      const categoryText = document.createElement("span");
      categoryText.className = "category-text";
      categoryText.textContent = category.name;

      categoryCard.appendChild(categoryText);
      document.querySelector(".category-grid").appendChild(categoryCard);
    });
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
    // Optionally display an error message to the user
    document.querySelector(
      ".grid"
    ).innerHTML = `<p>Error loading category data: ${error.message}</p>`;
  });
