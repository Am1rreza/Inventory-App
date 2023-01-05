import Storage from "./Storage.js";
// get variables from DOM
const addNewProductBtn = document.querySelector("#add-new-product");
const title = document.getElementById("product-title");
const quantity = document.getElementById("product-quantity");
const category = document.getElementById("product-category");

class ProductView {
  constructor() {
    this.products = [];
    // variables
    this.title = title;
    this.quantity = quantity;
    this.category = category;
    // event listeners
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
  }

  addNewProduct(e) {
    e.preventDefault();
    // set values
    const title = this.title.value;
    const quantity = this.quantity.value;
    const category = this.category.value;

    if (!title || !quantity || !category) {
      alert("Please fill out all of the inputs");
      return;
    }
    // save to storage
    Storage.saveProduct({ title, category, quantity });
    // fill the products
    this.setApp();
    // update DOM : update product list
    
    // clear inputs
    this.category = "";
    this.title = "";
    this.quantity = "";
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }
}

export default new ProductView();
