'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ColorTheme = 'default' | 'sage';
type Mode = 'light' | 'dark';

interface ThemeContextType {
  colorTheme: ColorTheme;
  mode: Mode;
  setColorTheme: (theme: ColorTheme) => void;
  setMode: (mode: Mode) => void;
  toggleColorTheme: () => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');
  const [mode, setMode] = useState<Mode>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme and mode from localStorage on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;
    const savedMode = localStorage.getItem('mode') as Mode | null;
    
    if (savedColorTheme && (savedColorTheme === 'default' || savedColorTheme === 'sage')) {
      setColorTheme(savedColorTheme);
    }
    
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
    
    setMounted(true);
  }, []);

  // Save color theme to localStorage and update data attribute
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('colorTheme', colorTheme);
      document.documentElement.setAttribute('data-theme', colorTheme);
    }
  }, [colorTheme, mounted]);

  // Save mode to localStorage and update data attribute
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('mode', mode);
      document.documentElement.setAttribute('data-mode', mode);
    }
  }, [mode, mounted]);

  const toggleColorTheme = () => {
    setColorTheme(prev => prev === 'default' ? 'sage' : 'default');
  };

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      colorTheme,
      mode,
      setColorTheme,
      setMode,
      toggleColorTheme,
      toggleMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}