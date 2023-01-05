import Storage from "./Storage.js";
// get category values from DOM
const title = document.querySelector("#category-title");
const description = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const categoryWrapper = document.getElementById("category-wrapper");
const cancelAddCategoryBtn = document.getElementById("cancel-add-category");

class CategoryView {
  constructor() {
    this.categories = [];
    // variables
    this.title = title;
    this.description = description;
    // event listeners
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategoryBtn.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
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
    // add category toggle button
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
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

  toggleAddCategory(e) {
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
    // clear inputs
    this.title.value = "";
    this.description.value = "";
  }
}

export default new CategoryView();
