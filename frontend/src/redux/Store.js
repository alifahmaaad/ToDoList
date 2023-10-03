import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../redux/TokenSlice";

export default configureStore({
  reducer: {
    tokenReducer: tokenReducer,
  },
});
