import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityMenuProps } from "../../Services/Types";

const initialState: CityMenuProps = {
  openCityMenu: false,
  anchorForCityMenu: null,
};

const cityMenuSlice = createSlice({
  name: "cityMenuSlice",
  initialState,
  reducers: {
    setOpenCityMenu(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.openCityMenu = true;
      } else {
        state.openCityMenu = false;
      }
    },
    setOpenCityAnchor(state, action: PayloadAction<string | null>) {
      state.anchorForCityMenu = action.payload;
    },
  },
});

export default cityMenuSlice.reducer;
export const { setOpenCityMenu, setOpenCityAnchor } = cityMenuSlice.actions;
