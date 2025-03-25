import { setLocalStorage, getLocalStorage, getParm, updateCartIcon } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

updateCartIcon();
const dataSource = new ProductData("tents");
const productId = getParm("product");
const product = new ProductDetails(productId, dataSource);
product.init();

