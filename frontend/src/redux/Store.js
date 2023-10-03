import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../redux/TokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
export const store = configureStore({
  reducer: {
    tokenReducer: persistedTokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
