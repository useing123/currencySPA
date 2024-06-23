Конечно, вот более краткая версия документации с упоминанием атомарного дизайна:

```markdown
# CurrencySPA

CurrencySPA - это одностраничное приложение (SPA) для просмотра курсов валют и управления избранными валютами. Оно создано с использованием Vue.js 3, Tailwind CSS и Pinia.

## Установка

Для установки CurrencySPA выполните следующие шаги:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/your-repo/currencyspa.git
   ```

2. Перейдите в каталог проекта и установите зависимости:
   ```bash
   cd currencyspa
   yarn install
   ```

3. Запустите сервер разработки:
   ```bash
   yarn dev
   ```

4. Откройте браузер и перейдите по адресу `http://localhost:3000`, чтобы просмотреть приложение.

## Особенности

- Просмотр курсов валют.
- Управление избранными валютами.
- Используется атомарный дизайн для компонентов.

## Браузерное расширение для CORS

CurrencySPA использует браузерное расширение для включения CORS (Cross-Origin Resource Sharing) для выполнения запросов к внешним API. Убедитесь, что установили расширение CORS в вашем браузере перед запуском CurrencySPA.
Cors Everywhere https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/

## Технологии

- Vue.js 3
- Tailwind CSS
- Pinia

## Структура проекта

- `src`
  - `assets`
  - `components` (атомарный дизайн)
    - `atoms`
    - `molecules`
    - `organisms`
  - `pages`
  - `router`
  - `stores`

## Скрипты

- `yarn dev`
- `yarn build`
- `yarn preview`
- `yarn test:unit`
- `yarn lint`
- `yarn format`

## Зависимости

- `vue`
- `vue-router`
- `pinia`
- `axios`
- `sass`
- `tailwindcss`

## DevDependencies

- `vite`
- `eslint`
- `prettier`
- `@vue/test-utils`
- `vitest`

```
