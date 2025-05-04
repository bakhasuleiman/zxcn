const axios = require('axios');

class GitHubStorage {
  constructor() {
    this.token = process.env.GITHUB_TOKEN;
    this.owner = process.env.GITHUB_OWNER;
    this.repo = process.env.GITHUB_REPO;
    this.notesPath = process.env.GITHUB_NOTES_PATH;
    this.tasksPath = process.env.GITHUB_TASKS_PATH;
    
    if (!this.token || !this.owner || !this.repo) {
      throw new Error('GitHub credentials not properly configured');
    }
    
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  }

  async getFileContent(path) {
    try {
      const response = await this.api.get(`/repos/${this.owner}/${this.repo}/contents/${path}`);
      const content = Buffer.from(response.data.content, 'base64').toString('utf8');
      return {
        content: JSON.parse(content),
        sha: response.data.sha
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Файл не существует, возвращаем пустой массив
        return { content: [], sha: null };
      }
      throw error;
    }
  }

  async updateFile(path, content, message, sha) {
    const encodedContent = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
    
    const data = {
      message,
      content: encodedContent,
      branch: 'main' // или другая ветка, которую вы используете
    };

    if (sha) {
      data.sha = sha;
    }

    try {
      const response = await this.api.put(
        `/repos/${this.owner}/${this.repo}/contents/${path}`,
        data
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Конфликт, пробуем получить новый SHA и повторить
        const latestFile = await this.getFileContent(path);
        return this.updateFile(path, content, message, latestFile.sha);
      }
      throw error;
    }
  }

  // Методы для работы с заметками
  async getNotes() {
    const { content } = await this.getFileContent(this.notesPath);
    return content;
  }

  async addNote(note) {
    const { content, sha } = await this.getFileContent(this.notesPath);
    content.push(note);
    return this.updateFile(
      this.notesPath,
      content,
      `Добавлена новая заметка: ${note.title}`,
      sha
    );
  }

  // Методы для работы с задачами
  async getTasks() {
    const { content } = await this.getFileContent(this.tasksPath);
    return content;
  }

  async addTask(task) {
    const { content, sha } = await this.getFileContent(this.tasksPath);
    content.push(task);
    return this.updateFile(
      this.tasksPath,
      content,
      `Добавлена новая задача: ${task.title}`,
      sha
    );
  }

  async updateTaskStatus(taskId, newStatus) {
    const { content, sha } = await this.getFileContent(this.tasksPath);
    const taskIndex = content.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error(`Задача с ID ${taskId} не найдена`);
    }
    
    content[taskIndex].status = newStatus;
    
    return this.updateFile(
      this.tasksPath,
      content,
      `Обновлен статус задачи: ${content[taskIndex].title}`,
      sha
    );
  }
}

module.exports = new GitHubStorage(); 