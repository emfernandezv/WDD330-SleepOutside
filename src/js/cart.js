import { getLocalStorage, loadHeaderFooter, updateCartIcon } from "./utils.mjs";
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  if (cartItems) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    const totalPrice = cartItems.reduce((total, item) => total + (item.FinalPrice * item.quantity), 0);
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
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-id="${item.Id}">Remove</button>
</li>`;


  return newItem;
}

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-item")) {
    const itemId = event.target.getAttribute("data-id");
    let cartItems = getLocalStorage("so-cart");
    const itemIndex = cartItems.findIndex(item => item.Id === itemId);
    
    if (itemIndex > -1) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
      } else {
        cartItems.splice(itemIndex, 1);
      }
    }
    
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    updateCartIcon()
 }
});

renderCartContents();
