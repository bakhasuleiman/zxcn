const { v4: uuidv4 } = require('uuid');
const githubStorage = require('../services/githubStorage');
const markdownService = require('../services/markdownService');

// Получение всех задач
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await githubStorage.getTasks();
    
    // Преобразуем описания в HTML
    const tasksWithHtml = tasks.map(task => ({
      ...task,
      descriptionHtml: markdownService.render(task.description)
    }));
    
    // Группируем задачи по статусу
    const groupedTasks = {
      unsorted: tasksWithHtml.filter(task => task.status === 'unsorted'),
      'in-progress': tasksWithHtml.filter(task => task.status === 'in-progress'),
      completed: tasksWithHtml.filter(task => task.status === 'completed'),
      // Все задачи в плоском виде тоже добавляем
      all: tasksWithHtml
    };
    
    res.json(groupedTasks);
  } catch (error) {
    next(error);
  }
};

// Создание новой задачи
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Заголовок задачи обязателен' });
    }
    
    const newTask = {
      id: uuidv4(),
      title,
      description: description || '',
      status: 'unsorted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await githubStorage.addTask(newTask);
    
    // Добавляем HTML-версию для клиента
    newTask.descriptionHtml = markdownService.render(newTask.description);
    
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Обновление статуса задачи
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['unsorted', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Некорректный статус' });
    }
    
    await githubStorage.updateTaskStatus(id, status);
    
    // Получаем обновленный список задач
    const tasks = await githubStorage.getTasks();
    const updatedTask = tasks.find(task => task.id === id);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    
    // Добавляем HTML-версию для клиента
    updatedTask.descriptionHtml = markdownService.render(updatedTask.description);
    
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}; 