const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// GET /api/tasks - получить все задачи
router.get('/', tasksController.getTasks);

// POST /api/tasks - создать новую задачу
router.post('/', tasksController.createTask);

// PUT /api/tasks/:id/status - обновить статус задачи
router.put('/:id/status', tasksController.updateTaskStatus);

module.exports = router; 