/**
 * TaskItem.jsx — Optimized List Item with memo
 *
 * KEY CONCEPT: React.memo — Skipping Re-rendering
 * https://react.dev/reference/react/memo
 *
 * memo() wraps a component so React skips re-rendering it when its
 * props haven't changed (shallow comparison). This is an optimization
 * for components that render often with the same props.
 *
 * WHEN TO USE memo():
 *   ✅ Component re-renders often with the same props
 *   ✅ Component is expensive to render
 *   ✅ Used in a list with many items
 *   ❌ Props change on every render anyway (memo adds overhead)
 *
 * IMPORTANT: For memo() to work, callback props must be stable.
 * Use useCallback() in the parent to prevent creating new function
 * references on every render.
 *
 * KEY CONCEPT: Passing Props to a Component
 * https://react.dev/learn/passing-props-to-a-component
 * - Props are read-only snapshots in time
 * - Pass event handlers as props for child → parent communication
 */
import { memo } from 'react';
import CategoryBadge, { PriorityBadge } from './CategoryBadge';

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // This component receives callbacks from the parent.
  // Because it's wrapped in memo(), it won't re-render unless
  // task, onToggle, onDelete, or onEdit actually change.

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox: triggers onToggle callback passed from parent */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        // Event handler: pass data UP to parent via callback
        // https://react.dev/learn/responding-to-events#passing-event-handlers-as-props
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      <div className="task-content">
        <div className="task-title">{task.title}</div>

        {/* Conditional Rendering: only show description if it exists
            https://react.dev/learn/conditional-rendering
            PATTERN: Use && for "if true, render this"
            CAUTION: Don't put numbers before && (0 && <X/> renders "0")
        */}
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}

        <div className="task-meta">
          {/* Pure presentational components — just display data */}
          <CategoryBadge category={task.category} />
          <PriorityBadge priority={task.priority} />
          <span className="badge badge-other">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="btn-icon"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
});

// BEST PRACTICE: Set displayName for debugging with React DevTools
TaskItem.displayName = 'TaskItem';

export default TaskItem;

