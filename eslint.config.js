// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginRouter from '@tanstack/eslint-plugin-router'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.*',
      'commitlint.config.*',
      'scripts/**',
      '.husky/**',
      'dist/**',
    ],
  },
  ...tanstackConfig, // React Hooks
  {
    plugins: { 'react-hooks': reactHooks, 'simple-import-sort': simpleImportSort },
    rules: reactHooks.configs.recommended.rules,
  }, // TanStack Router
  ...pluginRouter.configs['flat/recommended'], // TanStack Query
  ...pluginQuery.configs['flat/recommended'], // Игнорим генерируемое дерево роутов
  {
    ignores: [
      '**/routeTree.gen.ts',
      'coverage/**',
      'build/**',
      'public/mockServiceWorker.js',
      '.storybook/**',
    ],
  },
  // Prettier — последним
  eslintConfigPrettier,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message:
                'Импортируйте из папки фичи через index.ts (import { Something } from "@/features/feature-name")',
            },
            {
              group: ['@/shared/ui/*/*'],
              message: 'UI компоненты должны импортироваться через shared/ui/index.ts',
            },
            {
              group: ['**/src/**'],
              message: 'Не используйте пути с /src/ в импортах, используйте алиасы',
            },
          ],
        },
      ],
      // сортировка import'ов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1) side-effect imports (кроме стилей)
            ['^\\u0000(?!.*\\.(css|scss|sass|less|styl)$)'],

            // 2) react first, затем остальные пакеты
            ['^react$', '^react-dom$', '^react/', '^@?\\w'],

            // 3) FSD алиасы (от базового к верхнему слою)
            ['^@/app(/.*)?$'],
            ['^@/pages(/.*)?$'],
            ['^@/entities(/.*)?$'],
            ['^@/shared(/.*)?$'],
            ['^@/features(/.*)?$'],
            ['^@/widgets(/.*)?$'],

            // 4) любые прочие @/...
            ['^@/(?!shared/|entities/|features/|widgets/|pages/|app/).*'],

            // 5) относительные импорты
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // 6) импорты ассетов
            ['^.+\\.(png|jpe?g|gif|svg|webp|ico)$'],

            // 7) стили (и обычные, и module)
            ['^.+\\.(css|scss|sass|less|styl)$', '^\\u0000.*\\.(css|scss|sass|less|styl)$'],
          ],
        },
      ],

      // сортировка export'ов
      'simple-import-sort/exports': 'error',

      // важно: выключаем потенциальные конфликтующие правила
      'sort-imports': 'off',
      'import/order': 'off',
    },
  },

  ...storybook.configs['flat/recommended'],
]
