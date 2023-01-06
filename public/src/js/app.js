import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
// DOM in first load
document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();
  // show total quantity
  ProductView.showTotalQuantity();
  // create categories option
  CategoryView.createCategoriesList();
  // create products list
  ProductView.createProductsList(ProductView.products);
});
