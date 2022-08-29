import { configureStore } from "@reduxjs/toolkit";
import uselessFactReducer from "./featuers/uselessFactSlice";
// import uselessFactReducer from "./reducers/uselessFactSlice";

const store = configureStore({
  reducer: {
    uselessFact: uselessFactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
