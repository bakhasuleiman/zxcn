# Premium Notes App

Минималистичный премиум-сервис для заметок и задач с хранением данных в GitHub и интеграцией с Telegram.

## Архитектура

- **Backend**: Node.js с Express
- **Frontend**: Vite + React с использованием Tailwind CSS
- **Хранение данных**: GitHub REST API
- **Дополнительно**: Telegram-бот для быстрого создания заметок и задач

## Установка и запуск

### Локальный запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/your-username/premium-notes-app.git
cd premium-notes-app
```

2. Установить зависимости:
```bash
npm run install:all
```

3. Создать файл `.env` в корневой директории:
```
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_NOTES_PATH=data/notes.json
GITHUB_TASKS_PATH=data/tasks.json
TELEGRAM_TOKEN=your_telegram_bot_token
PORT=3000
```

4. Запустить проект в режиме разработки:
```bash
npm run dev
```

5. Запустить только серверную часть:
```bash
npm run dev:backend
```

6. Запустить только клиентскую часть:
```bash
npm run dev:frontend
```

7. Запустить только Telegram-бота:
```bash
npm run dev:bot
```

### Развертывание на Render.com

1. Подключите ваш GitHub-репозиторий к Render.com
2. Создайте новый Web Service
3. Укажите следующие настройки:
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm start`
4. Добавьте переменные окружения (те же, что и в `.env` файле)

## API Endpoints

### Заметки

- `GET /api/notes` - получить все заметки
- `POST /api/notes` - создать новую заметку
  ```json
  {
    "title": "Заголовок заметки",
    "body": "Содержание заметки в формате **Markdown**"
  }
  ```

### Задачи

- `GET /api/tasks` - получить все задачи
- `POST /api/tasks` - создать новую задачу
  ```json
  {
    "title": "Заголовок задачи",
    "description": "Описание задачи",
    "status": "unsorted" // По умолчанию
  }
  ```
- `PUT /api/tasks/:id/status` - обновить статус задачи
  ```json
  {
    "status": "in-progress" // или "completed", "unsorted"
  }
  ```

## Telegram-бот

### Команды

- `/note <текст>` - создать новую заметку
- `/task <текст>` - создать новую задачу

### Настройка

1. Создайте нового бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота и добавьте его в переменные окружения
3. Запустите бота командой `npm run dev:bot`

## Настройка GitHub в качестве базы данных

1. Создайте персональный токен доступа GitHub с правами на чтение и запись в репозиторий
2. Создайте репозиторий или используйте существующий
3. Укажите путь к файлам данных в переменных окружения
4. Проект автоматически создаст файлы при первом запуске, если они не существуют 