// src/api.js
import axios from "axios";
import { auth } from "./firebase";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach Firebase token
API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TEXT summarize (JSON)
export const summarizeText = (text) => {
  return API.post("/summarize", {
    text,
    max_length: 180,
    min_length: 80,
  });
};

// PDF summarize (multipart)
export const summarizePdf = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/pdf/summarize", formData);
};

export default API;
