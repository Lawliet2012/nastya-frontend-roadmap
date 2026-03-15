const ROADMAP_DATA = [
  {
    id: "fundamentals",
    icon: "1",
    title: "CS & Web Fundamentals",
    description: "Как работает компьютер, сеть и веб. Фундамент, без которого всё остальное — магия.",
    topics: [
      {
        id: "how-computers-work",
        title: "Как работает компьютер",
        items: [
          { id: "cpu-memory", text: "CPU, RAM, HDD/SSD — что делает каждый компонент", tip: "Не нужно знать на уровне электроники, но нужно понимать зачем нужна оперативка и почему SSD быстрее HDD." },
          { id: "os-basics", text: "Операционная система: процессы, потоки, файловая система", tip: "Понимание процессов поможет понять почему Node.js однопоточный и зачем нужны Web Workers." },
          { id: "terminal-basics", text: "Терминал/командная строка: базовые команды (cd, ls, mkdir, rm, cat, grep)", tip: "Без терминала невозможно нормально работать с git, npm, сборщиками." },
        ]
      },
      {
        id: "networking",
        title: "Сети и интернет",
        items: [
          { id: "how-internet-works", text: "Как работает интернет: IP, DNS, TCP/UDP", tip: "Когда ты набираешь URL — что происходит? DNS резолвит домен в IP, браузер устанавливает TCP-соединение..." },
          { id: "http-https", text: "HTTP/HTTPS: методы, статус-коды, заголовки, cookies", tip: "GET, POST, PUT, DELETE. 200, 301, 404, 500. Content-Type, Authorization, CORS headers." },
          { id: "rest-api", text: "REST API: принципы, проектирование, документация", tip: "Понимание REST нужно для работы с любым бэкендом." },
          { id: "websockets", text: "WebSockets: real-time коммуникация", tip: "Чаты, нотификации, real-time обновления — всё это WebSockets." },
          { id: "web-server", text: "Веб-сервер: что это, nginx basics, как отдаётся статика", tip: "Nginx — самый популярный веб-сервер. Понимание как он проксирует запросы критично для деплоя." },
        ]
      },
      {
        id: "browser",
        title: "Как работает браузер",
        items: [
          { id: "rendering-pipeline", text: "Rendering pipeline: DOM → CSSOM → Layout → Paint → Composite", tip: "Понимание пайплайна рендеринга = понимание почему некоторые CSS-свойства быстрее других." },
          { id: "devtools", text: "Chrome DevTools: Network, Performance, Elements, Console, Sources", tip: "DevTools — главный инструмент фронтендера. Научись профилировать и дебажить." },
          { id: "browser-storage", text: "Хранилища: localStorage, sessionStorage, IndexedDB, cookies", tip: "Когда что использовать и какие есть ограничения." },
        ]
      },
      {
        id: "cs-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-cs50", text: "CS50 (Harvard) — бесплатный курс по основам CS", link: "https://cs50.harvard.edu/x/", tip: "Лучший вводный курс по CS. Можно пройти первые 5 лекций для понимания основ." },
          { id: "r-how-web-works", text: "How the Web Works (MDN)", link: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works", tip: "Отличная статья от Mozilla." },
          { id: "r-http-mdn", text: "HTTP Overview (MDN)", link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
        ]
      }
    ]
  },
  {
    id: "js-deep",
    icon: "2",
    title: "JavaScript Deep Dive",
    description: "Глубокое понимание JS — отличие мидла от сеньора. Не просто 'знаю синтаксис', а понимаю как работает.",
    topics: [
      {
        id: "js-core",
        title: "Ядро языка",
        items: [
          { id: "event-loop", text: "Event Loop: microtasks, macrotasks, call stack, task queue", tip: "Самый важный концепт. setTimeout(fn, 0) — почему не сразу? Promise vs setTimeout — что выполнится первым?" },
          { id: "closures", text: "Замыкания: лексическое окружение, scope chain", tip: "Замыкание — не магия. Функция запоминает окружение в котором была создана." },
          { id: "prototypes", text: "Прототипы и наследование: __proto__, prototype, Object.create", tip: "class — это синтаксический сахар над прототипами. Понимание прототипов = понимание JS." },
          { id: "this-context", text: "this: правила определения контекста, bind/call/apply, стрелочные функции", tip: "4 правила: default binding, implicit, explicit (bind/call/apply), new. Стрелочные функции берут this из лексического окружения." },
          { id: "async-patterns", text: "Асинхронность: callbacks → Promises → async/await, Promise.all/race/allSettled", tip: "Уметь писать и отлаживать асинхронный код — ежедневная задача." },
          { id: "error-handling", text: "Обработка ошибок: try/catch, Error types, глобальные обработчики", tip: "window.onerror, unhandledrejection — ловить ошибки до того как пользователь их увидит." },
        ]
      },
      {
        id: "js-modern",
        title: "Современный JS (ES6+)",
        items: [
          { id: "destructuring", text: "Деструктуризация, spread/rest, template literals", tip: "Базовый синтаксис, но нужно знать все edge cases." },
          { id: "modules", text: "Модули: ESM vs CommonJS, import/export, динамический import()", tip: "ESM — стандарт. CommonJS — легаси из Node.js. Понимание разницы критично для сборщиков." },
          { id: "iterators", text: "Итераторы, генераторы, Symbol", tip: "for...of, Symbol.iterator — как работает под капотом." },
          { id: "proxy-reflect", text: "Proxy, Reflect — метапрограммирование", tip: "Vue 3 реактивность построена на Proxy. Знание Proxy = понимание как работает Vue." },
          { id: "weakmap-weakset", text: "WeakMap, WeakSet, Map, Set — когда что использовать", tip: "WeakMap для приватных данных и кеширования без утечек памяти." },
        ]
      },
      {
        id: "js-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-javascript-info", text: "javascript.info — лучший учебник по JS", link: "https://javascript.info/", tip: "Подробно, с примерами, на русском. Проходить главы по event loop, closures, prototypes." },
          { id: "r-you-dont-know-js", text: "You Don't Know JS (книга, бесплатно)", link: "https://github.com/getify/You-Dont-Know-JS", tip: "Глубокое погружение в JS. Для тех кто хочет реально понять язык." },
          { id: "r-js-event-loop", text: "What the heck is the event loop anyway? (видео)", link: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", tip: "Легендарное видео Philip Roberts. Обязательно к просмотру." },
        ]
      }
    ]
  },
  {
    id: "typescript",
    icon: "3",
    title: "TypeScript",
    description: "Must-have для любой вакансии. TypeScript — это не просто 'типы поверх JS', это инструмент проектирования.",
    topics: [
      {
        id: "ts-basics",
        title: "Основы",
        items: [
          { id: "ts-types", text: "Базовые типы: primitives, arrays, objects, union, intersection", tip: "string | number, {name: string} & {age: number}" },
          { id: "ts-interfaces", text: "Interfaces vs Types: когда что использовать", tip: "interface для объектов и классов, type для unions и сложных типов. На практике оба работают." },
          { id: "ts-generics", text: "Generics: обобщённые типы, constraints, defaults", tip: "Array<T>, Promise<T> — всё это generics. Научись писать свои." },
          { id: "ts-enums", text: "Enums, const assertions, literal types", tip: "as const часто лучше enum. Понимать trade-offs." },
          { id: "ts-narrowing", text: "Type narrowing: typeof, instanceof, discriminated unions, type guards", tip: "TypeScript умеет сужать типы через проверки. Это ключ к безопасному коду." },
        ]
      },
      {
        id: "ts-advanced",
        title: "Продвинутый уровень",
        items: [
          { id: "ts-utility", text: "Utility types: Partial, Required, Pick, Omit, Record, ReturnType", tip: "Встроенные хелперы которые экономят кучу кода." },
          { id: "ts-conditional", text: "Conditional types, infer, mapped types", tip: "T extends string ? A : B — мощный инструмент для type-level программирования." },
          { id: "ts-strict", text: "Strict mode, tsconfig настройка, path aliases", tip: "strict: true — всегда. Понимать что включает каждый strict-флаг." },
          { id: "ts-declaration", text: "Declaration files (.d.ts), DefinitelyTyped", tip: "Как типизировать JS-библиотеку без типов." },
        ]
      },
      {
        id: "ts-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-ts-handbook", text: "TypeScript Handbook (официальная документация)", link: "https://www.typescriptlang.org/docs/handbook/", tip: "Лучший источник. Читать от начала до конца." },
          { id: "r-ts-exercises", text: "Type Challenges — упражнения на типы", link: "https://github.com/type-challenges/type-challenges", tip: "Практика написания сложных типов. Начать с easy, дойти до medium." },
          { id: "r-total-ts", text: "Total TypeScript (Matt Pocock)", link: "https://www.totaltypescript.com/", tip: "Отличные бесплатные туториалы и видео." },
        ]
      }
    ]
  },
  {
    id: "css-advanced",
    icon: "4",
    title: "CSS & Вёрстка",
    description: "Уверенная вёрстка — это не 'подвинуть кнопку'. Это адаптивность, доступность и архитектура стилей.",
    topics: [
      {
        id: "css-layout",
        title: "Layouts & Responsive",
        items: [
          { id: "flexbox-deep", text: "Flexbox: все свойства, flex-grow/shrink/basis, выравнивание", tip: "Не просто display:flex + justify-content. Понимать как работает flex-basis и когда элементы сжимаются." },
          { id: "grid-deep", text: "CSS Grid: grid-template, areas, auto-fit/auto-fill, subgrid", tip: "Grid — для 2D-лейаутов. Subgrid — для выравнивания вложенных сеток." },
          { id: "responsive", text: "Responsive design: media queries, container queries, clamp()", tip: "Container queries — новый стандарт. clamp() для fluid typography." },
          { id: "css-variables", text: "CSS Custom Properties (переменные): наследование, fallbacks, динамические темы", tip: "var(--color-primary) — основа для темизации." },
        ]
      },
      {
        id: "css-architecture",
        title: "Архитектура стилей",
        items: [
          { id: "css-methodology", text: "Методологии: BEM, CSS Modules, CSS-in-JS", tip: "BEM — для классического CSS. CSS Modules — для React/Vue. Tailwind — utility-first." },
          { id: "preprocessors", text: "Препроцессоры: SCSS/Sass basics (переменные, миксины, nesting)", tip: "SCSS всё ещё часто используется. Нативный CSS nesting уже в браузерах." },
          { id: "tailwind", text: "Tailwind CSS: utility-first подход, кастомизация", tip: "Очень популярен. Много вакансий требуют. Спорный, но нужно уметь." },
          { id: "animations", text: "Анимации: transitions, keyframes, transform, will-change, FLIP", tip: "Анимировать только transform и opacity для 60fps. FLIP — паттерн для сложных анимаций." },
        ]
      },
      {
        id: "css-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-flexbox-froggy", text: "Flexbox Froggy — игра для изучения Flexbox", link: "https://flexboxfroggy.com/", tip: "Весёлый способ выучить flexbox." },
          { id: "r-grid-garden", text: "Grid Garden — игра для изучения Grid", link: "https://cssgridgarden.com/" },
          { id: "r-css-tricks", text: "CSS-Tricks — Complete Guide to Flexbox/Grid", link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
        ]
      }
    ]
  },
  {
    id: "react",
    icon: "5",
    title: "React",
    description: "Основной фреймворк для рынка. ~65-70% вакансий. С опытом Vue и Aurelia будет легко войти.",
    topics: [
      {
        id: "react-core",
        title: "Core Concepts",
        items: [
          { id: "jsx", text: "JSX, компоненты, props, children", tip: "JSX — не HTML. Это JavaScript выражения. Компоненты — функции которые возвращают JSX." },
          { id: "state-hooks", text: "State & Hooks: useState, useEffect, useRef, useCallback, useMemo", tip: "Hooks — основа React. useEffect — самый сложный хук. Понимать dependency array и cleanup." },
          { id: "component-patterns", text: "Паттерны: Composition, Render Props, HOC, Custom Hooks", tip: "Custom Hooks — главный паттерн переиспользования логики в React." },
          { id: "react-forms", text: "Формы: controlled vs uncontrolled, React Hook Form, Zod/Yup валидация", tip: "В CRM формы — 80% работы. React Hook Form + Zod — современный стандарт." },
          { id: "react-context", text: "Context API: когда использовать, когда нет, оптимизация", tip: "Context — не замена state manager. Используй для тем, локали, авторизации." },
        ]
      },
      {
        id: "react-ecosystem",
        title: "Экосистема React",
        items: [
          { id: "react-router", text: "React Router v6+: routing, nested routes, loaders", tip: "Основной роутер для React SPA." },
          { id: "state-management", text: "State Management: Zustand, Redux Toolkit, Jotai — когда что", tip: "Zustand — простой и лёгкий. Redux Toolkit — для больших приложений. Jotai — атомарный подход." },
          { id: "react-query", text: "TanStack Query (React Query): серверный стейт, кеширование, мутации", tip: "Изменил подход к работе с API. Не нужно руками писать loading/error/data стейты." },
          { id: "nextjs", text: "Next.js: SSR, SSG, App Router, Server Components", tip: "Стандарт для production React-приложений. Много вакансий требуют." },
          { id: "react-ui", text: "UI библиотеки: shadcn/ui, Radix, Material UI", tip: "shadcn/ui — тренд 2024-2025. Копируешь компоненты в проект, полный контроль." },
        ]
      },
      {
        id: "react-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-react-docs", text: "React.dev — новая официальная документация", link: "https://react.dev/", tip: "Лучший ресурс для изучения React. Интерактивные примеры." },
          { id: "r-react-patterns", text: "Patterns.dev — паттерны React", link: "https://www.patterns.dev/", tip: "Паттерны проектирования для React-приложений." },
          { id: "r-nextjs-docs", text: "Next.js Documentation", link: "https://nextjs.org/docs", tip: "Официальная документация Next.js." },
        ]
      }
    ]
  },
  {
    id: "vue",
    icon: "6",
    title: "Vue 3 (углублённо)",
    description: "У тебя уже есть опыт с Vue. Углуби знания до уверенного уровня.",
    topics: [
      {
        id: "vue-advanced",
        title: "Продвинутый Vue",
        items: [
          { id: "composition-api", text: "Composition API: ref, reactive, computed, watch, watchEffect", tip: "Composition API — стандарт Vue 3. Если пишешь на Options API — пора переходить." },
          { id: "vue-reactivity", text: "Reactivity system: как работает под капотом (Proxy, track, trigger)", tip: "Понимание реактивности Vue = понимание почему иногда данные 'не обновляются'." },
          { id: "composables", text: "Composables: переиспользование логики (аналог Custom Hooks)", tip: "useCounter, useFetch, useAuth — выносить логику в composables." },
          { id: "vue-router", text: "Vue Router: navigation guards, lazy loading, meta fields", tip: "beforeEach guard для авторизации. Lazy loading для оптимизации." },
          { id: "pinia", text: "Pinia: store, actions, getters, plugins", tip: "Официальный state manager Vue 3. Заменил Vuex." },
        ]
      },
      {
        id: "vue-ecosystem",
        title: "Экосистема Vue",
        items: [
          { id: "nuxt", text: "Nuxt 3: SSR, auto-imports, file-based routing", tip: "Next.js для Vue. Если знаешь Next.js — Nuxt будет понятен." },
          { id: "vueuse", text: "VueUse: коллекция готовых composables", tip: "200+ готовых composables. useLocalStorage, useDark, useIntersectionObserver..." },
          { id: "vue-testing", text: "Vue Test Utils + Vitest для компонентов", tip: "Тестирование компонентов Vue." },
        ]
      },
      {
        id: "vue-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-vue-docs", text: "Vue.js Documentation", link: "https://vuejs.org/", tip: "Одна из лучших документаций во фронтенде." },
          { id: "r-pinia-docs", text: "Pinia Documentation", link: "https://pinia.vuejs.org/" },
          { id: "r-vueuse", text: "VueUse — Collection of Vue Composables", link: "https://vueuse.org/" },
        ]
      }
    ]
  },
  {
    id: "tooling",
    icon: "7",
    title: "Инструментарий & Настройка проекта",
    description: "Как создать проект с нуля: от git init до деплоя. Сборщики, линтеры, форматтеры.",
    topics: [
      {
        id: "project-setup",
        title: "Создание проекта с нуля",
        items: [
          { id: "git-workflow", text: "Git: branching strategies, merge vs rebase, conventional commits, .gitignore", tip: "Git flow, GitHub flow. Conventional commits: feat:, fix:, chore:. Уметь resolve конфликты." },
          { id: "package-managers", text: "Package managers: npm vs yarn vs pnpm, package.json, lock files", tip: "pnpm — самый быстрый и экономный. Понимать зачем нужен lock file." },
          { id: "project-structure", text: "Структура проекта: feature-based vs layer-based, монорепо basics", tip: "src/features/ vs src/components/, src/hooks/, src/utils/. Feature-based масштабируется лучше." },
          { id: "env-config", text: ".env файлы, конфигурация для разных окружений (dev/staging/prod)", tip: "VITE_API_URL, NEXT_PUBLIC_ — как переменные попадают в клиентский код." },
        ]
      },
      {
        id: "bundlers",
        title: "Сборщики",
        items: [
          { id: "vite", text: "Vite: почему быстрый, dev server, HMR, плагины, конфигурация", tip: "Vite использует ESM в dev mode = мгновенный старт. Для production — Rollup. Стандарт для Vue, популярен для React." },
          { id: "webpack-basics", text: "Webpack: loaders, plugins, entry/output, code splitting (legacy но нужно знать)", tip: "Webpack — легаси, но огромное количество проектов на нём. Нужно уметь хотя бы читать webpack.config.js." },
          { id: "esbuild-swc", text: "esbuild, SWC, Turbopack — новое поколение сборщиков", tip: "Написаны на Go/Rust = в 10-100 раз быстрее webpack. Next.js использует SWC/Turbopack." },
          { id: "bundler-concepts", text: "Tree shaking, code splitting, lazy loading, chunks, source maps", tip: "Понимать как сборщик убирает неиспользуемый код и разбивает бандл на части." },
        ]
      },
      {
        id: "code-quality",
        title: "Качество кода",
        items: [
          { id: "eslint", text: "ESLint: настройка, правила, плагины, flat config (новый формат)", tip: "ESLint 9+ использует flat config (eslint.config.js). Знать популярные плагины: @typescript-eslint, eslint-plugin-react." },
          { id: "prettier", text: "Prettier: настройка, интеграция с ESLint", tip: "Prettier для форматирования, ESLint для логики. Не путать их задачи." },
          { id: "husky-lint-staged", text: "Husky + lint-staged: pre-commit hooks", tip: "Автоматическая проверка кода перед коммитом. Обязательно в каждом проекте." },
          { id: "editorconfig", text: "EditorConfig, .nvmrc, настройка VSCode для проекта", tip: "Чтобы у всей команды были одинаковые настройки редактора." },
        ]
      },
      {
        id: "tooling-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-vite-docs", text: "Vite Documentation", link: "https://vitejs.dev/" },
          { id: "r-eslint-docs", text: "ESLint Getting Started", link: "https://eslint.org/docs/latest/use/getting-started" },
          { id: "r-git-book", text: "Pro Git Book (бесплатно)", link: "https://git-scm.com/book/en/v2", tip: "Лучшая книга по Git. Читать главы 2, 3, 7." },
        ]
      }
    ]
  },
  {
    id: "testing",
    icon: "8",
    title: "Тестирование",
    description: "Тестирование отличает профессионала от джуна. Знание тестов = доверие на код-ревью.",
    topics: [
      {
        id: "testing-types",
        title: "Типы тестов",
        items: [
          { id: "unit-tests", text: "Unit тесты: что тестировать, что нет, моки, стабы", tip: "Тестировать бизнес-логику, утилиты, хуки. Не тестировать детали реализации." },
          { id: "integration-tests", text: "Интеграционные тесты: Testing Library, рендер компонентов", tip: "Тестировать компоненты как пользователь их видит. getByRole, getByText — не getByTestId." },
          { id: "e2e-tests", text: "E2E тесты: Playwright или Cypress", tip: "Playwright — быстрее и надёжнее. Cypress — проще для начала. Тестировать критические пользовательские сценарии." },
          { id: "testing-pyramid", text: "Пирамида тестирования: много unit → меньше integration → мало e2e", tip: "Или trophy: больше integration тестов (подход Testing Library)." },
        ]
      },
      {
        id: "testing-tools",
        title: "Инструменты",
        items: [
          { id: "vitest", text: "Vitest: настройка, API, coverage, watch mode", tip: "Vitest — Jest-совместимый, но на Vite. Быстрее и проще настройки." },
          { id: "testing-library", text: "Testing Library: philosophy, queries, user-event, async utilities", tip: "'Чем больше тесты похожи на использование софта, тем больше уверенности они дают.'" },
          { id: "msw", text: "MSW (Mock Service Worker): мокирование API запросов", tip: "Мокирует на уровне network, а не на уровне модулей. Работает и в тестах, и в dev." },
          { id: "coverage", text: "Code coverage: что измерять, какой % адекватный", tip: "80% — хороший таргет. 100% — обычно трата времени. Coverage не гарантирует качество." },
        ]
      },
      {
        id: "testing-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-testing-library", text: "Testing Library Documentation", link: "https://testing-library.com/docs/" },
          { id: "r-vitest-docs", text: "Vitest Documentation", link: "https://vitest.dev/" },
          { id: "r-kent-testing", text: "Kent C. Dodds — Testing JavaScript", link: "https://testingjavascript.com/", tip: "Лучший курс по тестированию фронтенда." },
        ]
      }
    ]
  },
  {
    id: "devops",
    icon: "9",
    title: "DevOps & Deployment",
    description: "Как захостить сайт, настроить CI/CD, и базовый Docker. Навыки, которые выделяют среди других фронтендеров.",
    topics: [
      {
        id: "hosting",
        title: "Хостинг и деплой",
        items: [
          { id: "static-hosting", text: "Статический хостинг: Vercel, Netlify, GitHub Pages", tip: "Vercel — идеален для Next.js. Netlify — для статики и Vue/Nuxt. GitHub Pages — для простых сайтов." },
          { id: "domain-dns", text: "Домены, DNS записи (A, CNAME, MX), SSL/TLS сертификаты", tip: "Как привязать домен к хостингу. Let's Encrypt для бесплатного SSL." },
          { id: "nginx-config", text: "Nginx: конфигурация, reverse proxy, SPA routing, HTTPS", tip: "try_files $uri /index.html — волшебная строка для SPA. Proxy_pass для API." },
          { id: "pm2-systemd", text: "Process managers: PM2, systemd — как держать Node.js сервер живым", tip: "PM2 для Node.js приложений. Автоперезапуск при падении." },
        ]
      },
      {
        id: "ci-cd",
        title: "CI/CD",
        items: [
          { id: "github-actions", text: "GitHub Actions: workflows, jobs, triggers, secrets", tip: "Основная CI/CD платформа. Настроить: lint → test → build → deploy при пуше." },
          { id: "ci-pipeline", text: "CI pipeline: lint, type-check, test, build, preview deploy", tip: "Каждый PR должен проходить автоматическую проверку." },
          { id: "docker-basics", text: "Docker basics: Dockerfile, images, containers, docker-compose", tip: "Не нужно быть DevOps-инженером, но базовый Dockerfile для фронтенда писать уметь." },
        ]
      },
      {
        id: "devops-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-github-actions", text: "GitHub Actions Documentation", link: "https://docs.github.com/en/actions" },
          { id: "r-docker-101", text: "Docker Getting Started", link: "https://docs.docker.com/get-started/" },
          { id: "r-nginx-beginner", text: "Nginx Beginner's Guide", link: "https://nginx.org/en/docs/beginners_guide.html" },
        ]
      }
    ]
  },
  {
    id: "architecture",
    icon: "10",
    title: "Архитектура & Best Practices",
    description: "Паттерны, производительность, доступность — то, что отличает сеньора.",
    topics: [
      {
        id: "performance",
        title: "Производительность",
        items: [
          { id: "core-web-vitals", text: "Core Web Vitals: LCP, FID/INP, CLS — что это и как оптимизировать", tip: "Google ранжирует по этим метрикам. Lighthouse для измерения." },
          { id: "lazy-loading", text: "Lazy loading: React.lazy, dynamic import(), Intersection Observer", tip: "Не грузить всё сразу. Lazy load для роутов, изображений, компонентов." },
          { id: "image-optimization", text: "Оптимизация изображений: WebP/AVIF, srcset, next/image", tip: "Изображения — главная причина медленных сайтов." },
          { id: "memoization", text: "Мемоизация: React.memo, useMemo, useCallback — когда реально нужно", tip: "Не мемоизировать всё подряд. Только если есть измеримая проблема." },
        ]
      },
      {
        id: "a11y-security",
        title: "Доступность & Безопасность",
        items: [
          { id: "a11y", text: "Accessibility (a11y): ARIA, семантический HTML, keyboard navigation, screen readers", tip: "Доступность — не 'nice to have', а требование. WCAG 2.1 AA — стандартный таргет." },
          { id: "security-frontend", text: "Frontend Security: XSS, CSRF, CSP, sanitization, CORS", tip: "Никогда не доверять пользовательскому вводу. dangerouslySetInnerHTML = красный флаг." },
        ]
      },
      {
        id: "patterns",
        title: "Архитектурные паттерны",
        items: [
          { id: "clean-code", text: "Clean Code: именование, функции, принципы SOLID для фронтенда", tip: "Single Responsibility — один компонент делает одну вещь." },
          { id: "design-patterns", text: "Паттерны: Observer, Strategy, Factory, Decorator — в контексте фронтенда", tip: "Event emitters (Observer), middleware (Chain of Responsibility), HOC (Decorator)." },
          { id: "monorepo", text: "Монорепо: Turborepo, Nx — когда нужно и зачем", tip: "Для нескольких пакетов/приложений в одном репозитории." },
          { id: "microfrontends", text: "Микрофронтенды: Module Federation, когда оправдано", tip: "Для больших команд. Обычно overkill, но знать что это — полезно." },
        ]
      },
      {
        id: "arch-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-web-dev", text: "web.dev — Google's resource for web developers", link: "https://web.dev/", tip: "Core Web Vitals, Performance, Accessibility — всё тут." },
          { id: "r-patterns-dev", text: "Patterns.dev — Design Patterns", link: "https://www.patterns.dev/" },
          { id: "r-a11y-project", text: "The A11Y Project", link: "https://www.a11yproject.com/" },
        ]
      }
    ]
  },
  {
    id: "interviews",
    icon: "11",
    title: "Собеседования & Soft Skills",
    description: "Знания без умения их продать = потраченное время. Подготовка к собеседованиям.",
    topics: [
      {
        id: "interview-prep",
        title: "Подготовка к собеседованиям",
        items: [
          { id: "resume", text: "Резюме: структура, что включать, GitHub/портфолио проекты", tip: "Максимум 1-2 страницы. Акцент на результаты, не обязанности. Ссылки на GitHub." },
          { id: "algorithms-basic", text: "Алгоритмы (базовый уровень): Big O, массивы, строки, хеш-таблицы, деревья (DOM!)", tip: "Не нужно LeetCode hard. Но базовые структуры данных и Big O знать нужно." },
          { id: "system-design-fe", text: "Frontend System Design: как спроектировать компонент/страницу/приложение", tip: "Как бы ты спроектировала автокомплит? Бесконечный скролл? Чат? Уведомления?" },
          { id: "behavioral", text: "Поведенческие вопросы: STAR метод, ситуации из опыта", tip: "Расскажи о сложном баге. Конфликт в команде. Сжатые сроки. Готовить 5-7 историй." },
          { id: "live-coding", text: "Live coding: практика, коммуникация мыслей вслух", tip: "Важно не молча кодить, а объяснять что делаешь и почему." },
        ]
      },
      {
        id: "soft-skills",
        title: "Soft Skills",
        items: [
          { id: "english", text: "Английский: чтение документации, коммуникация в команде, созвоны", tip: "B1-B2 минимум для работы в международных командах." },
          { id: "code-review", text: "Code Review: как давать и принимать фидбек", tip: "Конструктивно, без перехода на личности. 'А что если...' вместо 'Это неправильно'." },
          { id: "estimation", text: "Оценка задач: декомпозиция, story points, буферы на неизвестное", tip: "Умножай свою оценку на 2. Серьёзно." },
          { id: "communication", text: "Коммуникация: как объяснять технические решения нетехническим людям", tip: "Менеджеру не нужно знать про Proxy и WeakMap. Ему нужно знать 'будет быстрее и надёжнее'." },
        ]
      },
      {
        id: "interview-resources",
        title: "Ресурсы",
        isResources: true,
        items: [
          { id: "r-frontend-masters", text: "Frontend Interview Handbook", link: "https://www.frontendinterviewhandbook.com/", tip: "Бесплатный гайд по подготовке." },
          { id: "r-greatfrontend", text: "GreatFrontEnd — практика к собесам", link: "https://www.greatfrontend.com/", tip: "Задачи по JavaScript, UI компоненты, system design." },
          { id: "r-neetcode", text: "NeetCode — алгоритмы с видео-объяснениями", link: "https://neetcode.io/", tip: "Лучше чем LeetCode для начинающих. Видео-разборы задач." },
        ]
      }
    ]
  }
];
