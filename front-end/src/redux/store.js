import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { categoryReducer } from "./reducers/category";
import { productReducer } from "./reducers/product";
import { suppilerReducer } from "./reducers/suppiler";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";

const Store = configureStore({
  reducer: {
    user: userReducer,
    categoriesData: categoryReducer,
    productData: productReducer,
    suppilerData: suppilerReducer,
    eventData: eventReducer,
    cart: cartReducer,
  },
});

export default Store;
