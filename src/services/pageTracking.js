import { nextTick } from 'vue'
import { trackEvent } from './analytics'
import { onMeasurementConsent } from './cookieConsent'
import { clientConfig } from './config'

// Medición de una SPA (ANA-01): el sitio no recarga la página al navegar, así que
// cada cambio de ruta actualiza el título y envía un evento page_view a GTM.
// La medición mejorada de GA4 por "cambios en el historial" debe estar desactivada
// para no contar dos veces (ver docs/analitica.md del backend).

// Las páginas cuyo título depende de datos que se cargan después (producto,
// políticas, páginas por público) lo definen con setPageTitle(); si no llega en
// este tiempo, el page_view se envía con el título que haya.
const TITLE_WAIT_MS = 3000

// Porcentaje de la página que cuenta como lectura (evento scroll)
const SCROLL_DEPTH = 0.75

let current = null
let previousUrl = document.referrer || undefined

const site = () => clientConfig.name || 'Fenix'

// Mismo formato que el título que genera el backend en la primera carga (SeoResolver)
function routeTitle(route, t) {
  const p = route.params

  switch (route.name) {
    case 'home':
      return `${site()} | ${t('page_titles.home')}`
    case 'catalogo':
      return t('page_titles.brands')
    case 'catalogo-model':
      return t('page_titles.models', { brand: p.brand })
    case 'vehicles':
      return t('page_titles.vehicles', { vehicle: `${p.brand} ${p.model}` })
    case 'vehicles-articles':
    case 'vehicles-articles-query':
      return t('page_titles.articles', { vehicle: `${p.brand} ${p.model} ${p.car}` })
    case 'products':
    case 'products-group':
      return t('page_titles.search', { search: p.search })
    case 'products-group-page':
      return t('page_titles.search', { search: p.text })
    case 'contact':
      return t('page_titles.contact')
    case 'thanks':
      return t('page_titles.thanks')
    default:
      return null
  }
}

function withSite(title) {
  return title.startsWith(`${site()} |`) ? title : `${title} | ${site()}`
}

function sendPageView(view) {
  if (view !== current || !view.ready || view.sent) {
    return
  }

  view.sent = trackEvent('page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    page_referrer: view.referrer,
    page_type: view.name,
  })
}

function markReady(view) {
  if (view.ready) {
    return
  }

  view.ready = true
  sendPageView(view)
}

// Título de las páginas que lo cargan después. "path" es la ruta de la vista que
// lo pide: si el usuario ya navegó a otra página, se ignora.
export function setPageTitle(title, path) {
  if (!current || current.path !== path) {
    return
  }

  document.title = withSite(title)
  markReady(current)
}

function onScroll() {
  const view = current

  if (!view || view.scrolled) {
    return
  }

  const height = document.documentElement.scrollHeight
  const reached = (window.scrollY + window.innerHeight) / height

  if (reached >= SCROLL_DEPTH) {
    // Solo se marca si se envió (sin consentimiento se intenta en el siguiente scroll)
    view.scrolled = trackEvent('scroll', { percent_scrolled: SCROLL_DEPTH * 100, page_type: view.name })
  }
}

export function setupPageTracking(router, i18n) {
  const t = i18n.global.t

  router.afterEach((to, from, failure) => {
    if (failure) {
      return
    }

    const view = {
      path: to.fullPath,
      name: to.name || 'otra',
      referrer: previousUrl,
      ready: false,
      sent: false,
      scrolled: false,
    }
    current = view
    previousUrl = new URL(to.fullPath, window.location.origin).href

    if (to.meta.asyncTitle) {
      // Mientras carga se muestra el nombre del sitio y no el título de la página anterior
      document.title = site()
      setTimeout(() => markReady(view), TITLE_WAIT_MS)
      return
    }

    const title = routeTitle(to, t)
    if (title) {
      document.title = withSite(title)
    }

    // Espera a que la vista se monte (algunas ajustan la página al montarse)
    nextTick(() => markReady(view))
  })

  // Si el usuario acepta las cookies estando en una página, se mide esa página
  onMeasurementConsent(() => current && sendPageView(current))

  window.addEventListener('scroll', onScroll, { passive: true })
}
