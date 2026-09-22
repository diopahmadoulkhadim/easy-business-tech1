import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
  variant?: 'icon' | 'pill';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon',
  className = '' 
}) => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  if (variant === 'pill') {
    return (
      <div 
        className={`inline-flex items-center p-1 rounded-xl bg-[#14161c] border border-[#262835] ${className}`}
        role="group"
        aria-label="Sélection du thème d'affichage"
      >
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            isDark 
              ? 'bg-[#d8f537] text-[#0c0d10] shadow-sm' 
              : 'text-gray-400 hover:text-white'
          }`}
          aria-pressed={isDark}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Sombre</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            !isDark 
              ? 'bg-[#0f172a] text-white shadow-sm' 
              : 'text-gray-400 hover:text-white'
          }`}
          aria-pressed={!isDark}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Clair</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center border ${
        isDark
          ? 'bg-[#14161c] hover:bg-[#1f222c] border-[#272a38] text-amber-300 hover:text-amber-200 hover:border-amber-400/40 shadow-sm'
          : 'bg-[#f1f5f9] hover:bg-[#e2e8f0] border-[#cbd5e1] text-indigo-700 hover:text-indigo-900 shadow-sm'
      } ${className}`}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-indigo-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
