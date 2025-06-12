import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/authSlice.js";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "user"], 
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
// persistor.purge();
export default store;
