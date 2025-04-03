import { renderListWithTemplate } from "./utils.mjs";
 
 function productCardTemplate(product) {
   return `
     <li class="product-card">
       <a href="/product_pages/?product=${product.Id}">
         <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
         <h2>${product.Brand.Name}</h2>
         <h3>${product.Name}</h3>
         <p class="product-card__price">$${product.FinalPrice}</p>
       </a>
     </li>
     `;
 }
 
 export default class ProductList {
   constructor(category, dataSource, listElement) {
     this.category = category;
     this.dataSource = dataSource;
     this.listElement = listElement;
   }
 
   async init() {
     //const list = await this.dataSource.getData();
     const list = await this.dataSource.getData(this.category);
     this.renderList(list);
    document.getElementById("title").textContent = `Top Products: ${this.category.toUpperCase()}`;
   }
 
   renderList(list) {
     renderListWithTemplate(productCardTemplate, this.listElement, list);
   }
 
 }