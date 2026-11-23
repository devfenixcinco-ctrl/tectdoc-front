// Origen de la visita para el formulario de contacto (CRM-01): parámetros UTM y página
// de entrada. Se guardan al llegar al sitio y se mantienen durante la sesión, aunque
// el usuario navegue a otras páginas antes de escribirnos.

const KEY = 'fenix_attribution'
const UTM = ['utm_source', 'utm_medium', 'utm_campaign']

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const utm = Object.fromEntries(UTM.map((name) => [name, params.get(name)]).filter(([, value]) => value))
  const saved = getAttribution()

  // Una visita nueva con UTM (otra campaña) reemplaza la anterior
  if (!saved.landing_page || Object.keys(utm).length > 0) {
    sessionStorage.setItem(KEY, JSON.stringify({ landing_page: window.location.href, ...utm }))
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}
