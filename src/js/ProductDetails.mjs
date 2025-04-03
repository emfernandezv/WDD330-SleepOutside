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
  const existingProductIndex = cartItems.findIndex(item => item['Result'].Id === this.product['Result'].Id);

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
  document.querySelector('h2').textContent = product['Result'].Brand.Name;
  document.querySelector('h3').textContent = product['Result'].NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product['Result'].Images.PrimaryLarge;
  productImage.alt = product['Result'].NameWithoutBrand;

  document.getElementById('productPrice').textContent = `Price: $${product['Result'].ListPrice} `;
  document.getElementById('productColor').textContent = `Color: ${product['Result'].Colors[0].ColorName}`;
  document.getElementById('productDesc').innerHTML = product['Result'].DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product['Result'].Id;

    // Add discount indicator
    const discountIndicator = document.getElementById('discountIndicator');
    if (product.FinalPrice < product['Result'].SuggestedRetailPrice) {
      const dsctValue = (product['Result'].SuggestedRetailPrice - product['Result'].FinalPrice).toFixed(2);
      document.getElementById('productPrice').textContent = `Original Price: $${product['Result'].SuggestedRetailPrice} `;
      discountIndicator.textContent = `$${dsctValue} Discounted! New Price $${product['Result'].ListPrice}`;
      discountIndicator.style.display = 'block';
      document.getElementById('productPrice').style.color = 'red';
      document.getElementById('productPrice').style.textDecoration = 'line-through';
      document.getElementById('productPrice').style.fontWeight = 'bold';
    } else {
      discountIndicator.style.display = 'none';
    }


}

