import axios from 'axios';

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://https://global-vybz-z9t6.onrender.com/api"; // <-- change this to your real backend domain

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
