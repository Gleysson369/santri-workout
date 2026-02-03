import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // 'dark' ou 'light'

  // Definição das Cores Centralizada
  const themes = {
    dark: {
      '--color-primary': '#3b82f6', // Azul (Blue-500)
      '--color-primary-hover': '#2563eb', // Azul Escuro (Blue-600)
      '--color-secondary': '#ef4444', // Vermelho (para alertas/destaques secundários)
      '--bg-main': '#0a0d10', // Fundo Principal Escuro
      '--bg-card': '#14191e', // Fundo dos Cards
      '--bg-card-hover': '#1c2229',
      '--text-main': '#ffffff',
      '--text-muted': '#9ca3af', // Gray-400
      '--border-color': 'rgba(255, 255, 255, 0.1)',
      '--shadow-color': 'rgba(59, 130, 246, 0.3)' // Sombra Azul
    },
    light: {
      '--color-primary': '#2563eb', // Azul mais forte para fundo claro
      '--color-primary-hover': '#1d4ed8',
      '--color-secondary': '#dc2626',
      '--bg-main': '#DCEBFF', // Fundo Cinza Mais Claro (Gray-100) para melhor contraste
      '--bg-card': '#ffffff', // Fundo Branco
      '--bg-card-hover': '#f9fafb',
      '--text-main': '#111827', // Gray-900
      '--text-muted': '#4b5563', // Gray-600 (Mais escuro para não sumir)
      '--border-color': 'rgba(0, 0, 0, 0.2)', // Borda mais visível no modo claro
      '--shadow-color': 'rgba(37, 99, 235, 0.2)'
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Aplica as variáveis CSS no elemento :root (html)
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];

    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Adiciona classe para controle extra se necessário (ex: Tailwind dark mode)
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
