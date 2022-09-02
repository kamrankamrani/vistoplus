import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface darkModeType {
  value: string;
}

const initialState: darkModeType = {
  value: "light",
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export default darkModeSlice.reducer;
export const { setDarkMode } = darkModeSlice.actions;
