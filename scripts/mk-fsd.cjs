/* scripts/mk-fsd.cjs */
const fs = require('node:fs')
const path = require('node:path')

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')

// FSD каркас (минимальный)
const dirs = [
  'app',
  'app/providers',
  'app/router',
  'app/styles',

  'pages',
  'widgets',
  'features',
  'entities',

  'shared',
  'shared/api',
  'shared/config',
  'shared/lib',
  'shared/ui',
]

// Папки, которые хотим гарантированно “зафиксировать” в git (через .gitkeep)
const leafDirs = [
  'app/providers',
  'app/router',
  'app/styles',

  'pages',
  'widgets',
  'features',
  'entities',

  'shared/api',
  'shared/config',
  'shared/lib',
  'shared/ui',
]

function ensureDir(rel) {
  const abs = path.join(SRC, rel)
  fs.mkdirSync(abs, { recursive: true })
}

function ensureGitkeep(rel) {
  const abs = path.join(SRC, rel, '.gitkeep')
  if (!fs.existsSync(abs)) {
    fs.writeFileSync(abs, '', 'utf8')
  }
}

function main() {
  // убедимся, что src существует
  fs.mkdirSync(SRC, { recursive: true })

  // создаём папки
  for (const d of dirs) ensureDir(d)

  // создаём .gitkeep в листах
  for (const d of leafDirs) ensureGitkeep(d)

  console.log('✅ FSD структура создана в src/')
}

main()
