import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import vuetify from './plugins/vuetify'

import es from './locales/es.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'es',
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