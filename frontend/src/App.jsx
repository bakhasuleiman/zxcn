import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// Заглушки для страниц до их реализации
const Home = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Добро пожаловать в Premium Notes</h1>
    <p className="mb-4">Минималистичный премиум-сервис для заметок и задач.</p>
    <p>Используйте навигацию выше для работы с заметками и задачами.</p>
  </div>
);

const Notes = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Заметки</h1>
    <p className="italic text-gray-500">Загрузка заметок...</p>
  </div>
);

const Tasks = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Задачи</h1>
    <p className="italic text-gray-500">Загрузка задач...</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg night:bg-night-bg text-light-text dark:text-dark-text night:text-night-text">
      <Header />
      
      <main className="pt-4 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </main>
      
      <footer className="py-4 border-t border-light-muted dark:border-dark-muted night:border-night-muted">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Premium Notes App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
} 