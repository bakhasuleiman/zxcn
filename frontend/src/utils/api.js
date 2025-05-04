import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Сервис для работы с заметками
export const notesService = {
  // Получить все заметки
  async getNotes() {
    try {
      const response = await api.get('/notes');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
      throw error;
    }
  },

  // Создать новую заметку
  async createNote(note) {
    try {
      const response = await api.post('/notes', note);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      throw error;
    }
  }
};

// Сервис для работы с задачами
export const tasksService = {
  // Получить все задачи
  async getTasks() {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении задач:', error);
      throw error;
    }
  },

  // Создать новую задачу
  async createTask(task) {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
      throw error;
    }
  },

  // Обновить статус задачи
  async updateTaskStatus(id, status) {
    try {
      const response = await api.put(`/tasks/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
      throw error;
    }
  }
}; 