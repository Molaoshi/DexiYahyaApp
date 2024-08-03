import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { tokenSlice } from "./slice/tokenSLice";
import { blockchainSlice } from "./slice/blockchainSlice";
import { routeSlice } from "./slice/routeSlice";
import { settingsSlice } from "./slice/settingsSlice";
import { swapSlice } from "./slice/swapSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["routes", "swap"],
};

const rootReducer = combineReducers({
  tokens: tokenSlice.reducer,
  blockchains: blockchainSlice.reducer,
  routes: routeSlice.reducer,
  settings: settingsSlice.reducer,
  swap: swapSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
