import axios from "axios";
import { APP_ALL_TEXTS_ENDPOINT } from "../constants";

export const AppDataTextService = {
  getAllTexts: async () => {
    let response = await axios.get(`${APP_ALL_TEXTS_ENDPOINT}`);
    return response.data;
  },
};
