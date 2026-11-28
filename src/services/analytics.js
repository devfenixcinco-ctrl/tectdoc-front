import { hasConsent } from './cookieConsent'

// Envía un evento a GTM (dataLayer) solo si el usuario aceptó la analítica: sin
// consentimiento no se registra nada (LGPD-01). Los nombres siguen los eventos
// recomendados de GA4 cuando existen (page_view, generate_lead, view_item, ...).
export function trackEvent(event, params = {}) {
  if (!hasConsent('analytics_storage')) {
    return false
  }

  // GA4 recomienda limpiar el objeto ecommerce anterior antes de enviar uno nuevo
  if ('ecommerce' in params) {
    window.dataLayer.push({ ecommerce: null })
  }

  window.dataLayer.push({ event, ...params })
  return true
}
