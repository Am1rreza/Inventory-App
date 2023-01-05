export default class Storage {
  static getAllCategories() {
    // get categories from localStorage
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    // desending sort on categories
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return sortedCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = this.getAllCategories();
    // find the category in savedCategories
    const existedItem = savedCategories.find((c) => c.id == categoryToSave.id);

    if (existedItem) {
      // update the title & desc with new values
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // set new date and id
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      // push the category to the original array
      savedCategories.push(categoryToSave);
    }
    // save the category to storage
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }

  static getAllProducts(sort = "newest") {
    // get products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // desending sort on products
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });

    return sortedProducts;
  }

  static saveProduct(productToSave) {
    const savedProducts = this.getAllProducts();
    // find the product in savedProducts
    const existedItem = savedProducts.find((p) => p.id == productToSave.id);

    if (existedItem) {
      // update the title, quantity & category with the new values
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      // set new date and id
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      // push the product to the original array
      savedProducts.push(productToSave);
    }
    // save the products to storage
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const products = this.getAllProducts();

    const filteredProducts = products.filter((p) => {
      return p.id != id;
    });

    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
