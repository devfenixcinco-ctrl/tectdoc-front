import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadClientConfig } from './services/config'
import { loadConsentManager, setupConsentMode } from './services/cookieConsent'
import { captureAttribution } from './services/attribution'

import es from './locales/es.json'
import en from './locales/en.json'

const config = await loadClientConfig()

captureAttribution()
setupConsentMode(config.gtm_id)
loadConsentManager(config.consent)

const i18n = createI18n({
  legacy: false,
  locale: config.lang || 'es',
  fallbackLocale: 'en',
  messages: {
    es,
    en
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .use(i18n)
  .mount('#app')

// Quita la pantalla de carga de index.html
document.getElementById('app-loader')?.remove()
