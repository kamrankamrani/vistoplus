import { configureStore } from "@reduxjs/toolkit";
import persianFactReducer from "./reducers/uselessFactSlice";
// import uselessFactReducer from "./reducers/uselessFactSlice";

const store = configureStore({
  reducer: {
    persianFact: persianFactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
