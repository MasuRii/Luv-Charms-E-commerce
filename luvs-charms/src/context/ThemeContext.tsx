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
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    // Initialize from localStorage on client
    if (typeof window !== 'undefined') {
      const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;
      if (savedColorTheme && (savedColorTheme === 'default' || savedColorTheme === 'sage')) {
        return savedColorTheme;
      }
    }
    return 'default';
  });
  const [mode, setMode] = useState<Mode>(() => {
    // Initialize from localStorage on client
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('mode') as Mode | null;
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        return savedMode;
      }
    }
    return 'light';
  });

  // Save color theme to localStorage and update data attribute
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('colorTheme', colorTheme);
      document.documentElement.setAttribute('data-theme', colorTheme);
    }
  }, [colorTheme]);

  // Save mode to localStorage and update data attribute
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mode', mode);
      document.documentElement.setAttribute('data-mode', mode);
    }
  }, [mode]);

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