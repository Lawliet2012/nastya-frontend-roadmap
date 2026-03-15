const LAB_DATA = {
  title: "Frontend Mega Lab",
  subtitle: "Один проект — весь роадмап",
  description: "Строишь e-commerce платформу: React — магазин для покупателей, Vue 3 — админ-панель для менеджеров. Оба приложения работают с DummyJSON API. Задачи сформулированы как от заказчика — именно так ты будешь получать задачи на работе. Кода нет — только направление, зачем, и подсказки.",
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
            { id: "lab-1-1", text: "Открой dummyjson.com/docs и выпиши все ресурсы: products (194 товара, 24 категории), users (208 юзеров с ролями admin/moderator/user), carts (50 корзин), auth, posts, comments. Для каждого запиши: CRUD-эндпоинты, query-параметры (limit, skip, sortBy, order, select, q).", hint: "Ключевые эндпоинты: /products?sortBy=price&order=asc, /products/search?q=phone, /products/category/smartphones, /users/filter?key=role&value=admin. select позволяет выбирать поля: /products?select=title,price,thumbnail." },
            { id: "lab-1-2", text: "Открой Chrome DevTools → Network. Перейди на dummyjson.com/products в браузере. Изучи запрос: метод, статус-код, заголовки запроса и ответа, тело ответа. Что такое Content-Type? Зачем нужен Accept?", hint: "Переключи фильтр на Fetch/XHR чтобы видеть только API-запросы. Кликни на запрос → Headers, Response, Timing." },
            { id: "lab-1-3", text: "В Console DevTools выполни POST /auth/login с username: 'emilys', password: 'emilyspass'. Изучи ответ: id, username, email, firstName, lastName, image, accessToken, refreshToken. Попробуй параметр expiresInMins: 1 — что изменится в токене?", hint: "fetch('https://dummyjson.com/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'emilys', password: 'emilyspass', expiresInMins: 30 }) }).then(r => r.json()).then(console.log)" },
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
            { id: "lab-4-2", text: "Создай три пакета: packages/storefront (React — магазин для покупателей), packages/admin (Vue 3 — панель для менеджеров), packages/shared (общие TypeScript-типы, API-клиент, утилиты). В каждом — package.json с @mega-lab/ scope.", hint: "Два разных приложения — как в реальной компании: разные команды, разные фреймворки, общие типы и API-клиент через shared-пакет." },
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
            { id: "lab-8-2", text: "Опиши интерфейсы по реальной структуре DummyJSON. Product: id, title, description, category, price, discountPercentage, rating, stock, tags[], brand, sku, weight, dimensions{width,height,depth}, warrantyInformation, shippingInformation, availabilityStatus, reviews[{rating,comment,date,reviewerName,reviewerEmail}], returnPolicy, minimumOrderQuantity, meta{createdAt,updatedAt,barcode,qrCode}, thumbnail, images[]. User: id, firstName, lastName, username, email, phone, image, role('admin'|'moderator'|'user'), age, gender, address{}, company{name,department,title}, bank{cardNumber,cardExpire,cardType}. Cart: id, products[], total, discountedTotal, userId, totalProducts, totalQuantity. AuthResponse: id, username, email, firstName, lastName, image, accessToken, refreshToken.", hint: "Это реальная структура API. Каждое поле — это то, что ты будешь рендерить в компонентах. Типизируй точно — автокомплит потом сэкономит часы." },
            { id: "lab-8-3", text: "Для категорий: GET /products/category-list возвращает ['smartphones','laptops',...]. Используй as const + typeof для типа. Для ролей: type UserRole = 'admin' | 'moderator' | 'user'. Для availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock'. Почему as const лучше enum?", hint: "const CATEGORIES = ['smartphones', 'laptops', 'fragrances', ...] as const; type Category = typeof CATEGORIES[number]; Enum генерирует JS-код. as const — zero runtime cost." },
            { id: "lab-8-4", text: "DummyJSON пагинация: { products: Product[], total: number, skip: number, limit: number }. Но для users ключ — 'users', для carts — 'carts'. Создай generic PaginatedResponse<K, T> который работает с разными ключами. Или используй общий подход с items.", hint: "Вариант 1: PaginatedResponse<T> = { items: T[], total, skip, limit } + маппинг при получении. Вариант 2: типизируй каждый ответ отдельно (ProductsResponse, UsersResponse). Подумай что удобнее." },
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

    // ===== PHASE 5: REACT STOREFRONT =====
    {
      id: "react",
      title: "React: Магазин покупателя",
      description: "Ты строишь то, что видит покупатель: каталог, карточка товара, корзина, оформление заказа. Задачи написаны от лица заказчика — как на реальной работе. Tailwind подключаешь сразу.",
      steps: [
        {
          id: "step-13",
          title: "Каркас магазина + Tailwind",
          why: "Дизайн-система появляется с первого компонента, а не 'потом'. Tailwind заставляет думать о UI через ограничения (design tokens). Ты настроишь React + Vite + Tailwind сразу, создашь UI-кит и скелет маршрутизации.",
          covers: ["JSX", "Components", "Props", "Children", "React Router", "Tailwind CSS"],
          tasks: [
            { id: "lab-13-1", text: "ЗАДАЧА ОТ PM: 'Нам нужен каркас магазина. Покупатель видит: каталог, страницу товара, корзину, оформление заказа, свой профиль. Незалогиненных — на страницу входа.' — Создай React + Vite + TypeScript в packages/storefront. Подключи Tailwind CSS (tailwind.config.js, @tailwind directives, content paths). Подключи @mega-lab/shared.", hint: "pnpm create vite, выбери React+TS. Для Tailwind: pnpm add -D tailwindcss @tailwindcss/vite, настрой vite plugin. В tailwind.config.js расширь theme цветами бренда (primary, secondary). '@mega-lab/shared': 'workspace:*' в dependencies." },
            { id: "lab-13-2", text: "Создай UI-кит на Tailwind: Button (варианты: primary, secondary, ghost, danger; размеры: sm, md, lg), Input (с label, error state, иконкой), Badge (число в кружке), Card (compound: Card, Card.Image, Card.Body, Card.Footer). Каждый принимает className для расширения.", hint: "Используй cva (class-variance-authority) или простой объект вариантов + clsx/cn для merge классов. Compound Components через Context внутри Card. Это твой UI-кит — будешь использовать везде." },
            { id: "lab-13-3", text: "React Router v6: / каталог, /product/:id товар, /cart корзина, /checkout оформление, /profile профиль, /login вход. Layout: Header (лого, поиск, корзина Badge, аватар) + Footer. На мобиле — burger-меню. Макет Header: [Logo] [--- Search input ---] [Cart icon + badge] [Avatar / 'Войти']", hint: "createBrowserRouter + RouterProvider. Layout через <Outlet>. Header на Tailwind: flex items-center justify-between px-6 py-4. Burger: useState(isOpen) + transition. Search bar: flex-1 mx-8." },
            { id: "lab-13-4", text: "ЗАДАЧА ОТ PM: 'На каждой странице — хлебные крошки: Главная > Смартфоны > iPhone 15.' — Создай Breadcrumbs из текущего роута. Добавь страницу 404 с кнопкой 'В каталог'. Error Boundary для крашей с fallback UI.", hint: "useMatches() или useLocation() + split('/') для крошек. Error Boundary — class component с componentDidCatch. Skeleton-loading компоненты (Tailwind animate-pulse) вместо спиннера на каждой странице." },
            { id: "lab-13-5", text: "ProtectedRoute: без авторизации → /login. При загрузке — skeleton, не белый экран. ВАЖНО: если юзер шёл на /checkout и его выкинуло на /login, после логина — обратно на /checkout, не на главную.", hint: "ProtectedRoute сохраняет location: <Navigate to='/login' state={{ from: location }} />. После логина: navigate(state?.from || '/', { replace: true }). Skeleton: <div className='animate-pulse bg-gray-200 h-screen' />." }
          ],
          checkpoint: "Приложение на React + Tailwind запускается. UI-кит готов (Button, Input, Badge, Card). Роутинг, Layout, Error Boundary, Breadcrumbs. Адаптивный Header."
        },
        {
          id: "step-14",
          title: "Авторизация и формы",
          why: "Формы + валидация + JWT + race conditions при refresh token — повседневная реальность. Здесь первая по-настоящему сложная проблема: что делать, если 3 запроса одновременно обнаружат expired token?",
          covers: ["Forms", "React Hook Form", "Zod validation", "Context API", "Custom Hooks", "JWT refresh", "Race conditions"],
          tasks: [
            { id: "lab-14-1", text: "ЗАДАЧА ОТ PM: 'Экран входа: username и password. Валидация: оба поля обязательны, пароль 6+ символов. Ошибки — красным под полями. Макет: [Card по центру 360px] Логотип / Username / Password / [Кнопка Войти на всю ширину] / Сообщение об ошибке.' — React Hook Form + Zod.", hint: "const schema = z.object({ username: z.string().min(1, 'Обязательное поле'), password: z.string().min(6, 'Минимум 6 символов') }). useForm({ resolver: zodResolver(schema) }). RHF + Zod — стандарт индустрии." },
            { id: "lab-14-2", text: "POST /auth/login → ответ содержит accessToken, refreshToken и данные юзера (id, username, email, firstName, lastName, image). Создай AuthContext + useAuth() хук: { user, login(), logout(), isAuthenticated, isLoading }. При обновлении страницы: GET /auth/me с сохранённым токеном.", hint: "При refresh страницы Context обнуляется. Сохрани accessToken + refreshToken. При старте → GET /auth/me → если 401 → попробуй /auth/refresh → если опять 401 → logout." },
            { id: "lab-14-3", text: "СЛОЖНАЯ ЗАДАЧА: Реализуй автообновление токена. POST /auth/refresh принимает { refreshToken, expiresInMins }. Проблема: если 3 запроса параллельно получают 401 — все 3 пойдут обновлять токен. Реши race condition.", hint: "Паттерн promise-queue: let refreshPromise = null; function refreshToken() { if (!refreshPromise) { refreshPromise = doRefresh().finally(() => { refreshPromise = null; }); } return refreshPromise; }. Первый запрос начинает refresh, остальные ждут тот же promise." },
            { id: "lab-14-4", text: "СЛОЖНАЯ ЗАДАЧА: Создай fetch-interceptor который: 1) добавляет Authorization: Bearer token, 2) при 401 — вызывает refreshToken(), 3) после refresh — повторяет оригинальный запрос с новым токеном, 4) при повторном 401 — logout. Прозрачно для всего остального кода.", hint: "Оберни fetch: async function apiFetch(url, options) { let res = await fetch(url, addAuth(options)); if (res.status === 401) { await refreshToken(); res = await fetch(url, addAuth(options)); if (res.status === 401) logout(); } return res; }. Это production-паттерн." },
            { id: "lab-14-5", text: "ЗАДАЧА ОТ PM: 'Добавь Запомнить меня. Если включено — сессия живёт после закрытия браузера. Если нет — умирает.' — localStorage vs sessionStorage по чекбоксу. Бонус: автоматический logout при неактивности 30 минут.", hint: "Auto-logout: при mousemove/keydown/click — сбрасывай таймер. setTimeout(logout, 30*60*1000). useEffect с addEventListener + cleanup. Для 'Запомнить': абстрагируй storage через интерфейс." }
          ],
          checkpoint: "Полный цикл: логин → refresh token без race conditions → interceptor автоматически обрабатывает 401 → auto-logout → redirect-after-login."
        },
        {
          id: "step-15",
          title: "Каталог товаров",
          why: "Каталог — сердце магазина. TanStack Query для серверного стейта, но главное — реальные UX-проблемы: race conditions при поиске, синхронизация фильтров с URL, prefetch для мгновенных переходов.",
          covers: ["TanStack Query", "Custom Hooks", "Server state", "URL state", "Race conditions"],
          tasks: [
            { id: "lab-15-1", text: "ЗАДАЧА ОТ PM: 'Каталог: сетка товаров — 4 в ряд на десктопе, 2 на планшете, 1 на мобиле. 20 товаров на странице. Пагинация кнопками. Макет: [Search] / [Category chips] [Sort dropdown] / [Grid 4 cols ProductCard] / [< 1 2 3 ... 10 >]' — TanStack Query: useQuery для GET /products?limit=20&skip=0. Prefetch следующей страницы.", hint: "queryClient.prefetchQuery({ queryKey: ['products', { page: currentPage+1 }], queryFn: ... }). Пользователь жмёт 'стр.2' — данные уже в кеше. keepPreviousData: true чтобы не мигать loading при смене страницы." },
            { id: "lab-15-2", text: "СЛОЖНАЯ ЗАДАЧА: Поиск через GET /products/search?q=phone с debounce 300ms. Но: юзер набрал 'iph', запрос полетел. Потом набрал 'iphone' — второй запрос полетел. Первый ответ прилетит ПОСЛЕ второго и перетрёт правильные результаты. Реши race condition.", hint: "Решение 1: AbortController — при новом запросе abort предыдущий. Решение 2: TanStack Query решает автоматически через queryKey — при изменении key старый запрос отменяется. Убедись что queryKey включает search term." },
            { id: "lab-15-3", text: "ЗАДАЧА ОТ PM: 'Фильтры: категория (24 категории из GET /products/categories — приходят как [{slug, name, url}]), сортировка (GET /products?sortBy=price&order=asc — поля: price, rating, title). ВСЕ фильтры — в URL, чтобы можно было скопировать ссылку другу.' — Синхронизируй search, category, page, sortBy, order с URL.", hint: "useSearchParams() из React Router — URL как source of truth. При изменении фильтра — setSearchParams(). При загрузке — читай из searchParams. staleTime: Infinity для категорий (меняются редко)." },
            { id: "lab-15-4", text: "ProductCard: thumbnail, title, price (перечёркнутая старая + новая со скидкой из discountPercentage), рейтинг звёздами (rating), badge 'Скидка -N%', availabilityStatus ('In Stock'/'Low Stock'/'Out of Stock'). Кнопка 'В корзину' — мгновенный feedback ещё до ответа сервера.", hint: "Цена со скидкой: price уже со скидкой в API. Оригинальная: price / (1 - discountPercentage/100). Для звёзд: Math.round(rating) заполненных из 5. Optimistic feedback: сразу показывай 'Добавлено' на кнопке." },
            { id: "lab-15-5", text: "СЛОЖНАЯ ЗАДАЧА: Реализуй переключатель 'Страницы / Бесконечный скролл'. Для бесконечного: useInfiniteQuery + Intersection Observer (не скролл-событие). При 100+ товарах на странице — виртуализация через @tanstack/react-virtual (рендери только видимые карточки в DOM).", hint: "Виртуализация: 500 товаров = 500 DOM-элементов = тормоза. С react-virtual: ~15 DOM-элементов, остальные подставляются при скролле. useInfiniteQuery({ queryKey, queryFn, getNextPageParam: (last) => last.skip + last.limit < last.total ? last.skip + last.limit : undefined })." }
          ],
          checkpoint: "Каталог с TanStack Query, поиск без race conditions, фильтры в URL, prefetch, серверная сортировка. Виртуализация для больших списков."
        },
        {
          id: "step-16",
          title: "Страница товара, корзина, checkout",
          why: "Страница товара — сложный UI: галерея изображений, вкладки (описание/отзывы/характеристики), reviews. Корзина — идеальный кейс для Zustand + optimistic updates. Checkout — multi-step форма с валидацией.",
          covers: ["Zustand", "State management", "localStorage persistence", "Complex UI", "Multi-step forms"],
          tasks: [
            { id: "lab-16-1", text: "ЗАДАЧА ОТ PM: 'Страница товара: большое фото + превью снизу (из images[]), описание, характеристики (dimensions, weight, warrantyInformation, shippingInformation), цена со скидкой, рейтинг, reviews от покупателей. Вкладки: Описание | Отзывы (reviews[]) | Характеристики. Кнопка В корзину с выбором количества (минимум — minimumOrderQuantity).' Макет: [Gallery 55%] [Info 45%] / [Tabs]", hint: "Галерея: useState для activeIndex, клик по превью меняет основное фото. Keyboard navigation стрелками. Reviews уже в объекте товара: product.reviews[{rating,comment,date,reviewerName}]. minimumOrderQuantity — минимальный заказ, используй как min для input." },
            { id: "lab-16-2", text: "Zustand cartStore: items[], addItem(product, qty), removeItem(id), updateQuantity(id, qty), clearCart(). Вычисляемые: totalItems, totalPrice (с учётом discountedTotal из cart item). Persist middleware в localStorage. Учитывай stock — нельзя добавить больше чем есть.", hint: "create(persist((set, get) => ({...}), { name: 'mega-lab-cart' })). Selector: useCartStore(s => s.totalItems) — подписка только на это поле. Валидация: if (currentQty + newQty > product.stock) showError()." },
            { id: "lab-16-3", text: "ЗАДАЧА ОТ PM: 'Корзина: товары с фото (thumbnail), название, цена, кол-во (+/- кнопки), итого за позицию, удалить. Промокод. Итого: подытог, доставка, скидка, сумма. Пустая корзина — красивая заглушка.' Макет: [Item: [img 80px] Title / Price x Qty = Subtotal [X]] / [Promo] [Summary] [Checkout btn]", hint: "Для промокода: можешь имитировать скидку 10% при вводе 'SALE10'. Пустая корзина: иллюстрация + текст + CTA-кнопка 'В каталог'. useCartStore(s => s.items) в компоненте списка, useCartStore(s => s.totalPrice) в summary — разные selectors." },
            { id: "lab-16-4", text: "СЛОЖНАЯ ЗАДАЧА: Optimistic updates в корзине. Юзер жмёт +1 — UI обновляется МГНОВЕННО. PUT /carts/{id} с { merge: true, products: [{id, quantity}] } летит в фоне. Если ошибка — откатить + toast 'Не удалось обновить'. Реализуй rollback.", hint: "Паттерн: 1) const prev = get().items, 2) set({items: optimisticUpdate}), 3) try { await api.updateCart() } catch { set({items: prev}); showToast('error') }. DummyJSON simulates но не persists — это ОК, паттерн реальный." },
            { id: "lab-16-5", text: "ЗАДАЧА ОТ PM: 'Оформление заказа в 3 шага: 1) Доставка (имя, адрес, город, индекс), 2) Оплата (номер карты, имя на карте, срок, CVV — fake), 3) Подтверждение (сводка). Прогресс-бар сверху. Кнопки Назад/Далее.' — Multi-step форма, каждый шаг — отдельная Zod-схема.", hint: "Stepper: currentStep state, массив schemas. При 'Далее' — валидируй текущий шаг. Данные юзера для prefill: user.address (street, city, postalCode), user.bank (cardNumber, cardExpire). Итоговый submit — POST /carts/add с userId и products." }
          ],
          checkpoint: "Страница товара с галереей, табами, reviews. Корзина с optimistic updates + rollback. Multi-step checkout с валидацией каждого шага."
        },
        {
          id: "step-17",
          title: "Сложные компоненты и паттерны",
          why: "Модальная система, drag-and-drop, toast-нотификации, оптимизация рендеринга — это то, что отличает middle от junior. Каждый компонент здесь — реальная инженерная задача, а не 'обёртка над div'.",
          covers: ["Composition", "React.memo", "useMemo", "useCallback", "useRef", "Portals", "Drag-and-drop", "Focus trap"],
          tasks: [
            { id: "lab-17-1", text: "ЗАДАЧА ОТ PM: 'Покупатели жалуются что каталог подтормаживает при фильтрации. 200+ карточек на странице.' — Профайли через React DevTools Profiler: какие компоненты ререндерятся зря? React.memo для ProductCard + useCallback для обработчиков. Измерь ДО и ПОСЛЕ.", hint: "Частая ошибка: передавать () => addToCart(product) в prop — каждый рендер новая функция → memo бесполезен. Решение: useCallback + передавай product.id. Или memo с custom comparator. Но сначала: ИЗМЕРЬ что useMemo/useCallback реально нужны — иногда они делают хуже." },
            { id: "lab-17-2", text: "СЛОЖНАЯ ЗАДАЧА: Система модальных окон. Требования: несколько модалок стеком (подтверждение поверх формы), закрытие по Escape и клику вне, focus-trap (Tab не выходит за модалку), рендер через Portal, анимация enter/exit.", hint: "ModalProvider + useModal() хук: { open(content), close() }. createPortal(modal, document.body). Focus-trap: при открытии — запомни activeElement, при Tab — оставайся внутри (querySelectorAll('[tabindex], button, input, a')), при закрытии — верни фокус. Для стека: массив модалок в context." },
            { id: "lab-17-3", text: "СЛОЖНАЯ ЗАДАЧА: Drag-and-drop wishlist. Покупатель перетаскивает товары чтобы упорядочить избранное. HTML5 Drag and Drop API (без библиотек). События: dragstart, dragover (preventDefault!), drop. Визуальный placeholder куда упадёт элемент.", hint: "e.preventDefault() в dragover обязателен — иначе drop не сработает. dataTransfer.setData('text/plain', id) для передачи данных. Placeholder: определи позицию через getBoundingClientRect() + clientY. Ghost image: setDragImage()." },
            { id: "lab-17-4", text: "ЗАДАЧА ОТ PM: 'Toast-нотификации: при добавлении в корзину, при ошибке, при успешном заказе. Автозакрытие 5с, ручное закрытие, стек до 3 штук, анимация slide-in/out.' — ToastProvider + useToast() хук. Типы: success, error, warning, info.", hint: "Массив тостов в state: { id, message, type, duration }. setTimeout(remove, duration). useRef для хранения timer IDs (clearTimeout при ручном закрытии). CSS: transform: translateX(100%) → translateX(0) для slide-in. Стек: max 3, новые вытесняют старые." },
            { id: "lab-17-5", text: "useRef на практике: 1) автофокус на поле поиска при загрузке, 2) хранение предыдущего значения фильтра (без ререндера) для анимации 'было→стало', 3) Intersection Observer для ленивой загрузки картинок в каталоге.", hint: "useRef не вызывает ререндер при изменении .current. Intersection Observer: const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) loadImage() })}). Лучше чем scroll event — нативная оптимизация браузера." }
          ],
          checkpoint: "Модальная система с focus-trap и стеком. Drag-and-drop wishlist. Toast-нотификации. Оптимизация рендеринга с измерениями. useRef для DOM и persistent values."
        },
        {
          id: "step-18",
          title: "Next.js и SSR",
          why: "Next.js — стандарт для production React. SSR для SEO каталога, SSG для карточек товаров. Server Components меняют правила игры. Здесь ты перенесёшь магазин на Next.js и почувствуешь разницу.",
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

    // ===== PHASE 6: CSS POLISH =====
    {
      id: "css",
      title: "CSS: Полировка магазина",
      description: "Tailwind стоит, базовый layout есть. Теперь — тёмная тема, анимации, responsive edge cases. Превращаешь 'работающее' в 'красивое и профессиональное'.",
      steps: [
        {
          id: "step-19",
          title: "Тёмная тема и дизайн-система",
          why: "Тёмная тема — не 'инвертировать цвета'. Это системный подход через CSS Custom Properties + Tailwind dark mode. Переключатель с 3 состояниями (light/dark/system), плавные transition, persist выбора.",
          covers: ["CSS Custom Properties", "Tailwind dark mode", "Design tokens", "prefers-color-scheme"],
          tasks: [
            { id: "lab-19-1", text: "ЗАДАЧА ОТ PM: 'Конкуренты давно с тёмной темой. Нам тоже нужно. Переключатель в Header, запоминание выбора, уважение системных настроек.' — Расширь Tailwind: CSS Custom Properties (--color-bg, --color-text, --color-primary, --color-border) в :root и .dark. Настрой darkMode: 'class'.", hint: "В globals.css: :root { --bg: #fff; --text: #1a1a2e; } .dark { --bg: #0f172a; --text: #f8fafc; }. В tailwind.config: extend: { colors: { bg: 'var(--bg)' } }. Все компоненты используют var() → автоматически перекрашиваются." },
            { id: "lab-19-2", text: "Переключатель 3 состояния: Light / Dark / System. Сохрани в localStorage. При 'System' — следи за prefers-color-scheme через matchMedia. При смене системной темы — обновляйся реактивно.", hint: "matchMedia('(prefers-color-scheme: dark)').addEventListener('change', cb). Тип: 'light' | 'dark' | 'system'. При system → resolved = matchMedia.matches ? 'dark' : 'light'. Hook: useTheme() возвращает { theme, setTheme, resolvedTheme }." },
            { id: "lab-19-3", text: "СЛОЖНАЯ ЗАДАЧА: Плавный transition при смене темы. По умолчанию Tailwind dark: всё мигает. Добавь transition на background-color, color, border-color для всех элементов. НО: картинки, видео — без transition (иначе глючит).", hint: "*, *::before, *::after { transition: background-color 0.3s, color 0.3s, border-color 0.3s; } img, video, svg { transition: none; }. Альтернатива: View Transitions API (новый, только Chrome)." },
            { id: "lab-19-4", text: "Создай страницу /ui-kit: показывает все компоненты в обоих темах. Button (все варианты и размеры), Input (default, focus, error, disabled), Card, Badge, Toast. Это живая документация.", hint: "Split screen: left light, right dark. Или toggle. Для каждого компонента — все варианты в ряд. Реальная практика: команды создают 'UI gallery' для синхронизации дизайна." }
          ],
          checkpoint: "Тёмная тема с 3 состояниями, плавные transitions, persist, реакция на системную тему. UI-кит задокументирован на /ui-kit."
        },
        {
          id: "step-20",
          title: "Анимации и микроинтеракции",
          why: "Анимация — не декорация, а обратная связь. Кнопка нажата? Feedback. Товар добавлен? Fly-to-cart. Данные грузятся? Скелетон. Без этого UI 'мёртвый'. Ключ: анимируй только transform и opacity — 60fps.",
          covers: ["CSS Transitions", "Keyframes", "Transform", "will-change", "FLIP technique"],
          tasks: [
            { id: "lab-20-1", text: "ЗАДАЧА ОТ PM: 'Магазин выглядит статично. Нужны микроинтеракции: карточки при наведении, кнопки при нажатии, плавные переходы.' — Hover на ProductCard: translateY(-4px) + shadow. Кнопки: scale(0.98) при active. Ссылки: animated underline.", hint: "transition: transform 0.2s ease, box-shadow 0.2s ease. НЕ анимируй width/height/top/left — reflow. transform и opacity — compositing only, GPU. Tailwind: hover:shadow-lg hover:-translate-y-1 transition-all." },
            { id: "lab-20-2", text: "Skeleton-loading для: карточки товара (серый прямоугольник вместо фото, полоски вместо текста), страницы товара, списка корзины. НЕ спиннер — скелетон повторяет форму контента. Это уменьшает CLS.", hint: "Tailwind: animate-pulse bg-gray-200 dark:bg-gray-700 rounded. Скелетон карточки: [серый rect 100%x200px] [полоска 70%x16px] [полоска 40%x14px] [полоска 30%x20px]. Это layout shift = 0." },
            { id: "lab-20-3", text: "СЛОЖНАЯ ЗАДАЧА: Анимация 'fly-to-cart'. При клике 'В корзину' — миниатюра товара (thumbnail) летит к иконке корзины в Header. Badge пульсирует. Используй FLIP-технику или Web Animations API.", hint: "FLIP: getBoundingClientRect() кнопки (First) и корзины (Last). Клонируй thumbnail, position: fixed. Анимируй transform от First к Last. element.animate([{transform: ...}, {transform: ...}], {duration: 500}). По окончании — удали клон, обнови badge." },
            { id: "lab-20-4", text: "Staggered appearance: карточки каталога появляются поочерёдно (каждая +50ms). Табы на странице товара: slide transition при переключении. Фильтры: collapse/expand анимация.", hint: "Stagger: style={{ animationDelay: `${index * 50}ms` }}. @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }. Tailwind: передай --index как CSS variable." },
            { id: "lab-20-5", text: "Performance check: DevTools → Performance. Все анимации — зелёный (Composite)? Нет фиолетового (Layout Shift)? FPS при скролле каталога > 55? will-change: transform только где нужно. Запиши метрики ДО и ПОСЛЕ.", hint: "will-change создаёт GPU layer = память. Не ставь на всё. Используй для: модалки, sidebar, fly-to-cart. Не для: каждой карточки, каждой кнопки. Проверь Layer panel в DevTools." }
          ],
          checkpoint: "Микроинтеракции на всех элементах. Skeleton loading. Fly-to-cart через FLIP. Staggered animations. 60fps подтверждено."
        },
        {
          id: "step-21",
          title: "Responsive и сложная вёрстка",
          why: "Mobile-first — не просто 'уменьшить'. Это другой UX: bottom sheet вместо sidebar, hide/show header при скролле, таблица-как-карточки. Здесь — реальные layout-задачи.",
          covers: ["Responsive design", "CSS Grid advanced", "Container queries", "Mobile UX", "Flexbox"],
          tasks: [
            { id: "lab-21-1", text: "ЗАДАЧА ОТ PM: 'На мобильном фильтры каталога — выезжающая панель снизу (bottom sheet), не sidebar. Карточки — 1 или 2 колонки. Sticky-header с поиском: при скролле вниз прячется, при скролле вверх — появляется.' — Реализуй.", hint: "Bottom sheet: fixed bottom-0, transform translateY(100%) → translateY(0) с transition. Touch drag для resize — бонус. Header hide/show: useRef(prevScrollY), сравнивай direction, toggle class с transform: translateY(-100%). Tailwind: md:hidden для мобильных-только элементов." },
            { id: "lab-21-2", text: "СЛОЖНАЯ ЗАДАЧА: Responsive корзина. На десктопе — таблица с колонками (фото, название, цена, кол-во, итого). На мобильном — карточки. ОДИН набор данных, разная визуализация через CSS, без дублирования HTML.", hint: "Подход 1: CSS Grid + media queries перестраивают layout. Подход 2: display: contents trick. Подход 3: data-label на ячейках, на mobile display: block + ::before { content: attr(data-label) }. Выбери и объясни почему." },
            { id: "lab-21-3", text: "CSS Container Queries: ProductCard адаптируется не к ширине экрана, а к контейнеру. В sidebar — компактная карточка. В main grid — полная. В корзине — горизонтальная. Один компонент, разный layout.", hint: "container-type: inline-size на родителе. @container (min-width: 300px) { .card { grid-template-columns: 1fr 1fr } }. Container Queries — будущее responsive. Поддержка: все modern browsers." },
            { id: "lab-21-4", text: "Протестируй на реальных размерах: iPhone SE (320px), iPhone 14 (390px), iPad (768px), Galaxy Fold (280px!). DevTools → Device toolbar. Найди и исправь ВСЕ сломанные layout. Длинные названия товаров: text-overflow: ellipsis или line-clamp.", hint: "Galaxy Fold 280px — стресс-тест для любого layout. Tailwind: line-clamp-2 для обрезки текста. overflow-wrap: break-word для длинных слов без пробелов (SKU, URL). Проверь каждую страницу на каждом breakpoint." }
          ],
          checkpoint: "Магазин идеально работает от Galaxy Fold 280px до 4K. Bottom sheet на мобиле. Container Queries. Hide/show header. Responsive таблица-корзина."
        }
      ]
    },

    // ===== PHASE 7: VUE 3 ADMIN PANEL =====
    {
      id: "vue",
      title: "Vue 3: Админ-панель",
      description: "Менеджер магазина управляет товарами, заказами, пользователями. Совершенно другой тип приложения: таблицы, CRUD, дашборд, графики. Vue 3 + Nuxt 3 + SCSS + BEM. Новые сложные задачи.",
      steps: [
        {
          id: "step-22",
          title: "Nuxt 3 каркас админки",
          why: "Админка — dashboard, таблицы, формы. Другой layout, другие паттерны. File-based routing Nuxt идеально подходит: /products, /products/123, /products/new. SCSS + BEM — альтернатива Tailwind, которую нужно знать.",
          covers: ["Nuxt 3", "File-based routing", "Auto-imports", "SCSS", "BEM", "Admin layout"],
          tasks: [
            { id: "lab-22-1", text: "ЗАДАЧА ОТ PM: 'Админ-панель для менеджеров. Sidebar: Dashboard, Товары, Заказы, Пользователи, Настройки. Topbar: поиск, нотификации, профиль. Только пользователи с role=admin.' — Создай Nuxt 3 в packages/admin. Макет: [Sidebar 250px fixed | Topbar | Main content area]", hint: "npx nuxi init. pages: index.vue (dashboard), products/index.vue, products/[id].vue, products/new.vue, orders/index.vue, orders/[id].vue, users/index.vue. layout/admin.vue с sidebar + topbar." },
            { id: "lab-22-2", text: "Sidebar: collapsible (250px → 64px иконки), активный пункт подсвечен, badge 'Новые заказы (5)'. Topbar: breadcrumbs, глобальный поиск, нотификации dropdown, профиль dropdown. SCSS + BEM для стилей.", hint: "Sidebar collapse: CSS transition на width, сохраняй состояние в localStorage. BEM: .sidebar, .sidebar__item, .sidebar__item--active, .sidebar--collapsed. <style scoped lang='scss'>. @use переменных." },
            { id: "lab-22-3", text: "SCSS архитектура: _variables.scss (цвета, отступы, breakpoints), _mixins.scss (@mixin respond-to($bp), @mixin flex-center), _base.scss (reset). Стилизуй все компоненты по BEM. Сравни ощущения с Tailwind из React.", hint: "@use 'variables' as v; .sidebar { width: v.$sidebar-width; &__item { padding: v.$spacing-sm; &--active { background: v.$color-primary; } } }. BEM предсказуем и семантичен. Tailwind быстрее для прототипа. Оба подхода валидны — важно уметь оба." },
            { id: "lab-22-4", text: "Middleware auth + role check. DummyJSON users имеют поле role: 'admin' | 'moderator' | 'user'. Обычных пользователей — на страницу 403. Логин — отдельный layout без sidebar. Проверяй роль через GET /auth/me.", hint: "middleware/admin.ts: if (!user || user.role !== 'admin') return navigateTo('/403'). definePageMeta({ middleware: 'admin' }). Страница логина: definePageMeta({ layout: 'auth' }). Auto-imports: ref, computed, useRoute — доступны без import." }
          ],
          checkpoint: "Nuxt 3 админка с sidebar layout, SCSS+BEM, авторизацией по роли admin. File-based routing для всех CRUD-страниц."
        },
        {
          id: "step-23",
          title: "Dashboard с графиками",
          why: "Dashboard — витрина админки. Агрегация данных из разных эндпоинтов, графики, real-time обновления. Здесь ты поймёшь Composition API и реактивность Vue 3 на глубоком уровне.",
          covers: ["Composition API", "Reactivity deep dive", "Charts", "Real-time updates", "Pinia"],
          tasks: [
            { id: "lab-23-1", text: "ЗАДАЧА ОТ PM: 'Dashboard: 4 карточки (выручка, заказы, новые юзеры, средний чек). График продаж за неделю (bar). График по категориям (pie). Таблица последних 5 заказов.' Макет: [Card][Card][Card][Card] / [BarChart 60%][PieChart 40%] / [RecentOrders table] — Агрегируй данные из GET /carts и GET /products.", hint: "chart.js + vue-chartjs или apexcharts. Выручка: carts.reduce((sum, c) => sum + c.discountedTotal, 0). Средний чек: total / carts.length. Категории: сгруппируй products по category, посчитай количество. computed() для всех агрегаций — реактивно пересчитываются." },
            { id: "lab-23-2", text: "СЛОЖНАЯ ЗАДАЧА: Real-time обновления. Каждые 10 секунд — 'новый заказ' (случайный cart из API). Карточка заказов обновляется (+1), график перерисовывается, в таблице появляется строка с анимацией slide-down. Vue <TransitionGroup> для анимации списка.", hint: "setInterval + реактивность Vue. orders.value.unshift(newOrder) — Vue автоматически обновит DOM. Chart.js НЕ реактивен — нужно chart.update() или watch. <TransitionGroup name='list'> + CSS .list-enter-from { opacity: 0; transform: translateY(-20px) }." },
            { id: "lab-23-3", text: "СЛОЖНАЯ ЗАДАЧА: Напиши свой минимальный reactive(). Proxy перехватывает get (track зависимость), set (trigger обновление). Напиши effect() — функция перезапускается при изменении зависимостей. Это то, как Vue 3 работает под капотом.", hint: "let activeEffect = null; const depsMap = new WeakMap(); function reactive(obj) { return new Proxy(obj, { get(t,k) { track(t,k); return t[k]; }, set(t,k,v) { t[k]=v; trigger(t,k); return true; } }); } Это упрощённая версия @vue/reactivity. Примитивы нельзя обернуть в Proxy → поэтому существует ref({ value })." },
            { id: "lab-23-4", text: "Pinia stores: useAuthStore, useDashboardStore (stats, recentOrders, chartData). Setup store syntax (Composition API). Persist для auth. Getters через computed. Actions — async функции. Сравни Pinia и Zustand: что удобнее?", hint: "defineStore('dashboard', () => { const carts = ref([]); const revenue = computed(() => carts.value.reduce(...)); async function fetchData() {...} return { carts, revenue, fetchData } }). Pinia: Vue devtools integration, SSR ready. Zustand: проще, framework-agnostic, меньше boilerplate." }
          ],
          checkpoint: "Dashboard с графиками и real-time обновлениями. Понимаешь реактивность Vue 3 на уровне Proxy. Pinia stores."
        },
        {
          id: "step-24",
          title: "CRUD товаров",
          why: "CRUD — хлеб и масло админок. Но правильный CRUD — сложно: сортируемая таблица, inline editing, soft delete с undo, drag-and-drop загрузка фото, валидация вложенных форм.",
          covers: ["Data tables", "Complex forms", "VeeValidate + Zod", "Optimistic CRUD", "Composables", "VueUse"],
          tasks: [
            { id: "lab-24-1", text: "ЗАДАЧА ОТ PM: 'Таблица товаров: сортировка по колонкам (клик на заголовок — GET /products?sortBy=price&order=asc), поиск (GET /products/search?q=...), фильтр по категории (GET /products/category/{slug}), серверная пагинация. Колонки: thumbnail, title, category, price, stock, rating, actions (edit/delete). Выделение нескольких строк → массовое удаление.' — Создай переиспользуемый composable useDataTable.", hint: "useDataTable<T>(fetchFn, options): sort ref, filter ref, page ref, selected ref. Возвращает { data, isLoading, sort, filter, page, selected, selectAll, deleteSelected }. Generic — работает для товаров, заказов, юзеров. Серверная сортировка: передавай sortBy + order в API." },
            { id: "lab-24-2", text: "ЗАДАЧА ОТ PM: 'Форма создания/редактирования товара. Поля: title, description (textarea), category (select из GET /products/categories), price, discountPercentage, stock, brand, images (drag-and-drop зона). Валидация: title 3-100 символов, price > 0, stock >= 0.' — VeeValidate + Zod.", hint: "Drag-and-drop zone: @dragover.prevent, @drop.prevent, FileReader для превью. DummyJSON не persists — имитируй через URL.createObjectURL(). POST /products/add для создания, PUT /products/{id} для обновления. Одна форма — два режима (create/edit)." },
            { id: "lab-24-3", text: "СЛОЖНАЯ ЗАДАЧА: Inline editing в таблице. Двойной клик по ячейке цены → превращается в input. Enter → сохранить (PATCH /products/{id}), Escape → отменить. Optimistic update: цена обновляется мгновенно, ошибка → откат + flash красным.", hint: "Composable useInlineEdit(saveFn): editingCell ref, startEdit(row, col), save(), cancel(). Click outside → сохранить (не отменить!). VueUse onClickOutside. Flash: CSS animation .cell--error { animation: flashRed 0.5s }." },
            { id: "lab-24-4", text: "СЛОЖНАЯ ЗАДАЧА: Soft delete с Undo. DELETE /products/{id} возвращает { ...product, isDeleted: true, deletedOn: '...' }. Строка серая+зачёркнутая, toast 'Товар удалён [Отменить]'. Через 5 сек — убрать из списка. 'Отменить' → восстановить. Для массового: 'Удалено 5 товаров [Отменить]'.", hint: "Паттерн: 1) Пометь deleted в UI, 2) const timerId = setTimeout(realRemove, 5000), 3) Сохрани timerId, 4) Undo → clearTimeout + восстанови. Массовое: один toast, один таймер, один undo для всех. DummyJSON возвращает isDeleted: true — используй это для UI-состояния." },
            { id: "lab-24-5", text: "Composables: useProducts(), useDebounce(), useInfiniteScroll() своими руками. Затем VueUse: useLocalStorage, useDark, useIntersectionObserver, onClickOutside, useEventListener. Сравни: сколько кода ты написала vs VueUse решение.", hint: "Свой useDebounce: watch(value, () => { clearTimeout(timer); timer = setTimeout(() => debounced.value = value.value, delay) }). VueUse: const debounced = refDebounced(value, 300) — одна строка. VueUse экономит часы, но важно уметь написать самой — чтобы понимать что под капотом." }
          ],
          checkpoint: "DataTable composable с сортировкой/фильтрацией/пагинацией через API. Формы с VeeValidate+Zod. Inline editing. Soft delete с undo. VueUse."
        },
        {
          id: "step-25",
          title: "Заказы, пользователи, Command Palette",
          why: "Заказы (carts в DummyJSON) — Kanban-доска со статусами. Пользователи — переиспользование DataTable composable. Command Palette (Cmd+K) — впечатляющий компонент для портфолио и реальный production-паттерн.",
          covers: ["Complex state", "Kanban drag-and-drop", "Vue Router guards", "Command Palette", "Keyboard navigation"],
          tasks: [
            { id: "lab-25-1", text: "ЗАДАЧА ОТ PM: 'Заказы (GET /carts) как Kanban: колонки Новые / В обработке / Отправлены / Доставлены. Перетаскивание между колонками меняет статус. Карточка: id, userId → имя юзера (GET /users/{userId}), discountedTotal, totalProducts, totalQuantity.' — Drag-and-drop Kanban на Vue.", hint: "HTML5 DnD API или sortablejs. При drop в другую колонку: имитируй PATCH запрос + optimistic update. Vue <TransitionGroup> для анимации перемещения. Статусы: добавь локально (DummyJSON не имеет order status — это нормально, имитируй). Загрузи имя юзера по userId." },
            { id: "lab-25-2", text: "Страница заказа: timeline статусов (вертикальная линия с точками — пройденные зелёные, текущий пульсирует, будущие серые). Список товаров в заказе (cart.products[{title, price, quantity, thumbnail}]). Данные клиента (GET /users/{cart.userId}). Кнопки: 'Следующий статус', 'Отменить' с подтверждением.", hint: "Timeline: border-left + абсолютные точки. Vue <Transition> для анимации смены статуса. Confirm dialog composable: const { confirm } = useConfirm(); if (await confirm('Отменить заказ?')) doCancel(). Это promise-based подход — модалка как async операция." },
            { id: "lab-25-3", text: "ЗАДАЧА ОТ PM: 'Таблица пользователей: image, firstName+lastName, email, role (badge цветом), company.name, address.city. Фильтр по роли: GET /users/filter?key=role&value=admin. Клик — профиль с историей заказов (GET /carts/user/{userId}).' — Переиспользуй useDataTable composable.", hint: "Тот же composable useDataTable, другие данные: useDataTable(fetchUsers, { columns: [...] }). Фильтр по роли: select с admin/moderator/user. Для каждого юзера: GET /carts/user/{id} → его заказы. Это сила абстракции — один composable, три страницы." },
            { id: "lab-25-4", text: "Vue Router: navigation guards (beforeEach — auth + role), lazy loading всех страниц (Nuxt делает автоматически), meta-поля { requiresAuth: true, requiredRole: 'admin', title: 'Товары' }. Breadcrumbs из meta.title.", hint: "Nuxt middleware + definePageMeta. Breadcrumbs: useRoute().matched.map(r => ({ title: r.meta.title, path: r.path })). Lazy loading в Nuxt — из коробки. При переходе на /orders/123: middleware проверит auth → loadOrder в beforeResolve." },
            { id: "lab-25-5", text: "СЛОЖНАЯ ЗАДАЧА: Command Palette (Cmd+K). Модалка с поиском по всему: товарам (GET /products/search?q=...), юзерам (GET /users/search?q=...), страницам. Keyboard navigation (стрелки + Enter). Секции в результатах. Fuzzy search для страниц.", hint: "Composable useCommandPalette(): isOpen, query, results. useEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); toggle() } }). Fuse.js для fuzzy search по страницам. API search для товаров/юзеров с debounce. ArrowUp/Down → selectedIndex, Enter → navigate. Группировка: { products: [...], users: [...], pages: [...] }." }
          ],
          checkpoint: "Kanban заказов с drag-and-drop. Timeline статусов. Управление пользователями (переиспользование DataTable). Command Palette (Cmd+K) с поиском по всему."
        }
      ]
    },

    // ===== PHASE 8: ТЕСТИРОВАНИЕ =====
    {
      id: "testing",
      title: "Тестирование",
      description: "Тесты — граница между junior и mid. Тестируешь оба приложения: storefront (React) и admin (Vue). Unit → Component → E2E.",
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
            { id: "lab-28-3", text: "Установи Playwright. E2E для storefront: логин → каталог → поиск → добавь в корзину → checkout. E2E для admin: логин (admin role) → dashboard → создай товар → измени статус заказа. Два приложения — два набора тестов.", hint: "await page.goto('/login'). await page.fill('[name=username]', 'emilys'). Для admin: используй юзера с role=admin. Проверь что обычный юзер не попадёт в админку (403)." },
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
            { id: "lab-29-3", text: "docker-compose.yml: storefront (React магазин) на порту 3000, admin (Vue админка) на порту 3001. .dockerignore (node_modules, .git, dist).", hint: "services: storefront: { build: ./packages/storefront, ports: ['3000:80'] } admin: { build: ./packages/admin, ports: ['3001:80'] }. Docker-compose запускает оба приложения одной командой." },
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
            { id: "lab-31-1", text: "Storefront (React) → Vercel: подключи GitHub, root directory packages/storefront, build command, output. Каждый PR — preview deploy на отдельном URL.", hint: "Vercel автоматически деплоит каждый PR в preview URL. Идеален для React/Next.js. Root directory: packages/storefront." },
            { id: "lab-31-2", text: "Admin (Vue/Nuxt) → Netlify: настрой redirect rules для SPA (/*  /index.html  200). Или используй Nuxt SSR на Vercel. Сравни DX: Vercel vs Netlify.", hint: "Netlify: _redirects файл или netlify.toml. Nuxt SSR на Vercel: serverless functions автоматически. Два приложения — два хостинга, или оба на Vercel." },
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
            { id: "lab-35-3", text: "Обнови резюме: 'E-commerce платформа: React storefront (каталог, корзина, checkout) + Vue 3 admin panel (dashboard, CRUD, Kanban заказов). Монорепо, TypeScript, TanStack Query, Zustand, Pinia, Tailwind, SCSS, Vitest, Playwright, Docker, CI/CD.'", hint: "Резюме: максимум 1-2 страницы. Акцент на результаты, не обязанности. Два фреймворка в одном проекте — это сильно выделяет среди кандидатов." },
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
