import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UselessFactBaseUrl } from "../Info/Config";
import { UselessFactResponse } from "./Types";

export const uselessFactApi = createApi({
  reducerPath: "uselessFactApi",
  keepUnusedDataFor: 3,
  baseQuery: fetchBaseQuery({ baseUrl: UselessFactBaseUrl }),
  endpoints: (builder) => ({
    getRandomFact: builder.query<string, void>({
      query: () => "",
      transformResponse: (response: UselessFactResponse) => response.text,
    }),
  }),
});

export const { useGetRandomFactQuery } = uselessFactApi;
