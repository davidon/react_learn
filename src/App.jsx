/**
 * App.jsx — Root Component & Composition
 *
 * KEY CONCEPT: Your First Component / Describing the UI
 * https://react.dev/learn/describing-the-ui
 * https://react.dev/learn/your-first-component
 *
 * React apps are made out of components. A component is a piece of the UI
 * that has its own logic and appearance. Components can be as small as a
 * button, or as large as an entire page.
 *
 * PATTERN: Component Composition
 * Build complex UIs by composing small, focused components together.
 * Each component should ideally do ONE thing well (Single Responsibility).
 *
 * KEY CONCEPT: Writing Markup with JSX
 * https://react.dev/learn/writing-markup-with-jsx
 * JSX is a syntax extension for JavaScript that lets you write HTML-like
 * markup inside JavaScript. Rules:
 *   1. Return a single root element (use <> Fragment if needed)
 *   2. Close all tags (e.g., <img /> not <img>)
 *   3. Use camelCase for HTML attributes (className, onClick, htmlFor)
 */
import { useTaskState } from './context/TaskContext';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import ScrollToTopButton from './components/ScrollToTopButton';

export default function App() {
  const { tasks } = useTaskState();
  const pendingCount = tasks.filter((t) => !t.completed).length;

  // Custom hook usage — updates document.title reactively
  useDocumentTitle(
    pendingCount > 0
      ? `(${pendingCount}) Tasks Pending — React Learn App`
      : 'All Done! — React Learn App'
  );

  return (
    // JSX: className instead of class (because class is a reserved word in JS)
    <div className="app">
      {/* Component composition: each component handles its own concern */}
      <Header />
      <Dashboard />
      <TaskForm />
      <FilterBar />
      <TaskList />
      <ScrollToTopButton />
    </div>
  );
}

