import { api } from './api'
import { clientId } from './config'

export { api }

// Envía al proxy el mismo cuerpo que espera TecDoc, p. ej. { getArticles: { ... } }
export function tecdoc(payload) {
  return api.post(`/tecdoc/${clientId()}`, payload)
}
