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
