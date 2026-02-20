# shared/ui

Базовые UI-примитивы проекта (универсальные и переиспользуемые).

Цель: единый внешний вид, единые состояния (hover/focus/disabled/loading),
корректная семантика и доступность.

## Что хранится здесь

Примитивы, которые:

- не зависят от домена/страниц/фич
- принимают обычные HTML props
- используют design tokens (Tailwind classes: `bg-*`, `text-*`, `border-*`)
- содержат a11y-атрибуты там, где это нужно

Примеры: `button/`, `link/`, `input/`, `field/`.

## Правила

### Публичный API папки

Импортировать компоненты через `index.ts` модуля:

- ✅ `@/shared/ui/button`
- ❌ глубокие импорты в файлы компонента

### Единый источник стилей

Если компонент имеет варианты/размеры, сначала делаем `*Classes()`:

- `buttonClasses()`
- `linkClasses()`
- `inputClasses()`

Компоненты используют эти функции, чтобы стили не расходились.

### Семантика

- Навигация → ссылка (`AppLink` / `LinkAsButton`)
- Действие → кнопка (`Button`)

### Доступность (a11y)

- `focus-visible` стили обязательны
- `Field` связывает label/hint/error через `id`, `htmlFor`, `aria-describedby`
- Ошибка поля → `aria-invalid="true"`

## Состав папки (текущее)

- `button/` — `buttonClasses`, `Button`, `LinkAsButton`
- `link/` — `linkClasses`, `AppLink`
- `input/` — `Input` (+ `inputClasses`)
- `field/` — `Field` (label/hint/error + aria)
