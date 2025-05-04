const { v4: uuidv4 } = require('uuid');
const githubStorage = require('../services/githubStorage');
const markdownService = require('../services/markdownService');

// Получение всех заметок
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await githubStorage.getNotes();
    
    // Для каждой заметки преобразуем Markdown в HTML
    const notesWithHtml = notes.map(note => ({
      ...note,
      html: markdownService.render(note.body)
    }));
    
    res.json(notesWithHtml);
  } catch (error) {
    next(error);
  }
};

// Создание новой заметки
exports.createNote = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({ error: 'Заголовок и содержание обязательны' });
    }
    
    const newNote = {
      id: uuidv4(),
      title,
      body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await githubStorage.addNote(newNote);
    
    // Добавляем HTML-версию для клиента
    newNote.html = markdownService.render(newNote.body);
    
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
}; 