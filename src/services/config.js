import { reactive } from 'vue'
import { api } from './api'

// Configuración pública del cliente (país, idioma, GTM, WhatsApp, pie de página, HubSpot)
export const clientConfig = reactive({})

export function clientId() {
  return clientConfig.id || import.meta.env.VITE_TECDOC_CLIENT
}

// Usa la configuración que el backend inserta en el HTML; si no está
// (servidor de desarrollo de Vite) la pide a /api/config/{client}
export async function loadClientConfig() {
  let config = window.__CLIENT_CONFIG__

  if (!config) {
    try {
      const response = await api.get(`/config/${clientId()}`)
      config = response.data
    } catch (error) {
      console.log(error)
      config = {}
    }
  }

  Object.assign(clientConfig, config)

  // País inicial del cliente; el usuario puede cambiarlo desde la cabecera
  if (!localStorage.getItem('country') && clientConfig.country) {
    localStorage.setItem('country', clientConfig.country)
  }

  return clientConfig
}
