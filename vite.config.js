import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import { imagetools } from 'vite-imagetools'

// Fuera de producción (VITE_ALLOW_INDEXING distinto de "true") el sitio no se
// puede indexar: añade meta robots noindex y genera un robots.txt que bloquea todo
function robots(allowIndexing) {
  return {
    name: 'robots',
    transformIndexHtml() {
      return [{
        tag: 'meta',
        attrs: { name: 'robots', content: allowIndexing ? 'index, follow' : 'noindex, nofollow' },
        injectTo: 'head'
      }]
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\n${allowIndexing ? 'Disallow:' : 'Disallow: /'}\n`
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    // Ruta pública de los assets; "/app/" cuando el build lo sirve Laravel (public/app)
    base: env.VITE_BASE || '/',
    plugins: [
      vue(),
      vuetify({ autoImport: true }),

      svgLoader({
        svgo: false,
        defaultImport: 'url'
      }),

      imagetools(),

      robots(env.VITE_ALLOW_INDEXING === 'true')
    ],
    assetsInclude: ['**/*.svg'],
  }
})
