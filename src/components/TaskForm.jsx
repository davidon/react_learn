/**
 * TaskForm.jsx — Controlled Form with Events, State, and Refs
 *
 * KEY CONCEPT: Responding to Events
 * https://react.dev/learn/responding-to-events
 *
 * KEY CONCEPT: State — A Component's Memory
 * https://react.dev/learn/state-a-components-memory
 * State lets a component "remember" information between renders.
 * useState returns [currentValue, setterFunction].
 *
 * KEY CONCEPT: Referencing Values with Refs
 * https://react.dev/learn/referencing-values-with-refs
 * https://react.dev/learn/manipulating-the-dom-with-refs
 * Refs let you reference a value that's NOT needed for rendering.
 * Common use: directly access DOM elements (e.g., focus an input).
 *
 * KEY CONCEPT: Queueing a Series of State Updates
 * https://react.dev/learn/queueing-a-series-of-state-updates
 * React batches state updates. If you need to update based on previous
 * state, use the updater function form: setState(prev => newValue)
 */
import { useState, useRef } from 'react';
import { useTaskDispatch } from '../context/TaskContext';

// Available categories and priorities — defined outside component
// because they don't change (avoids recreating on every render)
const CATEGORIES = ['work', 'personal', 'shopping', 'health', 'other'];
const PRIORITIES = ['high', 'medium', 'low'];

export default function TaskForm() {
  // STATE: Each form field has its own state
  // https://react.dev/learn/reacting-to-input-with-state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [priority, setPriority] = useState('medium');

  // REFS: Access DOM elements directly
  // useRef returns { current: initialValue } — persists across renders
  // Unlike state, changing ref.current does NOT trigger a re-render
  const titleInputRef = useRef(null);

  // Context: get dispatch function to send actions to reducer
  const dispatch = useTaskDispatch();

  /**
   * Event Handler: Form submission
   *
   * KEY CONCEPT: Responding to Events
   * https://react.dev/learn/responding-to-events
   *
   * BEST PRACTICE: Prevent default form behavior,
   * validate input, then dispatch action.
   */
  function handleSubmit(e) {
    // Prevent page reload (default form behavior)
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      // DOM Manipulation with Refs: focus the input
      // https://react.dev/learn/manipulating-the-dom-with-refs
      titleInputRef.current.focus();
      return;
    }

    // Dispatch action to reducer
    dispatch({
      type: 'ADD_TASK',
      payload: { title: title.trim(), description: description.trim(), category, priority },
    });

    // Reset form state
    setTitle('');
    setDescription('');
    setCategory('other');
    setPriority('medium');

    // Re-focus input for quick entry of multiple tasks
    titleInputRef.current.focus();
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 className="section-title">➕ Add New Task</h2>

      <div className="form-group">
        <label htmlFor="task-title">Title *</label>
        {/* Controlled Input Pattern:
            The input's value is driven by React state.
            onChange updates the state → React re-renders → input shows new value.
            See: https://react.dev/learn/reacting-to-input-with-state */}
        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // ref attribute: connects this DOM element to our ref variable
          ref={titleInputRef}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-desc">Description</label>
        <input
          id="task-desc"
          type="text"
          placeholder="Optional details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category">Category</label>
          <select
            id="task-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Rendering Lists: map over array to generate JSX
                https://react.dev/learn/rendering-lists */}
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <span style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            Priority
          </span>
          {/* Radio buttons — another controlled input pattern */}
          <div className="radio-group">
            {PRIORITIES.map((p) => (
              <label key={p}>
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  // Controlled: checked is driven by state
                  checked={priority === p}
                  onChange={(e) => setPriority(e.target.value)}
                />
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

