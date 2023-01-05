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

    if (!title || !description) {
      alert("Please fill out the both inputs");
      return;
    }
    // save to storage
    Storage.saveCategory({ title, description });
    // fill categories
    this.setApp();
    // update DOM : update the select option
    this.createCategoriesList();
    // clear Inputs
    this.title.value = "";
    this.description.value = "";
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  createCategoriesList() {
    // set default category
    let result = `<option class="bg-slate-500 text-slate-300" value="">
    Select a Category
  </option>`;

    // add the others categories
    this.categories.forEach((category) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${category.id}>
    ${category.title}
  </option>`;
    });

    // attach the categoris to DOM
    const categoriesDOM = document.getElementById("product-category");
    categoriesDOM.innerHTML = result;
  }
}

export default new CategoryView();
