import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentWeatherCustomizedResponse,
  DailyForecastCustomizedResponse,
  DailyForeCastResponse,
} from "../../Services/Types";

interface weatherSliceType {
  city: string;
  lat: string;
  lon: string;
  currentWeather?: CurrentWeatherCustomizedResponse;
  dailyForecast?: DailyForecastCustomizedResponse[];
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
    setCurrentWeather(
      state,
      action: PayloadAction<CurrentWeatherCustomizedResponse>
    ) {
      state.currentWeather = {
        ...state.currentWeather,
        temp: action.payload.temp,
        humidity: action.payload.humidity,
        wind: {
          speed: action.payload.wind.speed,
          deg: action.payload.wind.deg,
        },
      };
    },
    setDailyForecastWeather(
      state,
      action: PayloadAction<DailyForecastCustomizedResponse[]>
    ) {
      state.dailyForecast = action.payload.map((val) => {
        const data_ = {
          ...val,
          temp: val.temp,
          temp_max: val.temp_max,
          temp_min: val.temp_min,
          humidity: val.humidity,
          wind: {
            speed: val.wind.speed,
            deg: val.wind.deg,
          },
        };
        return data_;
      });
    },
  },
});

export default weatherSlice.reducer;
export const {
  setCurrentLocation,
  setCurrentWeather,
  setDailyForecastWeather,
} = weatherSlice.actions;
