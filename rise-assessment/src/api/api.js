import axios from "axios";
import { apiUrl } from "./env";

export async function getData(path) {
  return await axios
    .get(`${apiUrl + path}`)
    .then((res) => res)
    .catch((err) => {
      return { errorMessage: err.response.data.message };
    });
}
