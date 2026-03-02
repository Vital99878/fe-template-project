// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite'

import { initialize, mswLoader } from 'msw-storybook-addon'

// 1) Подключи глобальные стили приложения (Tailwind / reset / tokens)
//    Путь подправь под твою структуру, главное — чтобы это был главный css entry.
import '../src/app/styles/index.css'

// 2) Инициализация MSW для всех сторис
initialize()

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    // Параметры можно расширять позже (themes, backgrounds и т.д.)
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
