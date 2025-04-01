import  ProductData  from "./ProductData.mjs";
import  ProductList  from "./ProductList.mjs";
import { loadHeaderFooter, getParm } from "./utils.mjs";
import { Alert } from "./Alert.js";

const categoryCode = getParm("category");
 const dataSource = new ProductData(categoryCode);
 const element = document.querySelector(".product-list");
 const productList = new ProductList(categoryCode, dataSource, element);
 loadHeaderFooter();
 productList.init();

 Alert.displayAlerts;
