const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// GET /api/notes - получить все заметки
router.get('/', notesController.getNotes);

// POST /api/notes - создать новую заметку
router.post('/', notesController.createNote);

module.exports = router; 