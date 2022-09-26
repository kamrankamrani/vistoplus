import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherStatusCode } from "../../Info/Config";
import {
  CurrentWeatherCustomizedResponse,
  DailyForecastCustomizedResponse,
} from "../../Services/Types";

interface weatherSliceType {
  city: string;
  lat: string;
  lon: string;
  currentWeather?: CurrentWeatherCustomizedResponse;
  dailyForecast?: DailyForecastCustomizedResponse[];
  weatherCondition: string | null;
  weatherConditionClass: string;
}

const initialState: weatherSliceType = {
  city: "Tehran",
  lat: "35.6892523",
  lon: "51.3896004",
  weatherCondition: "",
  weatherConditionClass: "",
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
        weatherStatus: action.payload.weatherStatus,
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
    changeWeatherConditionClass(state, action: PayloadAction<string>) {
      let isDay = true;
      const date_ = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Tehran",
      });
      if (new Date(date_).getHours() >= 18) {
        isDay = false;
      }
      if (action.payload.indexOf("sun") >= 0) {
        state.weatherConditionClass = "sunny-background";
        state.weatherCondition = WeatherStatusCode.sunny;
      } else if (action.payload.indexOf("snow") >= 0) {
        state.weatherConditionClass = "snow-background";
        state.weatherCondition = WeatherStatusCode.snow;
      } else if (action.payload.indexOf("clear") >= 0) {
        if (!isDay) {
          state.weatherConditionClass = "clear-background";
          state.weatherCondition = WeatherStatusCode.clear;
        } else {
          state.weatherConditionClass = "sunny-background";
          state.weatherCondition = WeatherStatusCode.sunny;
        }
      } else if (action.payload.indexOf("cloud") >= 0) {
        state.weatherConditionClass = "cloudy-background";
        state.weatherCondition = WeatherStatusCode.cloud;
      } else if (
        action.payload.indexOf("rain") >= 0 ||
        action.payload.indexOf("extrem") >= 0
      ) {
        state.weatherConditionClass = "rainy-background";
        state.weatherCondition = WeatherStatusCode.rain;
      }
    },
  },
});

export default weatherSlice.reducer;
export const {
  setCurrentLocation,
  setCurrentWeather,
  setDailyForecastWeather,
  changeWeatherConditionClass,
} = weatherSlice.actions;
