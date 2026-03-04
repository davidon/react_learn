/**
 * FilterBar.jsx — Filter & Sort Controls
 *
 * KEY CONCEPT: Sharing State Between Components
 * https://react.dev/learn/sharing-state-between-components
 *
 * When two components need to share state, lift it up to their
 * closest common ancestor. Here, filter state lives in the reducer
 * (accessed via context), so FilterBar and TaskList share the same filters.
 *
 * This is also known as "lifting state up" — one of the most common
 * React patterns for coordinating sibling components.
 */
import { useTaskState, useTaskDispatch } from '../context/TaskContext';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priority', label: 'Priority (High→Low)' },
];

export default function FilterBar() {
  const { filter, sortBy } = useTaskState();
  const dispatch = useTaskDispatch();

  // Event handler that dispatches filter updates to the reducer
  // The reducer handles immutable updates to nested filter object
  function handleFilterChange(key, value) {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  }

  return (
    <div className="filter-bar">
      <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>🔍 Filter:</span>

      {/* Each select is a controlled component bound to reducer state */}
      <select
        value={filter.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={filter.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={filter.priority}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
      >
        {PRIORITY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <span style={{ fontWeight: 500, fontSize: '0.9rem', marginLeft: '8px' }}>⬆️ Sort:</span>

      <select
        value={sortBy}
        onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

