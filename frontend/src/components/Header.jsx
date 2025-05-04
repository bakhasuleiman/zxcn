import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-light-bg dark:bg-dark-bg night:bg-night-bg border-b border-light-muted dark:border-dark-muted night:border-night-muted">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold text-light-text dark:text-dark-text night:text-night-text">
            Premium Notes
          </Link>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Link to="/notes" className="text-light-text dark:text-dark-text night:text-night-text hover:text-light-accent dark:hover:text-dark-accent night:hover:text-night-accent">
            Заметки
          </Link>
          <Link to="/tasks" className="text-light-text dark:text-dark-text night:text-night-text hover:text-light-accent dark:hover:text-dark-accent night:hover:text-night-accent">
            Задачи
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
} 