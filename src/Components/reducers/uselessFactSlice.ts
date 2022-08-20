import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface persianFactType {
  value: string;
}

const initialState: persianFactType = {
  value: "",
};

const persianFact = createSlice({
  name: "persianFact",
  initialState,
  reducers: {
    setPersianValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setPersianValue } = persianFact.actions;
export default persianFact.reducer;
