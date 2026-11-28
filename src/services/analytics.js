import { hasMeasurementConsent } from './cookieConsent'

// Envía un evento a GTM (dataLayer) solo si el usuario aceptó la analítica o la
// publicidad: sin consentimiento no se registra nada (LGPD-01). Dentro de GTM cada
// etiqueta exige además su propio consentimiento (GA4 y Clarity: analítica; Meta,
// LinkedIn y Google Ads: publicidad). Los nombres siguen los eventos recomendados
// de GA4 cuando existen (page_view, generate_lead, view_item, ...).
export function trackEvent(event, params = {}) {
  if (!hasMeasurementConsent()) {
    return false
  }

  // GA4 recomienda limpiar el objeto ecommerce anterior antes de enviar uno nuevo
  if ('ecommerce' in params) {
    window.dataLayer.push({ ecommerce: null })
  }

  window.dataLayer.push({ event, ...params })
  return true
}

// IDs de medición del cliente (ANA-02 a ANA-04). Quedan en el dataLayer antes de
// que cargue GTM para que un mismo contenedor sirva a todos los clientes: cada
// etiqueta lee su ID de la variable correspondiente y no se ejecuta si está vacía.
export function setupMeasurement(config) {
  const ids = config.analytics || {}

  window.dataLayer.push({
    site_client: config.id || null,
    analytics: {
      ga4_id: ids.ga4_id || '',
      google_ads_id: ids.google_ads_id || '',
      google_ads_lead_label: ids.google_ads_lead_label || '',
      meta_pixel_id: ids.meta_pixel_id || '',
      linkedin_partner_id: ids.linkedin_partner_id || '',
      clarity_id: ids.clarity_id || '',
    },
  })
}
