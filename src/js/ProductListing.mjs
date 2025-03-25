import fetch from 'node-fetch';

async function populateProducts() {
    const response = await fetch('/src/public/tents.json');
    const products = await response.json();

    const productContainer = document.getElementById('products');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const productName = document.createElement('h2');
        productName.textContent = product.name;
        productElement.appendChild(productName);

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productElement.appendChild(productImage);

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;
        productElement.appendChild(productDescription);

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;
        productElement.appendChild(productPrice);

        productContainer.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', populateProducts);