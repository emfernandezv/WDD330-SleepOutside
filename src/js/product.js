import { setLocalStorage, getLocalStorage, getParm } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");
const productId = getParm("product");
const product = new ProductDetails(productId, dataSource);

product.init();


