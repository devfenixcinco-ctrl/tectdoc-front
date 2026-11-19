import { readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import * as paths from '@mdi/js'
import { aliases } from 'vuetify/iconsets/mdi'

// Reemplaza la fuente completa de Material Design Icons (~700 KB entre fuente y CSS)
// por un CSS con solo los íconos que usa el sitio, dibujados como SVG.
//
// Mantiene las mismas clases ("mdi mdi-star", y los íconos de Vuetify), así que las
// plantillas no cambian. Los íconos se detectan al compilar buscando "mdi-..." en src/
// y en los alias internos de Vuetify; al agregar uno nuevo basta con volver a compilar
// (en desarrollo, reiniciar `npm run dev`).

const ID = 'virtual:mdi-icons.css'
const RESOLVED_ID = '\0' + ID

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return ['.vue', '.js', '.ts'].includes(extname(entry.name)) ? [path] : []
  })
}

function usedIcons(srcDir) {
  const names = new Set(Object.values(aliases).filter((v) => typeof v === 'string' && v.startsWith('mdi-')))

  for (const file of sourceFiles(srcDir)) {
    for (const [name] of readFileSync(file, 'utf-8').matchAll(/mdi-[a-z0-9]+(?:-[a-z0-9]+)*/g)) {
      names.add(name)
    }
  }

  return [...names].sort()
}

// "mdi-check-decagram" -> "mdiCheckDecagram" (nombre exportado por @mdi/js)
const exportName = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())

function buildCss(srcDir) {
  const rules = usedIcons(srcDir)
    .filter((name) => paths[exportName(name)])
    .map((name) => {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='${paths[exportName(name)]}'/></svg>`
      const uri = svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23')
      return `.${name}{--mdi:url("data:image/svg+xml,${uri}")}`
    })

  return [
    '.mdi::before{content:"";display:inline-block;width:1em;height:1em;vertical-align:-.125em;',
    'background-color:currentColor;-webkit-mask:var(--mdi) no-repeat center/100% 100%;mask:var(--mdi) no-repeat center/100% 100%}',
    ...rules
  ].join('\n')
}

export default function mdiIcons({ srcDir = 'src' } = {}) {
  return {
    name: 'mdi-icons',
    resolveId(id) {
      return id === ID ? RESOLVED_ID : null
    },
    load(id) {
      return id === RESOLVED_ID ? buildCss(srcDir) : null
    }
  }
}
