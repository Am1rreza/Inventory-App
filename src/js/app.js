import CategoryView from "./CategoryView.js";
// DOM in first load
document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  //create categories option
  CategoryView.createCategoriesList();
});
