/**
 * TaskList.jsx — Rendering Lists with Filtering & Sorting
 *
 * KEY CONCEPT: Rendering Lists
 * https://react.dev/learn/rendering-lists
 *
 * Use JavaScript's map() to transform an array of data into an array
 * of JSX elements. Each item MUST have a unique `key` prop.
 *
 * KEY RULES for `key`:
 *   ✅ Use stable IDs from your data (database ID, UUID)
 *   ❌ Never use array index as key (breaks on reorder/insert/delete)
 *   ❌ Never generate keys during render (e.g., Math.random())
 *   - Keys must be unique among siblings (not globally)
 *   - Keys are NOT passed as props — React uses them internally
 *
 * KEY CONCEPT: Conditional Rendering
 * https://react.dev/learn/conditional-rendering
 * Three main patterns:
 *   1. if/else statements (before the return)
 *   2. Ternary: condition ? <A /> : <B />
 *   3. Logical AND: condition && <A />
 *
 * KEY CONCEPT: useCallback — Caching Function References
 * https://react.dev/reference/react/useCallback
 * useCallback(fn, deps) returns a memoized version of the callback
 * that only changes when dependencies change. Essential when passing
 * callbacks to memo()-wrapped child components.
 */
import { useState, useCallback, useMemo } from 'react';
import { useTaskState, useTaskDispatch } from '../context/TaskContext';
import TaskItem from './TaskItem';
import TaskEditModal from './TaskEditModal';

// Priority order for sorting
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function TaskList() {
  const { tasks, filter, sortBy } = useTaskState();
  const dispatch = useTaskDispatch();

  // Local state for the edit modal
  const [editingTask, setEditingTask] = useState(null);

  // DERIVED STATE with useMemo
  // Filter and sort are computed from state — never stored separately
  // https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Apply filters
    if (filter.status === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filter.status === 'completed') {
      result = result.filter((t) => t.completed);
    }

    if (filter.category !== 'all') {
      result = result.filter((t) => t.category === filter.category);
    }

    if (filter.priority !== 'all') {
      result = result.filter((t) => t.priority === filter.priority);
    }

    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortBy === 'priority') {
      result.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    }

    return result;
  }, [tasks, filter, sortBy]);

  // STABLE CALLBACKS with useCallback
  // These are passed to memo(TaskItem) — without useCallback,
  // new function references would be created every render,
  // defeating the purpose of memo().
  const handleToggle = useCallback(
    (id) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    [dispatch]
  );

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
  }, []);

  const handleSave = useCallback(
    (payload) => {
      dispatch({ type: 'EDIT_TASK', payload });
      setEditingTask(null);
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    setEditingTask(null);
  }, []);

  return (
    <div className="task-list">
      <h2 className="section-title">
        📝 Tasks ({filteredAndSortedTasks.length})
      </h2>

      {/* Conditional Rendering Pattern 1: Ternary for if/else */}
      {filteredAndSortedTasks.length === 0 ? (
        // Empty state UI
        <div className="empty-state">
          <div className="emoji">📭</div>
          {/* Conditional Rendering Pattern 2: Ternary inside JSX */}
          <p>
            {tasks.length === 0
              ? 'No tasks yet. Add your first task above!'
              : 'No tasks match the current filters.'}
          </p>
        </div>
      ) : (
        // Rendering Lists: map() with key prop
        // https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
        filteredAndSortedTasks.map((task) => (
          <TaskItem
            // KEY: Must be unique and stable. Using task.id (UUID) ✅
            // Using array index would cause bugs when tasks are reordered/deleted ❌
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}

      {/* Conditional Rendering Pattern 3: Logical AND (&&)
          Render modal only when editingTask is not null.
          CAUTION: if the left side is a number (0 && <X/>), it renders "0".
          Use explicit boolean checks: editingTask !== null && <X /> */}
      {editingTask !== null && (
        // KEY-BASED STATE RESET:
        // key={editingTask.id} ensures that when we edit a different task,
        // React creates a NEW modal instance with fresh state.
        // Without key, React would reuse the old instance and state
        // would be stale (showing the previous task's data).
        // https://react.dev/learn/preserving-and-resetting-state#resetting-state-with-a-key
        <TaskEditModal
          key={editingTask.id}
          task={editingTask}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

