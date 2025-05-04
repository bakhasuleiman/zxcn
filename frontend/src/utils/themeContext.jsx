import { createContext, useState, useEffect, useContext } from 'react';

// Возможные темы
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  NIGHT: 'night'
};

// Создаем контекст темы
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Проверяем сохраненную тему в localStorage или используем светлую тему по умолчанию
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || THEMES.LIGHT;
  });

  // Применяем классы к корневому элементу при изменении темы
  useEffect(() => {
    const root = document.documentElement;
    
    // Удаляем все классы тем
    root.classList.remove(THEMES.LIGHT, THEMES.DARK, THEMES.NIGHT);
    
    // Добавляем класс текущей темы (кроме светлой, которая по умолчанию)
    if (theme !== THEMES.LIGHT) {
      root.classList.add(theme);
    }
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', theme);
    
    // Обновляем мета-тег theme-color для адаптации к теме
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (theme === THEMES.LIGHT) {
        metaThemeColor.setAttribute('content', '#FFFFFF');
      } else if (theme === THEMES.DARK) {
        metaThemeColor.setAttribute('content', '#111827');
      } else if (theme === THEMES.NIGHT) {
        metaThemeColor.setAttribute('content', '#0F172A');
      }
    }
  }, [theme]);

  // Функция для переключения темы
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Хук для использования темы в компонентах
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 