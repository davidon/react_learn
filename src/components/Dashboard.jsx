/**
 * Dashboard.jsx — Statistics Dashboard with useMemo
 *
 * KEY CONCEPT: useMemo — Caching Expensive Calculations
 * https://react.dev/reference/react/useMemo
 *
 * This component consumes the useTaskStats custom hook, which uses
 * useMemo internally to cache derived statistics. The dashboard
 * only recalculates when the tasks array actually changes.
 *
 * KEY CONCEPT: Keeping Components Pure
 * https://react.dev/learn/keeping-components-pure
 * The bar chart rendering is a pure transformation:
 * same data → same bars. No side effects during render.
 *
 * PATTERN: Presentational Component
 * This component focuses on DISPLAYING data. The data computation
 * is extracted into a custom hook (useTaskStats) — separation of concerns.
 */
import { useTaskState } from '../context/TaskContext';
import { useTaskStats } from '../hooks/useTaskStats';

export default function Dashboard() {
  const { tasks } = useTaskState();
  const stats = useTaskStats(tasks);

  // Don't render dashboard if there are no tasks
  // Conditional rendering: early return pattern
  // https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null
  if (tasks.length === 0) {
    return null; // Returning null renders nothing
  }

  // Find max count for scaling bar widths (pure calculation)
  const categoryEntries = Object.entries(stats.byCategory);
  const maxCategoryCount = Math.max(...categoryEntries.map(([, count]) => count), 1);

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <h2 className="section-title">📊 Dashboard</h2>

      {/* Stat cards — Rendering Lists with map() */}
      <div className="dashboard">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Done %" value={`${stats.completionRate}%`} />
      </div>

      {/* Bar chart: category breakdown */}
      {categoryEntries.length > 0 && (
        <div className="bar-chart">
          <h3 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
            Tasks by Category
          </h3>
          {/* Rendering Lists: Each bar is rendered from data
              https://react.dev/learn/rendering-lists */}
          {categoryEntries.map(([category, count]) => (
            <div className="bar-row" key={category}>
              <span className="bar-label">{category}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  // Inline styles: use camelCase in React (width, not width)
                  // https://react.dev/learn/writing-markup-with-jsx#why-do-multiple-jsx-tags-need-to-be-wrapped
                  style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * StatCard — A small pure component
 *
 * BEST PRACTICE: Extract small reusable components
 * This component is only used by Dashboard, so it's co-located in the same file.
 * If it were used elsewhere, move it to its own file.
 *
 * KEY CONCEPT: Passing Props
 * https://react.dev/learn/passing-props-to-a-component
 * Props can be destructured directly in the function signature.
 */
function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

