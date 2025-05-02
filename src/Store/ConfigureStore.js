import { configureStore } from "@reduxjs/toolkit";
import  CategorySlice from "../Classified/CategorySlice";
import ProductSlice from "../Classified/ProductSlice";
import UserSlice from "../Classified/UserSlice";
const store = configureStore({
  reducer: {
    categories:CategorySlice,
    user:UserSlice,
    products:ProductSlice
  },
});
export default store;
