/**
 * Header.jsx — Presentational Component with Props
 *
 * KEY CONCEPT: Passing Props to a Component
 * https://react.dev/learn/passing-props-to-a-component
 *
 * Props are how parent components pass data to child components.
 * Think of props as "arguments" to your component function.
 * Props are READ-ONLY — a component should never modify its own props.
 *
 * This component demonstrates:
 *   - Component composition (contains ThemeToggle)
 *   - JSX markup
 *   - Presentational component pattern (no state, just UI)
 */
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="header">
      <div>
        <h1>📋 Task Manager</h1>
        <p className="subtitle">
          A React learning app covering all topics from{' '}
          <a
            href="https://react.dev/learn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary)' }}
          >
            react.dev/learn
          </a>
        </p>
      </div>
      {/* Composition: ThemeToggle manages its own state via context */}
      <ThemeToggle />
    </header>
  );
}

