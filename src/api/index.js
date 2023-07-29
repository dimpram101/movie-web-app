import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
    'accept': 'application/json'
  }
})

export default api;