import axios from 'axios'

// Backend propio (tecdoc-back)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
