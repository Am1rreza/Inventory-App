import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
// DOM in first load
document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();
  // create categories option
  CategoryView.createCategoriesList();
  // create products list
});
