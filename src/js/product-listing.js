import  ExternalServices  from "./ExternalServices.mjs";
import  ProductList  from "./ProductList.mjs";
import { loadHeaderFooter, getParm } from "./utils.mjs";
loadHeaderFooter();

const categoryCode = getParm("category");

const dataSource = new ExternalServices();
 const element = document.querySelector(".product-list");
 const productList = new ProductList(categoryCode, dataSource, element);

 productList.init();


