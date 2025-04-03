import  ProductData  from "./ProductData.mjs";
import  ProductList  from "./ProductList.mjs";
import { loadHeaderFooter, getParm } from "./utils.mjs";
loadHeaderFooter();

const categoryCode = getParm("category");
//const dataSource = new ProductData(categoryCode);
const dataSource = new ProductData();
 const element = document.querySelector(".product-list");
 const productList = new ProductList(categoryCode, dataSource, element);

 productList.init();


