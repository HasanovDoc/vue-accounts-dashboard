# vue-accounts-dashboard

[![Live Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)](https://hasanovdoc.github.io/vue-accounts-dashboard/)

Простое Vue 3 приложение для управления списком учётных записей с поддержкой Pinia и адаптивным тёмным интерфейсом.

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/9d173141-c655-45fc-b535-76a4a2221bc1" />


## Возможности

- Добавление, редактирование и удаление учётных записей
- Поддержка типов аккаунтов: Локальная и LDAP
- Несколько меток для одной пары логин/пароль (через ;)
- Сохранение данных в localStorage (persisted Pinia)
- Современный адаптивный дизайн с тёмной темой

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run serve
```

### Сборка для продакшена

```bash
npm run build
```

### Линтинг и автоисправление

```bash
npm run lint
```

## Структура проекта

- `src/components/AccountList.vue` — список аккаунтов, добавление, подсказка
- `src/components/AccountForm.vue` — форма для одного аккаунта
- `src/stores/accounts.ts` — Pinia store для аккаунтов
- `src/types/account.ts` — типы аккаунтов
- `src/App.vue` — корневой компонент, глобальные стили

## Использование

- Для добавления аккаунта нажмите круглую кнопку "+".
- Для удаления используйте иконку корзины справа от аккаунта.
- Для указания нескольких меток используйте разделитель `;` в поле "Метка".
- Тип аккаунта можно выбрать из выпадающего списка.

## Ссылки

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Документация по конфигурации Vue CLI](https://cli.vuejs.org/config/)
