import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "../redux/TokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedIsLoginReducer = persistReducer(persistConfig, isLoginReducer);
export const store = configureStore({
  reducer: {
    isLoginReducer: persistedIsLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
