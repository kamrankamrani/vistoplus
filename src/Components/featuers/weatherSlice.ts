import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface weatherSliceType {
  city: string;
  lat: string;
  lon: string;
}

const initialState: weatherSliceType = {
  city: "Tehran",
  lat: "35.6892523",
  lon: "51.3896004",
};

const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState,
  reducers: {
    setCurrentLocation(state, action: PayloadAction<weatherSliceType>) {
      state.city = action.payload.city;
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export default weatherSlice.reducer;
export const { setCurrentLocation } = weatherSlice.actions;
