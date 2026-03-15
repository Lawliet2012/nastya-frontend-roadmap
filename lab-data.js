const LAB_DATA = {
  title: "Frontend Mega Lab",
  subtitle: "Один проект — весь роадмап",
  description: "Пошаговая лаба: строишь e-commerce приложение на React и Vue, работая с DummyJSON API. Каждый шаг покрывает конкретные пункты роадмапа. Кода здесь нет — только направление, объяснение зачем, и подсказки. Всё остальное — сама.",
  api: "https://dummyjson.com",
  phases: [
    // ===== PHASE 1: РАЗВЕДКА =====
    {
      id: "recon",
      title: "Разведка",
      description: "Прежде чем писать код — пойми инструменты и API. Это фундамент, на котором стоит всё остальное.",
      steps: [
        {
          id: "step-1",
          title: "Исследуй DummyJSON API",
          why: "В реальной работе ты всегда начинаешь с документации API. Прежде чем писать фронт — нужно понять что отдаёт бэкенд, какие есть эндпоинты, как устроена авторизация. Без этого ты будешь гадать вместо того чтобы строить.",
          covers: ["HTTP/HTTPS", "REST API", "Chrome DevTools"],
          tasks: [
            { id: "lab-1-1", text: "Открой dummyjson.com/docs и выпиши все доступные ресурсы (products, users, carts и т.д.). Для каждого запиши: какие HTTP-методы поддерживает, какие query-параметры принимает.", hint: "Обрати внимание на /products?limit=10&skip=10&select=title,price — это пагинация и выбор полей." },
            { id: "lab-1-2", text: "Открой Chrome DevTools → Network. Перейди на dummyjson.com/products в браузере. Изучи запрос: метод, статус-код, заголовки запроса и ответа, тело ответа. Что такое Content-Type? Зачем нужен Accept?", hint: "Переключи фильтр на Fetch/XHR чтобы видеть только API-запросы. Кликни на запрос → Headers, Response, Timing." },
            { id: "lab-1-3", text: "В Console DevTools выполни fetch-запрос к /auth/login с POST-методом. Передай username: 'emilys', password: 'emilyspass'. Что вернулось? Найди токен в ответе.", hint: "fetch('https://dummyjson.com/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({...}) }).then(r => r.json()).then(console.log)" },
            { id: "lab-1-4", text: "Сделай запрос с неправильным паролем. Какой статус-код вернулся? А теперь запроси несуществующий endpoint. Какой статус? Составь таблицу: код → значение для 200, 201, 400, 401, 404, 500.", hint: "Разница между 4xx и 5xx: 4xx — ошибка клиента (ты что-то не так послал), 5xx — ошибка сервера." },
            { id: "lab-1-5", text: "Используй токен из шага 3: сделай GET /auth/me с заголовком Authorization: 'Bearer <token>'. Что вернулось? Попробуй без токена — что изменилось?", hint: "fetch(url, { headers: { 'Authorization': 'Bearer ...' } })" }
          ],
          checkpoint: "Ты можешь объяснить: разницу между GET/POST/PUT/DELETE, что значат коды 200/201/401/404/500, зачем нужны заголовки Content-Type и Authorization, как работает JWT-авторизация."
        },
        {
          id: "step-2",
          title: "Терминал — твой рабочий инструмент",
          why: "Все инструменты фронтенда живут в терминале: git, npm, docker, сборщики. Без терминала ты не сможешь нормально работать. Это как для повара уметь держать нож — базовый навык.",
          covers: ["Terminal/CLI", "OS basics"],
          tasks: [
            { id: "lab-2-1", text: "Создай директорию проекта ~/projects/mega-lab используя только терминал. Внутри создай README.md и запиши в него название проекта.", hint: "mkdir -p ~/projects/mega-lab && cd ~/projects/mega-lab && echo '# Mega Lab' > README.md" },
            { id: "lab-2-2", text: "Попрактикуй навигацию: pwd, ls -la (что значит каждый столбец?), cd (абсолютный vs относительный путь), find (найди все .js файлы в домашней директории), which node.", hint: "ls -la показывает: права, кол-во ссылок, владельца, группу, размер, дату, имя. Точка перед именем = скрытый файл." },
            { id: "lab-2-3", text: "Изучи pipes и перенаправление: cat file | grep 'text' | wc -l. Что делает каждая часть? Попробуй: ls -la | sort -k5 -n (что происходит?).", hint: "| передаёт stdout одной команды в stdin другой. > записывает в файл, >> дописывает в файл." },
            { id: "lab-2-4", text: "Установи nvm (Node Version Manager). Установи последнюю LTS-версию Node.js. Переключись между версиями. Почему nvm лучше глобальной установки?", hint: "Разные проекты могут требовать разные версии Node.js. nvm позволяет переключаться мгновенно." },
            { id: "lab-2-5", text: "Выведи переменные окружения: env. Найди $PATH. Что это? Добавь временную переменную: export MY_VAR='hello'. Проверь: echo $MY_VAR.", hint: "$PATH — список директорий, где система ищет исполняемые файлы. Когда ты набираешь 'node', система ищет его в $PATH." }
          ],
          checkpoint: "Ты уверенно навигируешь по файловой системе без GUI, используешь pipes, знаешь зачем нужен $PATH и nvm."
        },
        {
          id: "step-3",
          title: "Как работает браузер",
          why: "Знание rendering pipeline — это то, что спрашивают на senior-собеседованиях. Но главное — это понимание, почему одни сайты тормозят, а другие летают. Ты не сможешь оптимизировать то, чего не понимаешь.",
          covers: ["Rendering pipeline", "Chrome DevTools", "Browser storage"],
          tasks: [
            { id: "lab-3-1", text: "Прочитай статью 'How browsers work' на web.dev. Нарисуй на бумаге (реально, от руки) пайплайн: HTML parsing → DOM → CSSOM → Render Tree → Layout → Paint → Composite. Для каждого этапа запиши одним предложением — что происходит.", hint: "Ключевой момент: DOM и CSSOM строятся параллельно, но render tree требует оба. JavaScript может блокировать parsing." },
            { id: "lab-3-2", text: "Открой любой сайт. DevTools → Performance → запиши 3 секунды. Найди в timeline этапы: Parse HTML, Recalculate Style, Layout, Paint, Composite. Какой этап занимает больше всего?", hint: "Жёлтый = JavaScript, фиолетовый = Layout/Style, зелёный = Paint, серый = другое." },
            { id: "lab-3-3", text: "Эксперимент с reflow/repaint: в Console напиши цикл который 1000 раз меняет element.style.width. Потом — который 1000 раз меняет element.style.opacity. Сравни производительность через Performance tab. Почему разница?", hint: "Изменение width вызывает Layout → Paint → Composite (reflow). Изменение opacity — только Composite (без reflow/repaint)." },
            { id: "lab-3-4", text: "DevTools → Application → Storage. Разберись: localStorage vs sessionStorage vs cookies vs IndexedDB. Запиши данные в каждое хранилище. В чём разница по объёму, сроку жизни, доступу из JS?", hint: "localStorage: ~5MB, бессрочно, синхронный. Cookies: ~4KB, можно задать expiry, отправляются с каждым HTTP-запросом. IndexedDB: гигабайты, асинхронный, для сложных данных." }
          ],
          checkpoint: "Можешь нарисовать рендеринг-пайплайн по памяти. Понимаешь разницу между reflow и repaint. Знаешь когда использовать какое хранилище."
        }
      ]
    },

    // ===== PHASE 2: ФУНДАМЕНТ ПРОЕКТА =====
    {
      id: "foundation",
      title: "Фундамент проекта",
      description: "Настрой проект как профессионал: монорепо, git, линтинг. Всё то, что отличает 'поделку' от production-ready проекта.",
      steps: [
        {
          id: "step-4",
          title: "Монорепо с pnpm",
          why: "В компаниях проекты часто живут в монорепо — один репозиторий для нескольких приложений. Это позволяет шарить код между React и Vue приложениями, использовать общие типы и утилиты. Turborepo ускоряет сборку через кеширование.",
          covers: ["Package managers", "Project structure", "Monorepo", ".env files"],
          tasks: [
            { id: "lab-4-1", text: "Установи pnpm (npm install -g pnpm). Инициализируй проект: pnpm init в корне mega-lab. Создай файл pnpm-workspace.yaml с описанием пакетов.", hint: "pnpm-workspace.yaml содержит: packages: ['packages/*']. Это говорит pnpm что все папки в packages/ — это workspace-пакеты." },
            { id: "lab-4-2", text: "Создай три пакета: packages/react-app, packages/vue-app, packages/shared. В каждом — свой package.json с name в формате @mega-lab/react-app и т.д.", hint: "Имена с @ scope помогают избежать конфликтов с npm-пакетами. В shared будут общие типы и утилиты." },
            { id: "lab-4-3", text: "Установи Turborepo: pnpm add -D turbo в корне. Создай turbo.json с pipeline: build, lint, test, dev. Добавь scripts в корневой package.json.", hint: "turbo.json pipeline определяет зависимости между задачами. build зависит от ^build (сначала shared, потом apps)." },
            { id: "lab-4-4", text: "Создай .env.example в корне с переменной API_URL=https://dummyjson.com. Создай .env.development и .env.production. Добавь .env* в .gitignore (кроме .env.example).", hint: "Никогда не коммить реальные .env файлы — только .env.example как документацию для команды." },
            { id: "lab-4-5", text: "Запусти pnpm install. Проверь: pnpm -r list показывает все 3 пакета? Попробуй pnpm --filter @mega-lab/shared build — что происходит?", hint: "Флаг --filter позволяет запускать команды только для конкретного пакета. Полезно для CI и разработки." }
          ],
          checkpoint: "pnpm install работает без ошибок, pnpm -r list показывает 3 пакета, turbo run build запускается (пусть пока пустой)."
        },
        {
          id: "step-5",
          title: "Git по-взрослому",
          why: "Git — это не просто 'сохранение'. Правильный git-workflow означает: понятную историю, безопасные эксперименты в ветках, автоматические проверки перед коммитом. В команде без этого — хаос.",
          covers: ["Git", "Branching strategies", "Conventional commits"],
          tasks: [
            { id: "lab-5-1", text: "Инициализируй git-репозиторий. Создай .gitignore с правильными правилами (node_modules, .env*, dist, .turbo, .next, .nuxt). Сделай первый коммит.", hint: "Используй gitignore.io или GitHub'овский шаблон для Node.js как основу." },
            { id: "lab-5-2", text: "Изучи Conventional Commits: feat:, fix:, chore:, docs:, refactor:, test:. Почему это важно? Установи commitlint + husky для автопроверки формата коммитов.", hint: "Conventional commits позволяют автоматически генерировать CHANGELOG и определять версию (semantic-release)." },
            { id: "lab-5-3", text: "Создай ветку feature/setup-shared. Сделай там несколько коммитов. Смерджь обратно в main. Теперь повтори, но через rebase. В чём разница? Когда что лучше?", hint: "merge создаёт merge-коммит (история видна). rebase 'перемещает' коммиты поверх main (линейная история). Оба подхода имеют сторонников." },
            { id: "lab-5-4", text: "Создай конфликт специально: измени одну строку в двух ветках по-разному, смерджь. Разреши конфликт вручную. Научись читать маркеры <<<<<<, ======, >>>>>>.", hint: "Конфликты — это нормально, не бойся их. Главное — понимать какую версию оставить и почему." }
          ],
          checkpoint: "Уверенно работаешь с ветками, разрешаешь конфликты, все коммиты в формате Conventional Commits."
        },
        {
          id: "step-6",
          title: "Линтинг и форматирование",
          why: "ESLint ловит ошибки до runtime. Prettier убирает споры о форматировании. Husky не даёт закоммитить плохой код. Вместе — автоматическое качество кода без усилий.",
          covers: ["ESLint", "Prettier", "Husky", "lint-staged", "EditorConfig"],
          tasks: [
            { id: "lab-6-1", text: "Настрой ESLint в новом flat config формате (eslint.config.js) с плагинами @typescript-eslint. Добавь правила: no-unused-vars (error), no-console (warn). Запусти — есть ошибки?", hint: "ESLint 9+ использует flat config вместо .eslintrc. Формат: export default [{ rules: {...} }]. Изучи документацию eslint.org." },
            { id: "lab-6-2", text: "Установи Prettier. Создай .prettierrc с настройками (semi, singleQuote, trailingComma, printWidth). Настрой eslint-config-prettier чтобы ESLint не конфликтовал с Prettier.", hint: "Правило: ESLint отвечает за логику кода, Prettier — только за форматирование. Не смешивай их задачи." },
            { id: "lab-6-3", text: "Настрой Husky + lint-staged: при коммите автоматически запускай ESLint и Prettier только на изменённых файлах. Проверь: попробуй закоммитить файл с ошибкой линтинга.", hint: "npx husky init, затем настрой .husky/pre-commit. lint-staged запускает линтеры только на staged файлах — быстро." },
            { id: "lab-6-4", text: "Создай .editorconfig (indent_style, indent_size, end_of_line, charset). Создай .nvmrc с версией Node.js. Создай .vscode/settings.json с настройками форматирования при сохранении.", hint: "EditorConfig работает во всех редакторах. .nvmrc — чтобы nvm use автоматически ставил нужную версию Node." }
          ],
          checkpoint: "При попытке закоммитить код с ошибками — коммит не проходит. Код автоматически форматируется. У всех в команде одинаковые настройки."
        },
        {
          id: "step-7",
          title: "Сборщики: как код превращается в сайт",
          why: "Сборщик берёт твой TypeScript, JSX, SCSS, картинки — и превращает в оптимизированные JS/CSS/HTML файлы для браузера. Понимание сборки = понимание почему 'import' работает и как ускорить dev-сервер.",
          covers: ["Vite", "Webpack basics", "esbuild/SWC", "Tree shaking", "Code splitting"],
          tasks: [
            { id: "lab-7-1", text: "Прочитай 'Why Vite' на vitejs.dev. Запиши: почему Vite быстрый в dev (ESM native), что использует для production (Rollup), что такое HMR. Сравни с Webpack подход.", hint: "Webpack: бандлит всё при старте → медленный dev server. Vite: отдаёт файлы по одному через ESM → мгновенный старт." },
            { id: "lab-7-2", text: "Найди любой open-source проект с webpack.config.js на GitHub. Прочитай конфиг: entry, output, module.rules (loaders), plugins. Запиши что делает каждая секция.", hint: "Loaders трансформируют файлы (babel-loader для JS, css-loader для CSS). Plugins делают всё остальное (HtmlWebpackPlugin, MiniCssExtractPlugin)." },
            { id: "lab-7-3", text: "Разберись в концепциях: tree shaking (удаление неиспользуемого кода), code splitting (разбивка на chunks), source maps (маппинг bundled → original код). Для каждого напиши: зачем нужно и как работает.", hint: "Tree shaking работает только с ESM (import/export), не с CommonJS (require). Это потому что ESM — статический, анализируется до выполнения." },
            { id: "lab-7-4", text: "Почитай про esbuild (Go) и SWC (Rust) — почему они в 10-100x быстрее webpack? Next.js использует SWC вместо Babel. Turbopack (Rust) заменяет Webpack в Next.js.", hint: "JavaScript-based tools (Webpack, Babel) ограничены скоростью JS. Go/Rust компилируются в нативный код и используют параллелизм." }
          ],
          checkpoint: "Можешь объяснить разницу между Vite и Webpack. Понимаешь tree shaking, code splitting, source maps. Знаешь почему Rust/Go сборщики быстрее."
        }
      ]
    },

    // ===== PHASE 3: TYPESCRIPT =====
    {
      id: "typescript",
      title: "TypeScript мастерство",
      description: "TypeScript — не 'типы поверх JS'. Это инструмент проектирования. Здесь ты создашь shared-пакет с типами для всего проекта.",
      steps: [
        {
          id: "step-8",
          title: "Типы для DummyJSON API",
          why: "Первый шаг к type-safe коду — описать то, с чем работаешь. Типы API — контракт между фронтом и бэком. Если API возвращает Product, ты точно знаешь какие поля доступны. Без типов — гадаешь и ловишь 'cannot read property of undefined'.",
          covers: ["Base types", "Interfaces vs Types", "Enums", "const assertions", "Strict mode", "tsconfig"],
          tasks: [
            { id: "lab-8-1", text: "Инициализируй packages/shared как TypeScript-пакет: tsconfig.json со strict: true, declaration: true, path aliases (@shared/*). Разберись что включает strict mode (noImplicitAny, strictNullChecks и т.д.).", hint: "strict: true = включает ВСЕ строгие проверки. Это больно сначала, но экономит часы дебага потом." },
            { id: "lab-8-2", text: "Опиши интерфейсы для ресурсов API: Product (id, title, description, price, thumbnail, category, rating, stock), User (id, firstName, lastName, email, image), Cart, AuthResponse (token, refreshToken, user). Используй interface.", hint: "Interface для объектов из API — стандартный подход. Позже можно extends для расширения." },
            { id: "lab-8-3", text: "Для категорий товаров используй as const вместо enum. Создай тип ProductCategory из массива категорий. Почему as const часто лучше enum?", hint: "const CATEGORIES = ['smartphones', 'laptops', ...] as const; type Category = typeof CATEGORIES[number]; — тип из значений массива. Enum генерирует лишний JS-код." },
            { id: "lab-8-4", text: "Опиши тип для API-ответа с пагинацией: { products: Product[], total: number, skip: number, limit: number }. Сделай его generic: PaginatedResponse<T> чтобы использовать и для users, и для products.", hint: "interface PaginatedResponse<T> { items: T[]; total: number; ... } — T заменится на Product или User при использовании." },
            { id: "lab-8-5", text: "Создай union type для API-ошибок: NetworkError | ValidationError | AuthError. Используй discriminated union с полем type. Напиши type guard функцию isAuthError().", hint: "type ApiError = { type: 'auth'; message: string } | { type: 'validation'; fields: string[] } | ... — discriminated union позволяет TypeScript сужать тип по полю type." }
          ],
          checkpoint: "shared пакет экспортирует типы Product, User, Cart, AuthResponse, PaginatedResponse<T>, ApiError. Всё компилируется без ошибок в strict mode."
        },
        {
          id: "step-9",
          title: "Type-safe API клиент",
          why: "Один API-клиент для всех запросов. Generic-функция, которая знает что вернёт сервер. Ты пишешь fetchProducts() — и TypeScript знает что это Product[]. Автокомплит, проверка типов, нулевые шансы на опечатку.",
          covers: ["Generics", "Utility types", "Type narrowing", "Declaration files"],
          tasks: [
            { id: "lab-9-1", text: "Напиши generic функцию apiClient<T>(endpoint, options): Promise<T>. Она должна: формировать URL, добавлять headers, обрабатывать ошибки, парсить JSON и возвращать типизированный результат.", hint: "async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> — T определяется при вызове: apiClient<Product>('/products/1')" },
            { id: "lab-9-2", text: "Используй Partial<Product> для типа данных при обновлении товара (PUT-запрос — не все поля обязательны). Pick<User, 'email' | 'firstName'> для формы профиля. Omit<Product, 'id' | 'rating'> для создания товара.", hint: "Utility types трансформируют существующие типы: Partial делает все поля optional, Pick выбирает нужные, Omit убирает ненужные." },
            { id: "lab-9-3", text: "Реализуй type narrowing в обработке ошибок: если response.ok = false, определи тип ошибки через status code (401 → AuthError, 422 → ValidationError, остальное → NetworkError). Используй type guard.", hint: "function isAuthError(error: ApiError): error is AuthError { return error.type === 'auth' } — type guard возвращает 'x is Type'." },
            { id: "lab-9-4", text: "Создай конкретные API-функции используя клиент: getProducts(params), getProduct(id), login(credentials), getCart(userId). Каждая уже типизирована — возвращает правильный тип.", hint: "export const getProducts = (params: ProductsParams) => apiClient<PaginatedResponse<Product>>(`/products?${qs(params)}`)" },
            { id: "lab-9-5", text: "Используй ReturnType<typeof getProducts> чтобы получить тип возвращаемого значения. Создай тип ProductsResponse без дублирования. Когда это полезно?", hint: "ReturnType извлекает тип из функции: type Result = Awaited<ReturnType<typeof getProducts>> = PaginatedResponse<Product>. Полезно когда функция — source of truth для типа." }
          ],
          checkpoint: "API клиент полностью типизирован. Автокомплит работает: getProducts() → PaginatedResponse<Product>. Ошибки обрабатываются type-safe."
        },
        {
          id: "step-10",
          title: "Продвинутые типы",
          why: "Conditional types, mapped types, template literals — это уже продвинутый TypeScript. Не для каждого дня, но для библиотек, сложных форм и серьёзных проектов — must have. Плюс это любимая тема на собеседованиях.",
          covers: ["Conditional types", "infer", "Mapped types", "Template literal types"],
          tasks: [
            { id: "lab-10-1", text: "Создай conditional type: ApiResponse<T> — если T extends Array, возвращает PaginatedResponse<T[number]>, иначе просто T. Используй для типизации разных эндпоинтов.", hint: "type ApiResponse<T> = T extends Array<infer U> ? PaginatedResponse<U> : T — infer извлекает тип элемента массива." },
            { id: "lab-10-2", text: "Создай mapped type для формы: FormFields<T> — берёт интерфейс и для каждого поля создаёт { value: T[K], error: string | null, touched: boolean }. Применяй к типу User.", hint: "type FormFields<T> = { [K in keyof T]: { value: T[K]; error: string | null; touched: boolean } }" },
            { id: "lab-10-3", text: "Создай template literal type для API путей: type ApiPath = `/products/${number}` | `/users/${number}` | '/auth/login'. Как это помогает типизировать роутер?", hint: "Template literal types позволяют описать паттерн строки: type Path = `/${string}/${number}` — только строки в таком формате пройдут проверку." },
            { id: "lab-10-4", text: "Зайди на github.com/type-challenges/type-challenges. Реши 5 задач уровня easy и 3 уровня medium. Для каждой запиши: какой приём использовала.", hint: "Начни с: Pick, Readonly, First of Array, Length of Tuple, Exclude. Это практика 'думать на типах'." }
          ],
          checkpoint: "Написала conditional type, mapped type, template literal type. Решила 8 type challenges. Понимаешь infer и keyof."
        }
      ]
    },

    // ===== PHASE 4: JAVASCRIPT =====
    {
      id: "javascript",
      title: "JavaScript глубоко",
      description: "Не просто 'знаю синтаксис', а понимаю КАК работает. Напишешь утилиты своими руками — и навсегда поймёшь замыкания, this, Event Loop.",
      steps: [
        {
          id: "step-11",
          title: "Event Loop, замыкания и this",
          why: "Три кита JS, которые спрашивают на КАЖДОМ собеседовании. Но главное — без них ты не поймёшь почему setTimeout ведёт себя 'странно', почему React-хуки работают именно так, и почему 'this' в callback — undefined.",
          covers: ["Event Loop", "Closures", "this context", "Prototypes"],
          tasks: [
            { id: "lab-11-1", text: "Напиши код который демонстрирует порядок Event Loop: console.log, setTimeout(0), Promise.resolve().then(), queueMicrotask(). Предскажи порядок ДО запуска. Запусти — угадала?", hint: "Порядок: синхронный код → microtasks (Promise, queueMicrotask) → macrotasks (setTimeout, setInterval). Microtasks всегда раньше." },
            { id: "lab-11-2", text: "Реализуй функцию createCounter() которая возвращает объект с методами increment(), decrement(), getCount(). Используй замыкание — count не должен быть доступен снаружи напрямую.", hint: "Замыкание: функция 'запоминает' переменные из своего лексического окружения. count живёт в scope createCounter, но доступен из возвращённых функций." },
            { id: "lab-11-3", text: "Напиши debounce(fn, delay) с нуля. Используй замыкание для хранения timeoutId. Протестируй: быстро вызови 10 раз — функция должна сработать один раз. Потом напиши throttle(fn, delay) — в чём разница?", hint: "debounce: ждёт паузу (для поиска). throttle: вызывается максимум раз в N мс (для scroll). Оба используют замыкание для хранения состояния между вызовами." },
            { id: "lab-11-4", text: "Разберись с this: создай объект с методом, вызови метод отдельно (const fn = obj.method; fn()). Что с this? Исправь через bind. Потом — через стрелочную функцию. Напиши свою реализацию Function.prototype.myBind().", hint: "4 правила this: 1) default (window/undefined), 2) implicit (obj.method → this=obj), 3) explicit (bind/call/apply), 4) new. Стрелочная функция берёт this из лексического scope." },
            { id: "lab-11-5", text: "Создай простую цепочку прототипов: Animal → Dog → myDog. Используй Object.create (не class). Добавь метод speak() в Animal.prototype. Проверь: myDog.speak() работает? Как JS находит метод?", hint: "JS ищет свойство в объекте → если нет, идёт в __proto__ → и так до null. class — синтаксический сахар над этим механизмом." }
          ],
          checkpoint: "Можешь предсказать порядок Event Loop. Написала debounce/throttle. Понимаешь 4 правила this. Можешь объяснить прототипную цепочку."
        },
        {
          id: "step-12",
          title: "Современный JS и паттерны",
          why: "Proxy (основа Vue 3 реактивности), WeakMap (предотвращение утечек памяти), Map/Set (быстрый поиск), Modules (основа любого проекта) — это не 'продвинутые фичи', это ежедневные инструменты.",
          covers: ["Modules ESM/CJS", "Proxy/Reflect", "Map/Set/WeakMap/WeakSet", "Iterators/Generators", "Async patterns", "Error handling"],
          tasks: [
            { id: "lab-12-1", text: "В shared-пакете используй ESM (import/export). Попробуй подключить CommonJS-библиотеку. В чём проблема? Что такое 'dual package' и как решить?", hint: "ESM: import/export (статический, tree-shakeable). CJS: require/module.exports (динамический). Нельзя require() ESM-модуль. В package.json: 'type': 'module'." },
            { id: "lab-12-2", text: "Напиши EventEmitter своими руками: on(event, handler), off(event, handler), emit(event, ...args). Используй Map<string, Set<Function>>. Это паттерн Observer — основа работы DOM-событий.", hint: "Map лучше обычного объекта: ключи могут быть любого типа, .size, .has(), .delete(). Set гарантирует уникальность обработчиков." },
            { id: "lab-12-3", text: "Создай Proxy который валидирует данные при записи: proxy.age = -5 → throw Error. proxy.name = '' → throw Error. Как Vue 3 использует Proxy для реактивности?", hint: "new Proxy(target, { set(target, prop, value) { if (prop === 'age' && value < 0) throw...; target[prop] = value; return true; } }). Vue: при set — trigger обновление компонента." },
            { id: "lab-12-4", text: "Реализуй кеш API-ответов на WeakMap. Ключ — объект параметров запроса, значение — результат. Почему WeakMap, а не Map? Что будет если ключ больше не используется?", hint: "WeakMap: ключи — только объекты, не предотвращает garbage collection. Если объект-ключ удалён — запись автоматически удаляется. Map хранит ссылки → утечка памяти." },
            { id: "lab-12-5", text: "Напиши async-утилиту retry(fn, attempts, delay): вызывает fn, при ошибке ждёт delay и пробует снова, максимум attempts раз. Используй async/await + цикл. Обработай все edge cases.", hint: "async function retry<T>(fn: () => Promise<T>, attempts: number, delay: number): Promise<T>. Используй for-цикл и try/catch внутри, await new Promise(r => setTimeout(r, delay)) для паузы." },
            { id: "lab-12-6", text: "Настрой глобальную обработку ошибок: window.addEventListener('unhandledrejection', ...) и window.onerror. Логируй ошибки в console.error с контекстом. Зачем это в production?", hint: "В production необработанные ошибки молча ломают приложение. Глобальные обработчики — последняя линия обороны. Обычно отправляют ошибки в Sentry/Datadog." }
          ],
          checkpoint: "Написала EventEmitter, Proxy-валидатор, retry-утилиту. Понимаешь разницу ESM/CJS. Знаешь когда WeakMap vs Map."
        }
      ]
    },

    // ===== PHASE 5: REACT =====
    {
      id: "react",
      title: "React приложение",
      description: "Строишь полноценный e-commerce на React: авторизация, каталог, корзина. Каждая страница — новые концепции.",
      steps: [
        {
          id: "step-13",
          title: "Каркас React-приложения",
          why: "Правильная структура в начале экономит недели рефакторинга потом. Роутинг, layout, разделение на features — это скелет, на который нанизывается всё остальное.",
          covers: ["JSX", "Components", "Props", "Children", "React Router"],
          tasks: [
            { id: "lab-13-1", text: "Создай React-приложение в packages/react-app через Vite (pnpm create vite). Выбери React + TypeScript. Убедись что shared-пакет подключён как dependency.", hint: "В package.json react-app: '@mega-lab/shared': 'workspace:*' — workspace: протокол ссылается на локальный пакет." },
            { id: "lab-13-2", text: "Организуй структуру: src/pages/ (LoginPage, CatalogPage, ProductPage, CartPage, ProfilePage), src/components/ (общие), src/hooks/, src/api/, src/store/. Почему feature-based лучше?", hint: "Feature-based: всё для фичи в одной папке (компонент, хуки, стили, тесты). Легче навигировать и удалять целые фичи." },
            { id: "lab-13-3", text: "Установи React Router v6. Создай роутинг: / → каталог, /product/:id → товар, /cart → корзина, /profile → профиль, /login → логин. Добавь Layout с Header и Footer.", hint: "createBrowserRouter + RouterProvider — новый подход в React Router 6.4+. Layout через Outlet в родительском роуте." },
            { id: "lab-13-4", text: "В Header покажи: лого, навигацию, кнопку корзины (с количеством товаров), аватар пользователя (или 'Войти'). Используй props и children для переиспользуемых компонентов (Button, Badge).", hint: "Создай <Button variant='primary' | 'ghost' size='sm' | 'md'>. children — то, что между тегами. Composition > наследование." },
            { id: "lab-13-5", text: "Создай компонент ProtectedRoute: если пользователь не авторизован — редирект на /login. Используй Outlet для вложенных роутов. Пока можно захардкодить isAuth = false.", hint: "ProtectedRoute оборачивает приватные роуты. Если !isAuth → <Navigate to='/login' replace />. Позже заменишь на реальную проверку." }
          ],
          checkpoint: "Приложение запускается, роутинг работает, все страницы-заглушки рендерятся. Layout с Header/Footer на всех страницах."
        },
        {
          id: "step-14",
          title: "Авторизация",
          why: "Формы + валидация + JWT + protected routes — это 80% того, что делает фронтендер в CRM/B2B. Этот шаг закрывает сразу несколько ключевых тем роадмапа. Плюс DummyJSON имеет реальный /auth/login — можно проверить всё на практике.",
          covers: ["Forms", "React Hook Form", "Zod validation", "Context API", "Custom Hooks", "Controlled vs Uncontrolled"],
          tasks: [
            { id: "lab-14-1", text: "Создай форму логина с React Hook Form: username и password поля. Добавь валидацию через Zod (или Yup): username обязателен, password минимум 6 символов. Покажи ошибки валидации.", hint: "const schema = z.object({ username: z.string().min(1), password: z.string().min(6) }). useForm({ resolver: zodResolver(schema) }). Zod + RHF — стандартная связка." },
            { id: "lab-14-2", text: "При submit отправь POST /auth/login. Покажи loading состояние. При ошибке — покажи серверную ошибку. При успехе — сохрани токен и перенаправь на /.", hint: "Не сохраняй токен в localStorage напрямую. Сначала — через Context. Позже поймёшь почему httpOnly cookies безопаснее (но DummyJSON не поддерживает)." },
            { id: "lab-14-3", text: "Создай AuthContext: { user, token, login(), logout(), isAuthenticated }. Оберни приложение в AuthProvider. Используй useContext для доступа к данным авторизации.", hint: "Context = глобальные данные без prop drilling. Но не злоупотребляй: Context для auth, theme, locale — ОК. Для состояния списков — нет (перерисовка всего дерева)." },
            { id: "lab-14-4", text: "Создай custom hook useAuth(): возвращает { user, login, logout, isLoading, isAuthenticated }. Инкапсулирует всю логику авторизации. Используй его в Header, ProtectedRoute, LoginPage.", hint: "Custom hook = функция начинающаяся с use. Может использовать другие hooks. Инкапсулирует логику — компонент не знает деталей реализации." },
            { id: "lab-14-5", text: "Обнови ProtectedRoute: используй useAuth(). При загрузке — покажи скелетон/спиннер. При /auth/me запросе проверяй валидность токена при обновлении страницы.", hint: "При обновлении страницы токен из Context пропадает. Сохрани в localStorage, при старте — проверь через GET /auth/me." }
          ],
          checkpoint: "Полный цикл авторизации работает: логин → сохранение токена → доступ к приватным страницам → logout. Форма валидируется. При обновлении страницы — сессия сохраняется."
        },
        {
          id: "step-15",
          title: "Каталог товаров",
          why: "Каталог — это сердце e-commerce. Здесь ты научишься работать с серверным стейтом (TanStack Query), пагинацией, поиском с debounce, фильтрами. Это паттерны которые используются в 90% приложений.",
          covers: ["TanStack Query", "Custom Hooks", "Server state", "Caching"],
          tasks: [
            { id: "lab-15-1", text: "Установи TanStack Query. Настрой QueryClientProvider. Создай хук useProducts(params) с useQuery: запрос GET /products с пагинацией (limit, skip). Покажи loading, error, data состояния.", hint: "useQuery({ queryKey: ['products', params], queryFn: () => getProducts(params) }). queryKey = ключ кеша. При изменении params — автоматический рефетч." },
            { id: "lab-15-2", text: "Добавь поиск: input с debounce (300ms). При вводе — GET /products/search?q=term. Используй свой debounce или useDeferredValue. Отрази search query в URL.", hint: "Используй useSearchParams() из React Router для синхронизации фильтров с URL. Пользователь может скопировать ссылку с фильтрами." },
            { id: "lab-15-3", text: "Добавь фильтр по категориям: загрузи категории через GET /products/categories. Сделай выпадающий список или чипсы. При выборе — GET /products/category/{category}.", hint: "Отдельный useQuery для категорий — staleTime: Infinity (категории не меняются часто). Это пример настройки кеширования." },
            { id: "lab-15-4", text: "Реализуй пагинацию: кнопки 'Назад/Вперёд' + номера страниц. Или infinite scroll с useInfiniteQuery. Выбери подход и объясни почему.", hint: "Пагинация: пользователь контролирует, можно поделиться ссылкой на страницу 5. Infinite scroll: лучше UX для mobile, сложнее реализация. useInfiniteQuery из TanStack Query упрощает." },
            { id: "lab-15-5", text: "Создай компонент ProductCard: thumbnail, title, price, rating, кнопка 'В корзину'. Используй composition: <Card>, <Card.Image>, <Card.Body>, <Card.Footer>.", hint: "Compound Components pattern: <Card> + <Card.Image> + ... Компонент гибкий, переиспользуемый, кастомизируемый. Используй React.Children или Context внутри Card." }
          ],
          checkpoint: "Каталог показывает товары с пагинацией. Поиск с debounce работает. Фильтры по категориям. Данные кешируются — повторные запросы мгновенные."
        },
        {
          id: "step-16",
          title: "Корзина и State Management",
          why: "Корзина — идеальный пример для изучения state management. Состояние шарится между страницами (каталог, корзина, header). Zustand — простой, мощный, без boilerplate (в отличие от Redux).",
          covers: ["Zustand", "State management", "localStorage persistence", "Redux Toolkit", "Jotai"],
          tasks: [
            { id: "lab-16-1", text: "Установи Zustand. Создай cartStore: { items, addItem(product), removeItem(id), updateQuantity(id, qty), clearCart(), totalItems, totalPrice }. Используй типизацию из shared.", hint: "const useCartStore = create<CartState>((set, get) => ({ items: [], addItem: (product) => set(state => ({ items: [...state.items, ...] })) })). Zustand — минималистичен и без провайдеров." },
            { id: "lab-16-2", text: "Добавь persist middleware — корзина сохраняется в localStorage и восстанавливается при обновлении. Проверь: добавь товар, обнови страницу — товар на месте.", hint: "import { persist } from 'zustand/middleware'. create(persist(..., { name: 'cart-storage' })). Zustand middleware — мощный паттерн." },
            { id: "lab-16-3", text: "Создай страницу CartPage: список товаров с картинками, изменение количества (+/-), удаление, итоговая сумма. Кнопка 'Оформить заказ' (пока mock).", hint: "Используй useCartStore(state => state.items) — Zustand автоматически перерисовывает только при изменении выбранного slice. Это лучше чем Context." },
            { id: "lab-16-4", text: "Обнови Header: покажи Badge с количеством товаров из cartStore. Обнови ProductCard: кнопка 'В корзину' / 'В корзине (N)'. Это тот же store — разные компоненты.", hint: "const totalItems = useCartStore(state => state.totalItems) — selector. Компонент подписан только на totalItems, не на весь store." },
            { id: "lab-16-5", text: "Прочитай: чем Zustand отличается от Redux Toolkit и Jotai. Когда что выбрать? Запиши для себя критерии выбора.", hint: "Zustand: простой, один store, мало boilerplate. Redux Toolkit: для сложных приложений, DevTools, middleware. Jotai: атомарный (каждый кусок стейта — отдельный atom)." }
          ],
          checkpoint: "Корзина работает: добавление/удаление/изменение количества. Persist в localStorage. Badge в Header обновляется. Знаешь когда использовать Zustand/Redux/Jotai."
        },
        {
          id: "step-17",
          title: "React паттерны и оптимизация",
          why: "HOC, Render Props, Composition — паттерны которые встречаются в каждой кодовой базе. Мемоизация — вопрос с подвохом на собеседованиях ('когда useMemo вреден?'). Этот шаг — про 'думать по-реактовски'.",
          covers: ["Composition", "Render Props", "HOC", "Custom Hooks", "React.memo", "useMemo", "useCallback", "useRef"],
          tasks: [
            { id: "lab-17-1", text: "Создай HOC withAuth(Component): оборачивает компонент, проверяет авторизацию, редиректит на /login если нет. Когда HOC уместен, а когда лучше hook?", hint: "HOC: оборачивает компонент, добавляя поведение. withAuth(ProfilePage). Минус: 'wrapper hell', сложно дебажить. Custom hooks обычно лучше, но HOC всё ещё используется в legacy." },
            { id: "lab-17-2", text: "Реализуй Render Props: <DataFetcher url='/products' render={(data, loading) => ...} />. Компонент загружает данные и передаёт их через render-prop. Сравни с custom hook — что удобнее?", hint: "Render Props — паттерн до hooks. Компонент принимает функцию (render или children) и вызывает её с данными. Custom hooks заменили этот паттерн почти полностью, но знать нужно — много legacy кода." },
            { id: "lab-17-3", text: "Используй React.memo для ProductCard. Добавь console.log в рендер. Измени фильтры — карточки, которые не изменились, не должны ререндериться. Проверь через React DevTools Profiler.", hint: "React.memo: shallow сравнивает props. Если props не изменились — компонент не ререндерится. Но если передаёшь объект/функцию как prop — ссылка каждый раз новая → memo бесполезен." },
            { id: "lab-17-4", text: "Исправь проблему из шага 3: useCallback для обработчика addToCart, useMemo для отфильтрованного списка продуктов. Но сначала ответь: в каких случаях useMemo/useCallback делают ХУЖЕ?", hint: "useMemo/useCallback имеют overhead: сравнение deps, хранение в памяти. Если компонент лёгкий и рендерится быстро — мемоизация замедляет. Правило: сначала измерь проблему, потом оптимизируй." },
            { id: "lab-17-5", text: "Используй useRef для: 1) фокус на input поиска при загрузке страницы, 2) хранение предыдущего значения поиска (без ререндера), 3) хранение interval ID для таймера.", hint: "useRef хранит мутабельное значение между рендерами БЕЗ вызова ререндера. Два применения: доступ к DOM (.current = HTMLElement) и хранение переменных (предыдущие значения, ID таймеров)." }
          ],
          checkpoint: "Используешь React.memo/useMemo/useCallback осознанно (а не везде). Знаешь HOC, Render Props, Composition. Умеешь объяснить когда мемоизация вредна."
        },
        {
          id: "step-18",
          title: "Next.js и SSR",
          why: "Next.js — стандарт для production React-приложений. SSR, SSG, Server Components — это то, что отличает 'React-разработчика' от 'Junior который знает useState'. Много вакансий требуют Next.js.",
          covers: ["Next.js", "SSR/SSG", "App Router", "Server Components", "UI Libraries"],
          tasks: [
            { id: "lab-18-1", text: "Создай Next.js-приложение (npx create-next-app с App Router и TypeScript). Перенеси страницу каталога. Структура: app/page.tsx (главная), app/products/[id]/page.tsx (товар).", hint: "App Router: папки = роуты. app/products/[id]/page.tsx = /products/123. layout.tsx в папке = layout для всех страниц внутри." },
            { id: "lab-18-2", text: "Сделай страницу каталога Server Component: загрузи товары прямо на сервере (async function + fetch). Что даёт SSR? Как отличается от CSR (клиентский рендер)?", hint: "Server Component: выполняется на сервере, отдаёт HTML. Плюсы: SEO, быстрая первая загрузка. Минусы: нет useState, onClick. Для интерактивности — 'use client'." },
            { id: "lab-18-3", text: "Страницу товара сделай через generateStaticParams + SSG: предгенерируй HTML для первых 10 товаров при сборке. Что будет для товара #11 — fallback?", hint: "SSG: HTML генерируется при build. Идеально для контента который редко меняется. dynamicParams: true — товары не в списке генерируются при первом запросе." },
            { id: "lab-18-4", text: "Добавь loading.tsx (скелетон при загрузке) и error.tsx (обработка ошибок) в каждую папку роутов. Как это работает под капотом (Suspense и Error Boundaries)?", hint: "loading.tsx автоматически оборачивает page.tsx в <Suspense fallback={loading}>. error.tsx — в Error Boundary. Next.js делает это за тебя." },
            { id: "lab-18-5", text: "Установи shadcn/ui (или Radix UI). Замени свои кнопки, инпуты, карточки на компоненты из библиотеки. В чём преимущество shadcn перед Material UI?", hint: "shadcn/ui: копирует код компонентов в твой проект → полный контроль, можно кастомизировать. Material UI: npm-пакет → зависимость, сложнее кастомизировать, больше bundle size." }
          ],
          checkpoint: "Next.js приложение работает: SSR для каталога, SSG для страницы товара. Понимаешь разницу Server/Client Components. Используешь shadcn/ui."
        }
      ]
    },

    // ===== PHASE 6: CSS =====
    {
      id: "css",
      title: "CSS мастерство",
      description: "Не 'подвинь кнопку вправо', а уверенная вёрстка: responsive, темы, анимации. Всё на практике — стилизуешь своё приложение.",
      steps: [
        {
          id: "step-19",
          title: "Tailwind + Layout",
          why: "Tailwind — спорный инструмент, но он есть в 40%+ вакансий. Flexbox и Grid — база для любого layout. Научишься думать о layout как о системе, а не 'подогнать margin-top пока не встанет'.",
          covers: ["Tailwind CSS", "Flexbox", "CSS Grid", "Responsive design"],
          tasks: [
            { id: "lab-19-1", text: "Установи Tailwind в React-приложение. Сверстай Header: лого слева, навигация по центру (Flexbox), корзина и профиль справа. Используй только Tailwind-классы.", hint: "flex items-center justify-between — основа Header. gap-4 для отступов между элементами. Tailwind: className='flex items-center gap-4 px-6 py-4 bg-white shadow'." },
            { id: "lab-19-2", text: "Каталог: CSS Grid для сетки карточек. 4 колонки на desktop, 2 на планшете, 1 на mobile. Используй grid-cols-* и responsive prefixes (md:, lg:).", hint: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6. Tailwind responsive: без префикса = mobile, md: = 768px+, lg: = 1024px+. Mobile-first!" },
            { id: "lab-19-3", text: "Sidebar фильтров: Flexbox для вертикального списка, sticky позиционирование, скролл при длинном контенте. На mobile — выезжающая панель (drawer).", hint: "sticky top-20 — сайдбар прилипает при скролле. На mobile: fixed inset-y-0 + transform translate-x для анимации." },
            { id: "lab-19-4", text: "Сверстай ProductPage: слева — большая картинка (Grid), справа — описание, цена, кнопки (Flexbox). На mobile — всё в одну колонку. Используй clamp() для fluid typography.", hint: "Grid: grid-cols-1 lg:grid-cols-2 для layout. clamp(1rem, 2vw, 1.5rem) для размера текста — адаптивный без media queries." }
          ],
          checkpoint: "Все страницы свёрстаны с Tailwind. Layout адаптивный на всех экранах. Используешь Grid для сеток и Flexbox для выравнивания."
        },
        {
          id: "step-20",
          title: "Темы и CSS-архитектура",
          why: "Тёмная тема — не просто 'инвертировать цвета'. Это система CSS Custom Properties, которая переключается одним атрибутом. А BEM и SCSS — инструменты для Vue-приложения в следующей фазе.",
          covers: ["CSS Custom Properties", "Dark/Light theme", "SCSS/Sass", "BEM", "CSS Modules", "Methodologies"],
          tasks: [
            { id: "lab-20-1", text: "Создай систему CSS Custom Properties: --color-bg, --color-text, --color-primary, --color-border, --radius, --shadow. В :root — light тема, в [data-theme='dark'] — dark. Переключи через JS.", hint: "document.documentElement.setAttribute('data-theme', 'dark'). Все компоненты автоматически перекрасятся — потому что используют var(--color-bg) вместо #ffffff." },
            { id: "lab-20-2", text: "Добавь переключатель темы в Settings. Сохрани выбор в localStorage. При загрузке — применяй сохранённую тему. Учитывай prefers-color-scheme.", hint: "window.matchMedia('(prefers-color-scheme: dark)').matches — определяет системную тему. Приоритет: сохранённая > системная > default." },
            { id: "lab-20-3", text: "Изучи BEM: блок__элемент--модификатор. Напиши стили для ProductCard по BEM: .product-card, .product-card__image, .product-card__title, .product-card--highlighted. Когда BEM лучше Tailwind?", hint: "BEM даёт семантичные классы и предсказуемую структуру. Хорош для Vue (scoped styles). Tailwind — для скорости и utility-first подхода в React. Оба подхода валидны." },
            { id: "lab-20-4", text: "Попробуй CSS Modules: ProductCard.module.css. Import как styles. Как это решает проблему глобальных стилей? Сравни с BEM и Tailwind.", hint: "CSS Modules генерируют уникальные классы: .title → .ProductCard_title_a1b2c. Нет конфликтов имён. Работают из коробки в Vite и Next.js." }
          ],
          checkpoint: "Темная/светлая тема работает через CSS Variables. Знаешь BEM, CSS Modules, Tailwind — понимаешь когда что использовать."
        },
        {
          id: "step-21",
          title: "Анимации и transitions",
          why: "Хорошие анимации делают интерфейс приятным, плохие — раздражающим. Ключ: анимировать только transform и opacity (60fps). Всё остальное вызывает reflow и тормозит.",
          covers: ["Transitions", "Keyframes", "Transform", "will-change", "FLIP"],
          tasks: [
            { id: "lab-21-1", text: "Добавь hover-анимации: карточка товара поднимается (translateY + shadow). Кнопка 'В корзину' меняет цвет и масштаб. Используй transition, не animation.", hint: "transition: transform 0.2s ease, box-shadow 0.2s ease. transform: translateY(-4px). transition для простых A→B переходов, animation для сложных." },
            { id: "lab-21-2", text: "Создай loading spinner через @keyframes: вращающийся круг. Потом — скелетон-загрузку для карточки товара (пульсирующие серые блоки).", hint: "@keyframes spin { to { transform: rotate(360deg) } }. Скелетон: @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }." },
            { id: "lab-21-3", text: "Анимируй появление карточек при загрузке: поочерёдное появление с задержкой (staggered animation). Используй animation-delay или CSS :nth-child.", hint: ".card:nth-child(1) { animation-delay: 0.05s } .card:nth-child(2) { animation-delay: 0.1s }... Или через JS: style={{ animationDelay: `${index * 50}ms` }}." },
            { id: "lab-21-4", text: "Изучи FLIP-технику: First, Last, Invert, Play. Применяй при фильтрации товаров — карточки плавно перестраиваются в новые позиции вместо резкого переключения.", hint: "FLIP: запомни позицию ДО изменения (First), отрисуй ПОСЛЕ (Last), примени transform чтобы вернуть в старую позицию (Invert), анимируй обратно (Play). Или используй библиотеку auto-animate." },
            { id: "lab-21-5", text: "Проверь производительность: DevTools → Performance. Анимация transform/opacity — зелёный (Composite). Анимация width/top — фиолетовый (Layout). Добавь will-change: transform для тяжёлых анимаций. Когда will-change вредит?", hint: "will-change создаёт отдельный compositing layer → GPU-ускорение. Но каждый layer = память. Не ставь will-change на всё подряд. Используй только для элементов, которые реально будут анимироваться." }
          ],
          checkpoint: "Приложение красиво анимировано: hover, loading, появление карточек. Все анимации — через transform/opacity. Понимаешь FLIP и will-change."
        }
      ]
    },

    // ===== PHASE 7: VUE 3 =====
    {
      id: "vue",
      title: "Vue 3 — зеркальное приложение",
      description: "Построй то же приложение на Vue 3 + Nuxt 3. Сравни подходы: React vs Vue. Это углубит понимание обоих фреймворков и даст уникальное преимущество.",
      steps: [
        {
          id: "step-22",
          title: "Nuxt 3 каркас",
          why: "Nuxt 3 для Vue — как Next.js для React. File-based routing, auto-imports, SSR из коробки. У тебя уже есть опыт с Vue — Nuxt добавит production-level возможности.",
          covers: ["Nuxt 3", "File-based routing", "Auto-imports"],
          tasks: [
            { id: "lab-22-1", text: "Создай Nuxt 3 приложение в packages/vue-app (npx nuxi init). Подключи shared-пакет. Создай pages/ : index.vue, products/[id].vue, cart.vue, login.vue, profile.vue.", hint: "В Nuxt pages/ = роуты автоматически. [id].vue = динамический роут. Не нужно руками писать роутинг — Nuxt генерирует из файловой структуры." },
            { id: "lab-22-2", text: "Создай layouts/default.vue с Header и Footer. Добавь layouts/auth.vue (без Header) для LoginPage. Как переключать layouts?", hint: "definePageMeta({ layout: 'auth' }) в страницe login.vue. Nuxt автоматически применит нужный layout." },
            { id: "lab-22-3", text: "Изучи auto-imports в Nuxt: ref, computed, useRoute — доступны без import. Где это удобно? Где может запутать?", hint: "Nuxt автоматически импортирует composables из Vue, из папки composables/ и utils/. Удобно — меньше boilerplate. Опасно — непонятно откуда берётся функция." },
            { id: "lab-22-4", text: "Настрой middleware для авторизации: middleware/auth.ts — проверяет токен, редиректит на /login. Примени к нужным страницам через definePageMeta.", hint: "definePageMeta({ middleware: 'auth' }). Middleware в Nuxt — аналог navigation guards в Vue Router, но интегрирован с file-based routing." }
          ],
          checkpoint: "Nuxt 3 приложение работает: file-based routing, layouts, middleware. Все страницы-заглушки рендерятся."
        },
        {
          id: "step-23",
          title: "Composition API + Pinia",
          why: "Composition API — стандарт Vue 3. Если ты ещё пишешь на Options API — пора переходить. Pinia заменил Vuex, он проще и типизированнее. Понимание реактивности Vue на уровне Proxy — это senior-level знание.",
          covers: ["Composition API", "Reactivity system", "Pinia", "ref/reactive/computed/watch"],
          tasks: [
            { id: "lab-23-1", text: "Реализуй LoginPage на Composition API: ref для полей формы, computed для валидации, watch для отслеживания изменений. Сравни с тем как было бы на Options API.", hint: "const username = ref(''); const isValid = computed(() => username.value.length > 0). В Options API это были бы data() и computed: {}. Composition API лучше переиспользуется и типизируется." },
            { id: "lab-23-2", text: "Разберись как работает реактивность Vue 3 под капотом: Proxy перехватывает get (track) и set (trigger). Создай свой простейший reactive() с Proxy. Почему ref() нужен для примитивов?", hint: "Proxy может перехватывать обращения к свойствам объекта. Но примитив (number, string) — не объект → нельзя обернуть в Proxy → ref создаёт объект { value: ... }." },
            { id: "lab-23-3", text: "Создай Pinia store: useAuthStore (user, token, login, logout) и useCartStore (items, addItem, removeItem, totalPrice). Сравни API с Zustand.", hint: "defineStore('auth', () => { const user = ref(null); function login(credentials) {...}; return { user, login } }). Setup store (Composition API syntax) или Options store — выбери и объясни почему." },
            { id: "lab-23-4", text: "Добавь Pinia plugin для persist: сохраняй cartStore в localStorage. Используй pinia-plugin-persistedstate или напиши свой. Как работают Pinia plugins?", hint: "Pinia plugins получают доступ к store и могут добавлять state, actions, подписываться на изменения. Plugin: (context) => { context.store.$subscribe((mutation, state) => localStorage.setItem(...)) }." }
          ],
          checkpoint: "Auth и Cart реализованы на Pinia. Реактивность работает через Composition API. Можешь объяснить как Proxy делает реактивность."
        },
        {
          id: "step-24",
          title: "Composables и VueUse",
          why: "Composables — аналог Custom Hooks в React. Это главный паттерн переиспользования логики в Vue 3. VueUse — коллекция 200+ готовых composables, ускоряющая разработку.",
          covers: ["Composables", "VueUse", "Vue Test Utils"],
          tasks: [
            { id: "lab-24-1", text: "Создай composable useProducts(params): возвращает { products, isLoading, error, refetch }. Используй ref, watch, onMounted. Это аналог useQuery — но своими руками.", hint: "export function useProducts(params: Ref<ProductsParams>) { const products = ref([]); const isLoading = ref(false); watch(params, fetchProducts, { immediate: true }); ... }." },
            { id: "lab-24-2", text: "Создай useDebounce(value, delay): возвращает дебаунсированное значение. Используй в поиске товаров. Это composable можно переиспользовать в любом месте.", hint: "Внутри: watchEffect или watch на value, setTimeout, cleanup через onUnmounted. Возвращает ref с дебаунсированным значением." },
            { id: "lab-24-3", text: "Установи VueUse. Используй: useLocalStorage (для темы), useDark (переключение темы), useIntersectionObserver (ленивая загрузка), useInfiniteScroll (бесконечная прокрутка).", hint: "const isDark = useDark(); const toggleDark = useToggle(isDark); — две строки и тёмная тема работает. VueUse экономит часы." },
            { id: "lab-24-4", text: "Реализуй страницы каталога и корзины на Vue, используя composables и Pinia stores. Сравни: количество кода React vs Vue. Какие подходы лучше в каком фреймворке?", hint: "Vue: реактивность 'из коробки' (ref автоматически реактивен). React: нужен useState + useEffect. Vue обычно лаконичнее, React — явнее. Оба подхода валидны." }
          ],
          checkpoint: "Все страницы работают на Vue + Composables + Pinia. Используешь VueUse. Можешь сравнить подходы React vs Vue с примерами."
        },
        {
          id: "step-25",
          title: "Vue Router и SCSS",
          why: "Navigation guards — как ты защищаешь приватные маршруты. SCSS + BEM — классическая связка для Vue-проектов (Vue's scoped styles + BEM = предсказуемые стили без конфликтов).",
          covers: ["Vue Router", "Navigation guards", "SCSS", "BEM methodology"],
          tasks: [
            { id: "lab-25-1", text: "Настрой navigation guards: beforeEach для проверки авторизации, beforeResolve для загрузки данных. Добавь meta-поля: { requiresAuth: true, title: 'Каталог' }.", hint: "router.beforeEach((to) => { if (to.meta.requiresAuth && !isAuthenticated()) return '/login' }). Meta-поля — любые данные, привязанные к роуту." },
            { id: "lab-25-2", text: "Добавь lazy loading для роутов: const Catalog = () => import('./pages/CatalogPage.vue'). Проверь в DevTools Network: файл грузится только при переходе.", hint: "Lazy loading разбивает бандл на chunks. Каждая страница — отдельный JS-файл. Первоначальная загрузка быстрее." },
            { id: "lab-25-3", text: "Настрой SCSS в Vue-приложении. Создай _variables.scss (цвета, отступы, breakpoints), _mixins.scss (@mixin respond-to), _base.scss (сброс стилей). Используй @use вместо @import.", hint: "@use 'variables' as v; .price { color: v.$color-primary }. @use лучше @import: не загрязняет глобальный scope, компилируется один раз." },
            { id: "lab-25-4", text: "Стилизуй Vue-компоненты по BEM в <style scoped lang='scss'>. Как scoped стили работают? Какие есть ограничения? Когда нужен :deep()?", hint: "Scoped: Vue добавляет data-attribute к элементам и селекторам: .title[data-v-abc123]. :deep(.child-class) — когда нужно стилизовать дочерний компонент из родителя." }
          ],
          checkpoint: "Vue Router с guards и lazy loading. SCSS с variables и mixins. Компоненты стилизованы по BEM. Понимаешь scoped styles."
        }
      ]
    },

    // ===== PHASE 8: ТЕСТИРОВАНИЕ =====
    {
      id: "testing",
      title: "Тестирование",
      description: "Тесты — граница между 'погромистом' и профессионалом. Здесь ты научишься тестировать всё: от утилит до полных user flows.",
      steps: [
        {
          id: "step-26",
          title: "Unit тесты с Vitest",
          why: "Unit тесты — быстрая обратная связь. Написала функцию → протестировала → уверена что работает. Без тестов каждый рефакторинг — русская рулетка. Vitest — Jest-совместимый, но быстрее и нативно с Vite.",
          covers: ["Vitest", "Unit tests", "Mocks", "Code coverage"],
          tasks: [
            { id: "lab-26-1", text: "Настрой Vitest в React-приложении. Создай первый тест: протестируй свою функцию debounce. Проверь: вызов через 300ms, отмена при повторном вызове, правильные аргументы.", hint: "vi.useFakeTimers() + vi.advanceTimersByTime(300) для контроля времени. describe, it, expect — API похож на Jest." },
            { id: "lab-26-2", text: "Протестируй API-клиент: замокай fetch через vi.fn() или vi.spyOn(global, 'fetch'). Проверь: правильный URL, заголовки, обработка ошибок (401, 500, network error).", hint: "vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: () => Promise.resolve(data) }). Тестируй edge cases: что если сервер вернул не JSON?" },
            { id: "lab-26-3", text: "Протестируй Zustand store (cartStore): addItem увеличивает items, removeItem удаляет, totalPrice считает правильно, clearCart очищает.", hint: "Zustand store можно тестировать без рендеринга: const { addItem } = useCartStore.getState(). Или через renderHook из @testing-library/react." },
            { id: "lab-26-4", text: "Запусти coverage: vitest --coverage. Посмотри отчёт. Какие файлы покрыты хорошо, какие — нет? Целься на 80% для утилит и API-клиента.", hint: "100% coverage ≠ качественные тесты. Можно иметь 100% и не тестировать edge cases. Coverage — метрика, не цель." }
          ],
          checkpoint: "Unit тесты для утилит, API-клиента, store. Coverage > 80% для критичного кода. Тесты проходят за секунды."
        },
        {
          id: "step-27",
          title: "Тесты компонентов",
          why: "'Чем больше тесты похожи на то, как пользователь использует софт, тем больше уверенности они дают' — Kent C. Dodds. Testing Library тестирует компоненты как пользователь: по тексту, по роли, по labels.",
          covers: ["Testing Library", "Integration tests", "user-event", "Vue Test Utils"],
          tasks: [
            { id: "lab-27-1", text: "Установи @testing-library/react и @testing-library/user-event. Протестируй LoginPage: рендер, ввод username/password, клик на кнопку, показ ошибки валидации.", hint: "render(<LoginPage />). screen.getByRole('textbox', { name: /username/i }). await userEvent.type(input, 'test'). Используй getByRole, getByText — НЕ getByTestId." },
            { id: "lab-27-2", text: "Протестируй ProductCard: рендер с props, клик на 'В корзину' вызывает callback, отображение цены и названия. Используй screen.getByText, getByRole.", hint: "const onAddToCart = vi.fn(); render(<ProductCard product={mockProduct} onAdd={onAddToCart} />). await userEvent.click(screen.getByRole('button', { name: /в корзину/i })). expect(onAddToCart).toHaveBeenCalledWith(mockProduct)." },
            { id: "lab-27-3", text: "Протестируй асинхронный компонент (CatalogPage с загрузкой данных): покажи loading, потом данные. Используй waitFor, findByText. Замокай API.", hint: "await screen.findByText('Product Name') — ждёт появления элемента (polling). waitFor(() => expect(...)) — ждёт условие. Мокай fetch или используй MSW (следующий шаг)." },
            { id: "lab-27-4", text: "Протестируй Vue-компоненты с Vue Test Utils + Vitest. Тот же подход: монтируй компонент, проверяй рендер, симулируй действия пользователя.", hint: "import { mount } from '@vue/test-utils'. const wrapper = mount(ProductCard, { props: { product: mockProduct } }). wrapper.find('button').trigger('click')." }
          ],
          checkpoint: "Компоненты протестированы через Testing Library (React) и Vue Test Utils (Vue). Тесты проверяют поведение, не реализацию."
        },
        {
          id: "step-28",
          title: "MSW и E2E тесты",
          why: "MSW мокает API на уровне сети — тесты не знают что API фейковый. Playwright тестирует всё приложение целиком — как реальный пользователь в реальном браузере. Это финальная линия обороны.",
          covers: ["MSW", "Playwright", "E2E tests", "Testing pyramid"],
          tasks: [
            { id: "lab-28-1", text: "Установи MSW. Создай handlers: GET /products возвращает mock данные, POST /auth/login возвращает токен, GET /products/1 — конкретный товар. Используй в тестах вместо vi.mock(fetch).", hint: "http.get('https://dummyjson.com/products', () => HttpResponse.json(mockProducts)). setupServer(...handlers) в тестах. MSW перехватывает на уровне Service Worker/node — fetch работает как обычно." },
            { id: "lab-28-2", text: "Протестируй error states через MSW: сервер возвращает 500, 401, пустой ответ, timeout. Проверь что UI правильно показывает ошибки.", hint: "http.get('/products', () => HttpResponse.error()). Можно переопределять handlers для конкретных тестов: server.use(http.get('/products', () => HttpResponse.json(null, { status: 500 })))." },
            { id: "lab-28-3", text: "Установи Playwright. Напиши E2E тест: открой приложение → логин → перейди в каталог → найди товар → добавь в корзину → проверь корзину → оформи.", hint: "await page.goto('/login'). await page.fill('[name=username]', 'emilys'). await page.click('button[type=submit]'). await expect(page).toHaveURL('/catalog')." },
            { id: "lab-28-4", text: "Добавь screenshot тест: Playwright делает скриншот страницы, сравнивает с эталоном. При изменении UI — тест падает, показывая diff.", hint: "await expect(page).toHaveScreenshot('catalog.png'). При первом запуске создаёт эталон. При изменениях: npx playwright test --update-snapshots." },
            { id: "lab-28-5", text: "Нарисуй свою 'тестовую трофи' (testing trophy): сколько у тебя unit тестов, integration тестов, E2E тестов. Как распределены? Где пробелы?", hint: "Testing trophy (Kent C. Dodds): больше всего integration тестов (компоненты с Testing Library). Unit — для чистой логики. E2E — для критических user flows. Static (TypeScript) — ловит ошибки до запуска." }
          ],
          checkpoint: "MSW мокает все API-запросы. Playwright E2E тесты проходят полный user flow. Понимаешь testing pyramid/trophy."
        }
      ]
    },

    // ===== PHASE 9: DEVOPS =====
    {
      id: "devops",
      title: "DevOps и деплой",
      description: "Код на localhost — это не продукт. Здесь ты научишься: Docker, CI/CD, деплой. Навыки, которые выделяют среди 90% фронтендеров.",
      steps: [
        {
          id: "step-29",
          title: "Docker",
          why: "Docker решает 'у меня на машине работает'. Один Dockerfile — и приложение запускается одинаково у всех: у тебя, у коллеги, в CI, на сервере. Базовый Docker — must-have навык.",
          covers: ["Docker", "Dockerfile", "docker-compose"],
          tasks: [
            { id: "lab-29-1", text: "Напиши Dockerfile для React-приложения. Multi-stage build: stage 1 (node:alpine) — npm install + build, stage 2 (nginx:alpine) — копируй dist и отдавай через nginx.", hint: "Multi-stage: первый stage — тяжёлый (node_modules, компиляция), второй — лёгкий (только статика + nginx). Итоговый образ ~30MB вместо ~1GB." },
            { id: "lab-29-2", text: "Создай nginx.conf для SPA: все запросы → index.html (чтобы роутинг работал). Gzip для JS/CSS. Cache headers для статики.", hint: "location / { try_files $uri /index.html; } — магическая строка для SPA. Без неё: обновление на /products/5 → 404." },
            { id: "lab-29-3", text: "Напиши docker-compose.yml: react-app на порту 3000, vue-app на порту 3001. Создай .dockerignore (node_modules, .git, dist).", hint: "services: react-app: { build: ./packages/react-app, ports: ['3000:80'] }. Docker-compose запускает несколько контейнеров одной командой." },
            { id: "lab-29-4", text: "Собери и запусти: docker-compose up --build. Открой localhost:3000 и localhost:3001. Работает? Проверь размер образов: docker images.", hint: "Если что-то не работает — docker logs <container>. Частая проблема: порты заняты, путь к dist неправильный, nginx.conf не скопирован." }
          ],
          checkpoint: "Оба приложения запускаются через docker-compose. Образы < 50MB каждый. SPA routing работает через nginx."
        },
        {
          id: "step-30",
          title: "GitHub Actions CI/CD",
          why: "CI/CD автоматизирует проверки: каждый push — lint, type-check, тесты, сборка. Каждый merge в main — автодеплой. Ручные проверки = человеческие ошибки. Автоматизация = стабильность.",
          covers: ["GitHub Actions", "CI pipeline", "Workflows"],
          tasks: [
            { id: "lab-30-1", text: "Создай .github/workflows/ci.yml: trigger на push и pull_request. Job: checkout → setup Node → pnpm install → lint → type-check → test → build. Каждый шаг — отдельный step.", hint: "uses: actions/checkout@v4, actions/setup-node@v4 с cache: 'pnpm'. pnpm install --frozen-lockfile (CI не должен менять lock file)." },
            { id: "lab-30-2", text: "Добавь кеширование node_modules и turbo cache для скорости. Используй actions/cache. Без кеша CI: 3-5 мин. С кешем: < 1 мин.", hint: "Turbo cache: actions/cache с path: node_modules/.cache/turbo. pnpm store: actions/setup-node с cache: 'pnpm'." },
            { id: "lab-30-3", text: "Добавь matrix strategy: тестируй на Node 18 и Node 20. Зачем? Потому что production может быть на другой версии чем dev.", hint: "strategy: matrix: { node-version: [18, 20] }. Каждая версия — параллельный job. Увидишь если код ломается на другой версии." },
            { id: "lab-30-4", text: "Добавь workflow для деплоя: при push в main → build → deploy. Используй secrets для API ключей. Добавь environment protection rules для production.", hint: "Settings → Secrets → New repository secret. В workflow: ${{ secrets.VERCEL_TOKEN }}. Environment protection: требует approval перед деплоем в prod." }
          ],
          checkpoint: "CI pipeline работает: каждый PR проверяется автоматически. При merge в main — автодеплой. Кеш ускоряет CI."
        },
        {
          id: "step-31",
          title: "Деплой в production",
          why: "Два приложения — два хостинга. React → Vercel (идеален для Next.js). Vue → Netlify (отлично для Nuxt). Это реальные production хостинги, которые используют тысячи компаний.",
          covers: ["Vercel", "Netlify", "GitHub Pages", "Domains", "DNS", "SSL", "Nginx", "PM2"],
          tasks: [
            { id: "lab-31-1", text: "Задеплой React-приложение на Vercel: подключи GitHub-репозиторий, настрой root directory (packages/react-app), build command, output directory. Проверь preview deploys для PR.", hint: "Vercel автоматически деплоит каждый PR в отдельный URL (preview). Это позволяет тестировать изменения до merge." },
            { id: "lab-31-2", text: "Задеплой Vue-приложение на Netlify: аналогичный процесс. Настрой redirect rules для SPA (/*  /index.html  200). Сравни DX: Vercel vs Netlify.", hint: "Netlify: создай netlify.toml или _redirects файл. Vercel: автоматически определяет фреймворк. Оба отличные, Vercel чуть лучше для Next.js." },
            { id: "lab-31-3", text: "Изучи DNS: если бы у тебя был домен, как привязать? A-запись → IP, CNAME → vercel-dns.com. Что такое SSL/TLS и зачем нужен HTTPS? Let's Encrypt — бесплатный сертификат.", hint: "A запись: домен → IP-адрес. CNAME: поддомен → другой домен. Vercel/Netlify дают HTTPS автоматически через Let's Encrypt." },
            { id: "lab-31-4", text: "Бонус: напиши nginx.conf для собственного VPS — reverse proxy к Node.js приложению. Добавь SSL через certbot. Настрой PM2 для автоперезапуска.", hint: "Это для понимания — не все проекты деплоятся на Vercel. Иногда нужен VPS. Nginx → proxy_pass → Node.js:3000. PM2: pm2 start app.js --name mega-lab." }
          ],
          checkpoint: "Оба приложения живут в интернете. Каждый PR — preview deploy. Понимаешь DNS, SSL, разницу между Vercel/Netlify/VPS."
        }
      ]
    },

    // ===== PHASE 10: ШЛИФОВКА =====
    {
      id: "polish",
      title: "Архитектура и шлифовка",
      description: "Последняя миля: производительность, безопасность, доступность, паттерны. То, что превращает 'работающий код' в 'профессиональный продукт'.",
      steps: [
        {
          id: "step-32",
          title: "Производительность",
          why: "Core Web Vitals — метрики Google, по которым ранжируются сайты. Медленный сайт = потерянные пользователи и плохое SEO. Оптимизация — это не 'потом', это часть разработки.",
          covers: ["Core Web Vitals", "Lazy loading", "Image optimization", "Memoization"],
          tasks: [
            { id: "lab-32-1", text: "Запусти Lighthouse в DevTools: Performance, Accessibility, Best Practices, SEO. Запиши текущие баллы. Ниже 90 — нужно оптимизировать.", hint: "Lighthouse → Generate report. Performance score < 90 — ищи: большие изображения, неоптимизированный JS, render-blocking ресурсы." },
            { id: "lab-32-2", text: "Измерь Core Web Vitals: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), INP (Interaction to Next Paint). Что каждая метрика значит? Какие значения 'хорошие'?", hint: "LCP < 2.5s (основной контент загрузился). CLS < 0.1 (ничего не прыгает). INP < 200ms (реакция на клик). Используй web-vitals библиотеку для измерения." },
            { id: "lab-32-3", text: "Добавь lazy loading: React.lazy() для страниц (code splitting по роутам), loading='lazy' для изображений, Intersection Observer для компонентов ниже fold.", hint: "const CatalogPage = React.lazy(() => import('./pages/CatalogPage')). Каждая страница — отдельный chunk. Главная загружается быстрее." },
            { id: "lab-32-4", text: "Оптимизируй изображения: WebP/AVIF формат, srcset для разных размеров экрана, width/height атрибуты (предотвращает CLS). В Next.js — используй next/image.", hint: "<img srcset='small.webp 480w, medium.webp 768w, large.webp 1200w' sizes='(max-width: 768px) 100vw, 50vw'>. Next.js Image компонент делает это автоматически." },
            { id: "lab-32-5", text: "Анализируй бандл: установи rollup-plugin-visualizer (Vite) или @next/bundle-analyzer. Найди: самые тяжёлые зависимости, дублирование, неиспользуемый код.", hint: "Частые проблемы: lodash целиком вместо lodash-es, moment.js (используй date-fns или dayjs), иконки целой библиотекой вместо tree-shaken import." }
          ],
          checkpoint: "Lighthouse Performance > 90. Все изображения оптимизированы. Бандл проанализирован и оптимизирован. Core Web Vitals в зелёной зоне."
        },
        {
          id: "step-33",
          title: "Безопасность и доступность",
          why: "XSS-уязвимость = хакер выполняет свой JS на твоём сайте. Недоступность = 15% пользователей не могут пользоваться. Оба — критичны, оба — спрашивают на собеседованиях.",
          covers: ["XSS", "CSRF", "CSP", "CORS", "Accessibility", "ARIA", "Semantic HTML", "Keyboard navigation"],
          tasks: [
            { id: "lab-33-1", text: "XSS: попробуй вставить <script>alert('xss')</script> в поле поиска. Показывается ли alert? React по умолчанию экранирует, но dangerouslySetInnerHTML — опасен. Найди все места где пользовательский ввод рендерится.", hint: "React автоматически экранирует {variable} в JSX. Опасно: dangerouslySetInnerHTML, href='javascript:', eval(). Правило: никогда не доверять пользовательскому вводу." },
            { id: "lab-33-2", text: "Изучи CORS: почему браузер блокирует запросы к другому домену? Как DummyJSON решает это (Access-Control-Allow-Origin)? Что такое preflight request?", hint: "CORS — защита браузера. Сервер должен явно разрешить запросы с другого домена через заголовки. Preflight (OPTIONS) — браузер спрашивает разрешение перед реальным запросом." },
            { id: "lab-33-3", text: "Аудит доступности: установи axe-core DevTools extension. Запусти на своих страницах. Исправь все ошибки: alt для изображений, labels для inputs, контрастность текста, focus states.", hint: "Частые ошибки: <div onclick> вместо <button>, нет alt у img, input без label, низкий контраст. Каждая ошибка — пользователь, который не может пользоваться сайтом." },
            { id: "lab-33-4", text: "Пройди всё приложение только клавиатурой: Tab для навигации, Enter для действий, Escape для закрытия. Всё доступно? Видно где фокус? Добавь skip-to-content ссылку.", hint: "outline: none — антипаттерн, убирает видимость фокуса. :focus-visible — показывает outline только при навигации клавиатурой, не при клике мышью." },
            { id: "lab-33-5", text: "Используй семантический HTML: <header>, <nav>, <main>, <article>, <aside>, <footer> вместо <div>. Добавь ARIA-атрибуты где нужно: aria-label, aria-expanded, role.", hint: "Screen reader читает: 'navigation, 5 items' для <nav>, но 'div' для <div>. Семантика = автоматическая доступность. ARIA нужен только когда HTML-семантики не хватает." }
          ],
          checkpoint: "axe-core: 0 ошибок. Приложение полностью доступно с клавиатуры. Нет XSS-уязвимостей. Понимаешь CORS."
        },
        {
          id: "step-34",
          title: "Архитектура и паттерны",
          why: "Clean Code и паттерны — не абстрактная теория. Это практические инструменты: как назвать переменную чтобы через месяц понять код, как структурировать компонент чтобы его можно было изменять без страха.",
          covers: ["Clean Code", "SOLID", "Design Patterns", "Monorepo", "Microfrontends"],
          tasks: [
            { id: "lab-34-1", text: "Проведи ревью своего кода по Clean Code: имена функций описывают действие? Функции < 20 строк? Нет magic numbers? Нет дублирования? Исправь 10 мест.", hint: "getProducts() > fetchData(). MAX_RETRY_COUNT > 3. isUserAuthenticated() > flag. Хороший код читается как текст: if (user.isAuthenticated && cart.hasItems) checkout()." },
            { id: "lab-34-2", text: "Примени SOLID к компонентам: Single Responsibility (один компонент — одна задача), Open/Closed (расширяй через props, не модификацию), Dependency Inversion (компонент зависит от интерфейса, не реализации).", hint: "SRP: ProductCard не должен знать про API или корзину. Он рендерит данные и вызывает callbacks. Open/Closed: <Button variant='primary'> — новый вариант через prop, не изменение кода Button." },
            { id: "lab-34-3", text: "Найди паттерны в своём коде: Observer (EventEmitter, event handlers), Strategy (разные алгоритмы сортировки), Factory (createApiClient), Decorator (HOC). Запиши где каждый используется.", hint: "Паттерны — не нечто искусственное. Ты уже используешь их, просто не называешь по имени. addEventListener = Observer. middleware = Chain of Responsibility." },
            { id: "lab-34-4", text: "Оцени свой монорепо: что вынесено в shared? Можно ли вынести больше? Прочитай про Turborepo remote caching и Nx. Когда монорепо оправдан, когда — overkill?", hint: "Монорепо: 2+ приложения шарят код. Плюсы: единые типы, один PR для cross-cutting changes. Минусы: сложнее CI, больше кода в одном месте. Для 1 приложения — overkill." },
            { id: "lab-34-5", text: "Прочитай про микрофронтенды: Module Federation (Webpack/Vite), Single-SPA. Когда оправдано? Почему обычно — overkill?", hint: "Микрофронтенды: разные команды деплоят разные части сайта независимо. Netflix, IKEA используют. Для команды < 20 человек — почти всегда overkill. Знать что это = senior-level awareness." }
          ],
          checkpoint: "Код отрефакторен по Clean Code принципам. Знаешь SOLID для фронтенда. Можешь назвать 4 паттерна в своём коде. Понимаешь trade-offs монорепо и микрофронтендов."
        }
      ]
    },

    // ===== PHASE 11: ФИНИШ =====
    {
      id: "finish",
      title: "Портфолио и собеседования",
      description: "Последний шаг: упакуй проект в портфолио и подготовься к собеседованиям. Знания без умения их продать = потерянное время.",
      steps: [
        {
          id: "step-35",
          title: "Проект как портфолио",
          why: "Этот проект — не учебная поделка. Это полноценный showcase: два фреймворка, тесты, CI/CD, Docker, TypeScript. Один такой проект стоит десяти todo-app. Но его нужно правильно подать.",
          covers: ["Resume", "Portfolio", "GitHub"],
          tasks: [
            { id: "lab-35-1", text: "Напиши README.md: описание проекта, скриншоты, технологии (badges), архитектурная диаграмма, как запустить локально, как запустить тесты.", hint: "Хороший README = первое впечатление. Используй badges (shields.io) для технологий. Добавь GIF-демо (используй Kap или LICEcap для записи)." },
            { id: "lab-35-2", text: "Создай архитектурную диаграмму: монорепо структура, какой пакет от какого зависит, как данные текут (API → client → store → components). Используй Excalidraw или draw.io.", hint: "Диаграмма показывает что ты думаешь об архитектуре, а не просто кодишь. Это важно для senior-позиций." },
            { id: "lab-35-3", text: "Обнови резюме: добавь этот проект с описанием (2-3 строки). Акцент на результаты: 'Построила e-commerce монорепо на React + Vue с 90%+ test coverage и автоматическим CI/CD'.", hint: "Резюме: максимум 1-2 страницы. Формат: что сделала → какой результат. Не 'использовала React', а 'построила X, что привело к Y'." },
            { id: "lab-35-4", text: "Проверь GitHub-профиль: аватарка, bio, pinned repositories (этот проект — первый). Contribution graph зелёный? README профиля?", hint: "Рекрутеры смотрят GitHub. Pinned repos — первое что видят. Bio: 'Frontend Developer | React, Vue, TypeScript'. Contribution graph показывает активность." }
          ],
          checkpoint: "README написан, архитектурная диаграмма нарисована, резюме обновлено, GitHub-профиль оформлен. Проект готов показать на собеседовании."
        },
        {
          id: "step-36",
          title: "Подготовка к собеседованиям",
          why: "Ты знаешь фронтенд. Теперь нужно уметь это показать. System design, алгоритмы, поведенческие вопросы, live coding — каждый этап собеса требует подготовки.",
          covers: ["Frontend System Design", "Algorithms", "Behavioral", "Live coding", "Code Review", "Estimation", "Communication", "English"],
          tasks: [
            { id: "lab-36-1", text: "Frontend System Design: спроектируй на бумаге 3 системы: 1) Автокомплит с debounce и кешированием, 2) Бесконечный скролл с виртуализацией, 3) Real-time чат на WebSockets. Для каждого: компоненты, состояние, API, оптимизации.", hint: "System Design — не про код, а про архитектуру. Начинай с требований, потом API, потом компоненты, потом edge cases. Говори вслух — интервьюер оценивает ход мысли, не результат." },
            { id: "lab-36-2", text: "Алгоритмы: реши 15 задач на NeetCode или LeetCode (Easy/Medium). Фокус: массивы, строки, хеш-таблицы, деревья (DOM — это дерево!). Для каждой: определи Big O.", hint: "Не нужен LeetCode Hard. Для фронтенда: Two Sum, Valid Parentheses, Merge Intervals, Binary Tree Level Order (как DOM traversal). Big O: O(n) > O(n^2)." },
            { id: "lab-36-3", text: "Подготовь 5-7 STAR-историй (Situation, Task, Action, Result): сложный баг, конфликт в команде, сжатые сроки, рефакторинг, менторство. Запиши и отрепетируй.", hint: "STAR: не 'мы сделали', а 'я сделала'. Конкретные числа: 'уменьшила время загрузки с 5s до 1.2s'. Подготовь истории заранее — на собесе стресс мешает вспоминать." },
            { id: "lab-36-4", text: "Live coding: реши задачу вслух: напиши компонент SearchInput с debounce, загрузкой результатов и keyboard navigation. Засеки время — уложись в 30 минут. Записывай себя на видео.", hint: "Ключ: думай вслух. 'Начну с интерфейса, потом добавлю state, потом debounce, потом обработаю edge cases'. Интервьюер хочет видеть процесс мышления." },
            { id: "lab-36-5", text: "Code Review: возьми PR от open-source проекта на GitHub. Напиши 5 конструктивных комментариев. Потренируйся оценивать задачи: возьми 3 задачи и оцени в story points.", hint: "Code Review: 'Предлагаю X потому что Y' вместо 'Это неправильно'. Оценка: декомпозируй → оцени каждую часть → сложи → умножь на 1.5 (буфер на неизвестное)." },
            { id: "lab-36-6", text: "Английский: прочитай 3 статьи на web.dev без переводчика. Посмотри 2 конференции (React Conf, VueConf) на YouTube. Запиши 10 технических терминов которые хочешь запомнить.", hint: "B1-B2 достаточно для работы. Технический английский проще разговорного — ограниченная лексика. Читай документацию на английском — привыкнешь за 2-3 месяца." }
          ],
          checkpoint: "Спроектировала 3 системы. Решила 15 алгоритмов. Подготовила STAR-истории. Провела mock live coding. Готова к собеседованиям."
        }
      ]
    }
  ]
};
