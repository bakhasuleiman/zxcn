require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

// Проверяем наличие токена
if (!process.env.TELEGRAM_TOKEN) {
  console.error('TELEGRAM_TOKEN не найден в переменных окружения');
  process.exit(1);
}

// Создаем экземпляр бота
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Получаем базовый URL API из переменных окружения или используем localhost
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

// API-клиент
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Приветственное сообщение
bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать в Premium Notes!\n\n' +
    'Используйте следующие команды:\n' +
    '/note <текст> - создать новую заметку\n' +
    '/task <текст> - создать новую задачу'
  );
});

// Создание заметки
bot.command('note', async (ctx) => {
  try {
    const text = ctx.message.text.slice(6).trim(); // Убираем "/note "
    
    if (!text) {
      return ctx.reply('Пожалуйста, укажите текст заметки после команды /note');
    }
    
    // Разделяем первую строку как заголовок, остальное как тело
    const lines = text.split('\n');
    const title = lines[0];
    const body = lines.length > 1 ? lines.slice(1).join('\n') : '';
    
    // Отправляем запрос на создание заметки
    await api.post('/notes', { title, body });
    
    ctx.reply('✅ Заметка успешно создана!');
  } catch (error) {
    console.error('Ошибка при создании заметки:', error);
    ctx.reply('❌ Не удалось создать заметку. Пожалуйста, попробуйте позже.');
  }
});

// Создание задачи
bot.command('task', async (ctx) => {
  try {
    const text = ctx.message.text.slice(6).trim(); // Убираем "/task "
    
    if (!text) {
      return ctx.reply('Пожалуйста, укажите текст задачи после команды /task');
    }
    
    // Разделяем первую строку как заголовок, остальное как описание
    const lines = text.split('\n');
    const title = lines[0];
    const description = lines.length > 1 ? lines.slice(1).join('\n') : '';
    
    // Отправляем запрос на создание задачи
    await api.post('/tasks', { title, description, status: 'unsorted' });
    
    ctx.reply('✅ Задача успешно создана!');
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    ctx.reply('❌ Не удалось создать задачу. Пожалуйста, попробуйте позже.');
  }
});

// Команда помощи
bot.help((ctx) => {
  ctx.reply(
    'Команды бота Premium Notes:\n\n' +
    '/note <текст> - создать новую заметку\n' +
    'Пример: /note Заголовок заметки\nТекст заметки\n\n' +
    '/task <текст> - создать новую задачу\n' +
    'Пример: /task Название задачи\nОписание задачи'
  );
});

// Запуск бота
bot.launch()
  .then(() => {
    console.log('Telegram-бот запущен');
  })
  .catch((err) => {
    console.error('Ошибка при запуске бота:', err);
  });

// Корректное завершение работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 