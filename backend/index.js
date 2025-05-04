require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Импорт роутов
const notesRoutes = require('./src/routes/notes');
const tasksRoutes = require('./src/routes/tasks');

// Мидлвары
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API роуты
app.use('/api/notes', notesRoutes);
app.use('/api/tasks', tasksRoutes);

// Сервинг статических файлов из frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all маршрут для SPA
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Произошла ошибка на сервере',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 