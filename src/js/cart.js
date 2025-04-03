import { getLocalStorage, loadHeaderFooter, updateCartIcon } from "./utils.mjs";
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  if (cartItems) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    const totalPrice = cartItems.reduce((total, item) => total + (item['Result'].FinalPrice * item.quantity), 0);
    document.querySelector(".cart-footer").innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  }
  else {
    document.querySelector(".cart-footer").style.display = "none";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item['Result'].Images.PrimarySmall}"
      alt="${item['Result'].Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item['Result'].Name}</h2>
  </a>
  <p class="cart-card__color">${item['Result'].Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="decrease-quantity" data-id="${item['Result'].Id}">-</button>
    <span>${item.quantity}</span>
    <button class="increase-quantity" data-id="${item['Result'].Id}">+</button>
  </div>
  <p class="cart-card__price">$${item['Result'].FinalPrice}</p>
  
</li>`;

  return newItem;
}

document.addEventListener("click", function(event) {
  let cartItems = getLocalStorage("so-cart");
  if (event.target.classList.contains("increase-quantity")) {
    const itemId = event.target.getAttribute("data-id");
    const itemIndex = cartItems.findIndex(item => item['Result'].Id === itemId);
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += 1;
    }
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    updateCartIcon();
  }

  if (event.target.classList.contains("decrease-quantity")) {
    const itemId = event.target.getAttribute("data-id");
    const itemIndex = cartItems.findIndex(item => item['Result'].Id === itemId);
    if (itemIndex > -1) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
      } else {
        cartItems.splice(itemIndex, 1);
      }
    }
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    updateCartIcon();
  }
});


renderCartContents();
