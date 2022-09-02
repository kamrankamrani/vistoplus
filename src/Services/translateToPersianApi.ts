import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TranslateResponse } from "./Types";

export const translateToPersianApi = createApi({
  reducerPath: "translateToPersianApi",
  keepUnusedDataFor: 3, //three seconds
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mymemory.translated.net",
  }),
  endpoints: (builder) => ({
    getTranslatedData: builder.query<TranslateResponse, string>({
      query: (data) => `get?q=${data}&langpair=en|fa`,
      transformResponse: (
        translatedData: TranslateResponse
      ): TranslateResponse => {
        if (
          translatedData.responseData &&
          translatedData.responseData.translatedText.length
        ) {
          translatedData.isTranslated = true;
          return translatedData;
        }
        translatedData.isTranslated = false;
        translatedData.responseData.translatedText = "ترجمه در دسترس نیست!";
        return translatedData;
      },
    }),
  }),
});

export const { useGetTranslatedDataQuery } = translateToPersianApi;
