import { configureStore } from "@reduxjs/toolkit";
import { translateToPersianApi } from "../Services/translateToPersianApi";
import { uselessFactApi } from "../Services/uselessFactApiQuery";
import darkModeSlice from "./featuers/darkModeSlice";
import uselessFactReducer from "./featuers/uselessFactSlice";

const store = configureStore({
  reducer: {
    uselessFact: uselessFactReducer,
    darkMode: darkModeSlice,

    [uselessFactApi.reducerPath]: uselessFactApi.reducer,
    [translateToPersianApi.reducerPath]: translateToPersianApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      uselessFactApi.middleware,
      translateToPersianApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
