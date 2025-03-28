import { getLocalStorage, setLocalStorage, updateCartIcon } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }


async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
       .getElementById('addToCart') 
       .addEventListener('click', this.addProductToCart.bind(this));
}

addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const existingProductIndex = cartItems.findIndex(item => item.Id === this.product.Id);

  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
  } else {
    this.product.quantity = 1;
    cartItems.push(this.product);
  }

  setLocalStorage("so-cart", cartItems);
  updateCartIcon()
}

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = `Price: $${product.ListPrice} `;
  document.getElementById('productColor').textContent = `Color: ${product.Colors[0].ColorName}`;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;

    // Add discount indicator
    const discountIndicator = document.getElementById('discountIndicator');
    if (product.FinalPrice < product.SuggestedRetailPrice) {
      const dsctValue = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
      document.getElementById('productPrice').textContent = `Original Price: $${product.SuggestedRetailPrice} `;
      discountIndicator.textContent = `$${dsctValue} Discounted! New Price $${product.ListPrice}`;
      discountIndicator.style.display = 'block';
      document.getElementById('productPrice').style.color = 'red';
      document.getElementById('productPrice').style.textDecoration = 'line-through';
      document.getElementById('productPrice').style.fontWeight = 'bold';
    } else {
      discountIndicator.style.display = 'none';
    }


}

