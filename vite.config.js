import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import { imagetools } from 'vite-imagetools'
import mdiIcons from './vite-plugins/mdi-icons.js'

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

// Cuando el build se publica como sitio estático (VITE_BASE "/"), genera el .htaccess
// de Apache: rutas de la SPA, compresión, caché de los assets con hash y cabecera
// X-Robots-Tag fuera de producción. Detrás de Laravel lo hace el backend.
function apacheConfig(base, allowIndexing) {
  const robotsHeader = allowIndexing
    ? ''
    : `# No indexar el entorno de pruebas (también en páginas de error)
<IfModule mod_headers.c>
    Header always set X-Robots-Tag "noindex, nofollow"
</IfModule>

`

  const source = `${robotsHeader}# Compresión de texto (HTML, CSS, JS, JSON, SVG)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Los archivos de /assets llevan hash en el nombre: se pueden guardar un año.
# index.html se revisa siempre para que cada despliegue llegue de inmediato.
<IfModule mod_headers.c>
    <FilesMatch "\\.(js|css|webp|png|jpg|svg|woff2?)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    <FilesMatch "\\.html$">
        Header set Cache-Control "no-cache"
    </FilesMatch>
</IfModule>

# SPA: las rutas de la app se sirven con index.html
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_URI} !^/\\.well-known/
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
`

  return {
    name: 'apache-config',
    generateBundle() {
      if (base !== '/') return
      this.emitFile({ type: 'asset', fileName: '.htaccess', source })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_BASE || '/'
  const allowIndexing = env.VITE_ALLOW_INDEXING === 'true'

  return {
    // Ruta pública de los assets; "/app/" cuando el build lo sirve Laravel (public/app)
    base,
    plugins: [
      vue(),
      vuetify({ autoImport: true }),

      // Antes que svgLoader: así los SVG importados con ?w=...&format=webp se
      // convierten a WebP del tamaño indicado. Los SVG sin esos parámetros (o con
      // ?component) siguen en manos de svgLoader
      imagetools({
        include: [
          '**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
          /\.svg\?(?:.*&)?(?:w|width|format|quality)=/
        ]
      }),

      svgLoader({
        svgo: false,
        defaultImport: 'url'
      }),

      mdiIcons(),
      robots(allowIndexing),
      apacheConfig(base, allowIndexing)
    ],
    assetsInclude: ['**/*.svg'],
  }
})
