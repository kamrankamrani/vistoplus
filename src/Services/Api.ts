import axios from "axios";
import { UselessFactBaseUrl } from "../Info/Config";

export const UselessApi = axios.create({
    baseURL: UselessFactBaseUrl
});