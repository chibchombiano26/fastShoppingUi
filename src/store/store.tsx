import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from "@reduxjs/toolkit";

import ProductSlice from "./slice/products";
import UserSlice from "./slice/users";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  products: ProductSlice.reducer,
  users: UserSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export const persistor = persistStore(store);
export default store;
