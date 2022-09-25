import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCurrentWeatherBaseUrl, OpenWeatherApiKey } from "../Info/Config";
import {
  CurrentWeatherCustomizedResponse,
  CurrentWeatherResponse,
  DailyForecastCustomizedResponse,
  DailyForeCastResponse,
  GeoCodingResponse,
} from "./Types";

interface fetchArgTypeDailyAndCurrent {
  lat: string;
  lon: string;
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  keepUnusedDataFor: 600,
  baseQuery: fetchBaseQuery({ baseUrl: getCurrentWeatherBaseUrl }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      CurrentWeatherCustomizedResponse,
      fetchArgTypeDailyAndCurrent
    >({
      query: ({ lat, lon }) =>
        `weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherApiKey}&units=metric`,
      transformResponse: (
        response: CurrentWeatherResponse
      ): CurrentWeatherCustomizedResponse => {
        const formedRes: CurrentWeatherCustomizedResponse = {
          temp: response.main.temp,
          humidity: response.main.humidity,
          wind: {
            speed: response.wind.speed,
            deg: response.wind.deg,
          },
        };
        return formedRes;
      },
    }),
    getDailyForecast: builder.query<
      DailyForecastCustomizedResponse[],
      fetchArgTypeDailyAndCurrent
    >({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${OpenWeatherApiKey}&units=metric`,
      transformResponse: (response: DailyForeCastResponse) => {
        const formedRes: DailyForecastCustomizedResponse[] = response.list.map(
          (value) => {
            const rawData: DailyForecastCustomizedResponse = {
              temp: value.main.temp,
              humidity: value.main.humidity,
              temp_min: value.main.temp_min,
              temp_max: value.main.temp_max,
              wind: {
                speed: value.wind.speed,
                deg: value.wind.deg,
              },
            };
            return rawData;
          }
        );
        return formedRes;
      },
    }),
    getGeoCode: builder.query<GeoCodingResponse, string>({
      query: (city) =>
        `geo/1.0/direct?q=${city}&limit=1&appid=${OpenWeatherApiKey}`,
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetDailyForecastQuery,
  useGetGeoCodeQuery,
} = weatherApi;
