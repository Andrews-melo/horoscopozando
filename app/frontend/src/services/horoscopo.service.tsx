import axios from "axios";
import { API_URL } from "../utils/constants.api";

const config = {
  headers:{
    "Content-Type": "application/json"
  }
};

export function getMessage(date: string): Promise<object> {
  const path = "message";
  
  return axios.get(`${API_URL}/${path}?birthday=${date}`, config);
  
}
