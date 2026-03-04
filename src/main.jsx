/**
 * main.jsx — Application Entry Point
 *
 * KEY CONCEPT: Render and Commit (https://react.dev/learn/render-and-commit)
 * React rendering happens in 3 steps:
 *   1. Trigger — initial render or state update
 *   2. Render — React calls your components
 *   3. Commit — React applies changes to the DOM
 *
 * createRoot() creates a root for displaying React components inside a DOM node.
 * StrictMode helps find common bugs during development (double-invokes effects, etc.)
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import './index.css';

// PATTERN: Provider Composition
// Wrap the app in context providers at the top level so all components
// can access shared state without prop drilling.
// See: https://react.dev/learn/passing-data-deeply-with-context
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
  </StrictMode>
);

