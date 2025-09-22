import { API_BASE_URL } from "@/config";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
