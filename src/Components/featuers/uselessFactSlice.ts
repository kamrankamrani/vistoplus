import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface persianFactType {
  persianValue: string;
  englishFact: string;
}

const initialState: persianFactType = {
  persianValue: "",
  englishFact: "",
};

const uselessFact = createSlice({
  name: "uselessFact",
  initialState,
  reducers: {
    setPersianValue(state, action: PayloadAction<string>) {
      state.persianValue = action.payload;
    },
    setEnglishFact(state, action: PayloadAction<string>) {
      state.englishFact = action.payload;
    },
  },
});

export const { setPersianValue, setEnglishFact } = uselessFact.actions;
export default uselessFact.reducer;
