/**
 * ThemeContext.jsx — Theme State with Context API
 *
 * KEY CONCEPT: Passing Data Deeply with Context
 * https://react.dev/learn/passing-data-deeply-with-context
 *
 * Context lets a parent component provide data to the entire tree below it,
 * no matter how deep, without passing props through every level ("prop drilling").
 *
 * PATTERN: Context + Provider Component
 * 1. Create context with createContext()
 * 2. Create a Provider component that holds the state
 * 3. Export both the context (for useContext) and the provider
 *
 * BEST PRACTICE: Separate contexts for separate concerns
 * Theme and tasks are independent — use separate contexts.
 * See: https://react.dev/learn/scaling-up-with-reducer-and-context
 */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Step 1: Create context with a sensible default value
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Step 2: Create a Provider component
export function ThemeProvider({ children }) {
  // Initialize from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // Check system preference
    return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // KEY CONCEPT: Synchronizing with Effects
  // https://react.dev/learn/synchronizing-with-effects
  // Effects let you synchronize a component with an external system.
  // Here we sync React state → DOM attribute + localStorage.
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]); // Only re-run when theme changes

  // BEST PRACTICE: useCallback for stable function references
  // https://react.dev/reference/react/useCallback
  // Without useCallback, toggleTheme would be a new function every render,
  // causing unnecessary re-renders in consuming components.
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // BEST PRACTICE: Memoize context value to avoid unnecessary re-renders
  // Without useMemo, a new object { theme, toggleTheme } would be created
  // every render, causing all consumers to re-render even if values are the same.
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    // Step 3: Provide the value to all children
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// BEST PRACTICE: Custom hook for consuming context
// This encapsulates the useContext call and gives a better error message.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

