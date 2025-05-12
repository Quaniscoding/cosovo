import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import productDetails from "./slices/ProductDetailsSlice";
import categoriesReducer from "./slices/CategoriesSlice";
import ordersReducer from "./slices/OrdersSlice";
import revenueReducer from "./slices/RevenueSlice";
import variantDetailsSlice from "./slices/VariantDetailsSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetails,
    categories: categoriesReducer,
    orders: ordersReducer,
    revenues: revenueReducer,
    variantDetails: variantDetailsSlice,
  },
});

export default store;
