import axios from 'axios'

// Backend propio: guarda la clave de TecDoc y hace las llamadas al webservice
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const client = import.meta.env.VITE_TECDOC_CLIENT

// Envía al proxy el mismo cuerpo que espera TecDoc, p. ej. { getArticles: { ... } }
export function tecdoc(payload) {
  return api.post(`/tecdoc/${client}`, payload)
}
