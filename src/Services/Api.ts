import axios from "axios";
import { TranslateBaseUrl, UselessFactBaseUrl } from "../Info/Config";

export const UselessApi = axios.create({
    baseURL: UselessFactBaseUrl
});

export const TranslateApi = axios.create({
    baseURL: TranslateBaseUrl
});