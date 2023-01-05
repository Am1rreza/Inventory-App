import { data } from "autoprefixer";

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of app",
    createdAt: "2023-01-05T08:23:36.397Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backend of app",
    createdAt: "2023-01-05T08:23:52.736Z",
  },
];

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
}
