import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import productDetails from "./slices/ProductDetailsSlice";
import categoriesReducer from "./slices/CategoriesSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetails,
    categories: categoriesReducer,
  },
});

export default store;
