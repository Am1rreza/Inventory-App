import Storage from "./Storage.js";
// get variables from DOM
const addNewProductBtn = document.querySelector("#add-new-product");
const title = document.getElementById("product-title");
const quantity = document.getElementById("product-quantity");
const category = document.getElementById("product-category");
const searchInput = document.getElementById("search-input");
const selectedSort = document.getElementById("sort-products");
const totalQuantity = document.getElementById("total-quantity");

class ProductView {
  constructor() {
    this.products = [];
    // variables
    this.title = title;
    this.quantity = quantity;
    this.category = category;
    // event listeners
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
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
    this.createProductsList(this.products);
    // clear inputs
    this.category.value = "";
    this.title.value = "";
    this.quantity.value = "";
    // update total quantity
    this.showTotalQuantity();
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductsList(products) {
    let result = ``;
    // add products
    products.forEach((product) => {
      // find the selected category title
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == product.category
      );
      const categoryTitle = selectedCategory.title;

      result += `<div class="flex items-center justify-between mb-4">
        <span class="text-slate-400">${product.title}</span>
        <div class="flex items-center gap-x-3">
          <span class="text-slate-400">${new Date(
            product.createdAt
          ).toLocaleDateString("fa-IR")}</span>
          <span
            class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-xl"
            >${categoryTitle}</span
          >
          <span
            class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-300"
            >${product.quantity}</span
          >
          <button
            data-id=${product.id}
            class="delete-product border px-3 py-0.5 rounded-xl border-red-400 text-red-400 text-sm"
          >
            delete
          </button>
        </div>
      </div>`;
    });
    // attach to DOM
    const productsDOM = document.querySelector(".products-list");
    productsDOM.innerHTML = result;
    // get all of the buttons
    const deleteBtns = [...document.querySelectorAll(".delete-product")];

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    console.log(value);
    // filter the value on products
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );

    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;

    this.products = Storage.getAllProducts(value);

    this.createProductsList(this.products);
  }

  deleteProduct(e) {
    const id = e.target.dataset.id;

    Storage.deleteProduct(id);

    this.setApp();

    this.createProductsList(this.products);
    // update total quantity
    this.showTotalQuantity();
  }

  showTotalQuantity() {
    const products = Storage.getAllProducts();
    const productsQuantities = products.map((p) => parseFloat(p.quantity));
    const total = productsQuantities.reduce((acc, curr) => acc + curr, 0);
    totalQuantity.innerText = total;
  }
}

export default new ProductView();
