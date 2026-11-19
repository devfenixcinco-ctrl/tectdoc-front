import { api } from './api'
import { clientId } from './config'

export { api }

// Respuestas ya pedidas en esta visita: al volver a una página o repetir una consulta
// (p. ej. marcas o grupos) no se vuelve a llamar al servidor. Si la consulta falla se
// descarta para poder reintentarla.
const cache = new Map()

// Envía al proxy el mismo cuerpo que espera TecDoc, p. ej. { getArticles: { ... } }
export function tecdoc(payload) {
  const key = JSON.stringify(payload)

  if (!cache.has(key)) {
    const request = api.post(`/tecdoc/${clientId()}`, payload)
    request.catch(() => cache.delete(key))
    cache.set(key, request)
  }

  return cache.get(key)
}
