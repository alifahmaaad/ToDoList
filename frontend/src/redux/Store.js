import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "../redux/TokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage: storage,
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
