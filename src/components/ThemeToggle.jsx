/**
 * ThemeToggle.jsx — Context Consumer Component
 *
 * KEY CONCEPT: useContext — Reading Context
 * https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context
 *
 * useContext(SomeContext) reads the value from the nearest Provider above.
 * When the context value changes, React re-renders all components that read it.
 *
 * KEY CONCEPT: Responding to Events
 * https://react.dev/learn/responding-to-events
 * Event handlers are functions that run in response to user interactions.
 * They are passed as props: onClick={handleClick} (not onClick={handleClick()})
 */
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  // Read from context — no props needed!
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      // Event handler: passed as reference, not called
      // CAUTION: onClick={toggleTheme()} would call it during render!
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Conditional rendering with ternary */}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

