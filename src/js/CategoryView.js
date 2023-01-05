import Storage from "./Storage.js";
// get category values from DOM
const title = document.querySelector("#category-title");
const description = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

class CategoryView {
  constructor() {
    this.categories = [];
    // variables
    this.title = title;
    this.description = description;
    // event listeners
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
  }

  addNewCategory(e) {
    e.preventDefault();
    // set values
    const title = this.title.value;
    const description = this.description.value;

    if (!title || !desc) return;
    // save to storage
    Storage.saveCategory({ title, description });
    // fill categories
    this.categories = Storage.getAllCategories();
    // update DOM : update the select option
  }
}

export default new CategoryView();
