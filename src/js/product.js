import { loadHeaderFooter, getParm } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";


loadHeaderFooter();
const dataSource = new ExternalServices("tents");
const productId = getParm("product");
const product = new ProductDetails(productId, dataSource);

product.init();


