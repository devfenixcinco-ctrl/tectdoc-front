// Banner de cookies con un CMP de terceros (CookieYes, Cookiebot o Usercentrics).
// Cada cliente configura su proveedor e ID en el backend; los textos y las opciones
// Aceptar / Rechazar / Personalizar se administran en el panel del CMP.

const providers = {
  cookieyes: {
    script: (id) => ({ id: 'cookieyes', src: `https://cdn-cookieyes.com/client_data/${id}/script.js` }),
    // CookieYes también reabre el banner con los elementos que tienen la clase
    // "cky-banner-element" (la lleva el botón del pie de página)
    openSettings: () => window.revisitCkyConsent?.(),
  },
  cookiebot: {
    script: (id) => ({ id: 'Cookiebot', src: 'https://consent.cookiebot.com/uc.js', data: { cbid: id } }),
    openSettings: () => window.Cookiebot?.renew(),
  },
  usercentrics: {
    script: (id) => ({ id: 'usercentrics-cmp', src: 'https://web.cmp.usercentrics.eu/ui/loader.js', data: { settingsId: id } }),
    openSettings: () => (window.__ucCmp ?? window.UC_UI)?.showSecondLayer(),
  },
}

let active = null

// ---- Google Consent Mode v2 (modo básico) ----
// Por defecto todo lo que no es estrictamente necesario está denegado. El CMP envía
// gtag('consent', 'update', ...) cuando el usuario decide, y GTM solo se carga si
// acepta analítica o publicidad: antes del consentimiento no se ejecuta ninguna etiqueta.

window.dataLayer = window.dataLayer || []

function gtag() {
  window.dataLayer.push(arguments)
}

// Debe llamarse antes de loadConsentManager(): el valor por defecto va antes que el CMP
export function setupConsentMode(gtmId) {
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 2000
  })
  gtag('set', 'ads_data_redaction', true)
  gtag('set', 'url_passthrough', true)

  if (gtmId) {
    loadGtmAfterConsent(gtmId)
  }
}

const grantsTracking = (entry) =>
  entry?.[0] === 'consent' &&
  entry[1] === 'update' &&
  (entry[2]?.analytics_storage === 'granted' || entry[2]?.ad_storage === 'granted')

function loadGtmAfterConsent(gtmId) {
  let loaded = false

  const loadGtm = () => {
    if (loaded) return
    loaded = true

    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
    document.head.appendChild(script)
  }

  // Observa las señales que el CMP envía al dataLayer (también al volver al sitio
  // con una decisión guardada, porque el CMP la reenvía al cargar)
  const push = window.dataLayer.push
  window.dataLayer.push = function (...entries) {
    const result = push.apply(window.dataLayer, entries)
    if (entries.some(grantsTracking)) loadGtm()
    return result
  }
}

// ---- CMP ----

export function loadConsentManager(consent) {
  const provider = providers[consent?.provider]

  if (!provider || !consent.id) {
    return
  }

  const { id, src, data = {} } = provider.script(consent.id)
  const script = document.createElement('script')
  script.id = id
  script.src = src
  script.async = true
  Object.assign(script.dataset, data)
  document.head.appendChild(script)

  active = provider
}

// Abre de nuevo las preferencias para cambiar o retirar el consentimiento
export function openConsentSettings() {
  active?.openSettings()
}

export function hasConsentManager() {
  return active !== null
}
