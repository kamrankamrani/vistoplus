import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCurrentWeatherBaseUrl, OpenWeatherApiKey } from "../Info/Config";
import {
  CurrentWeatherCustomizeResponse,
  CurrentWeatherResponse,
} from "./Types";

interface fetchArgType {
  lat: string;
  lon: string;
}

export const currentWeatherApi = createApi({
  reducerPath: "currentWeatherApi",
  keepUnusedDataFor: 300,
  baseQuery: fetchBaseQuery({ baseUrl: getCurrentWeatherBaseUrl }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      CurrentWeatherCustomizeResponse,
      fetchArgType
    >({
      query: ({ lat, lon }) =>
        `weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherApiKey}&units=metric`,
      transformResponse: (
        response: CurrentWeatherResponse
      ): CurrentWeatherCustomizeResponse => {
        const formedRes: CurrentWeatherCustomizeResponse = {
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
  }),
});

export const { useGetCurrentWeatherQuery } = currentWeatherApi;
