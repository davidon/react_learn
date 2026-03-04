/**
 * TaskEditModal.jsx — Modal with Key-based State Reset
 *
 * KEY CONCEPT: Preserving and Resetting State
 * https://react.dev/learn/preserving-and-resetting-state
 *
 * React preserves state for components that are rendered in the same
 * position in the tree. To RESET state when switching between items,
 * use the `key` prop. When the key changes, React destroys the old
 * component and creates a new one with fresh state.
 *
 * PATTERN: Key-based State Reset
 * <TaskEditModal key={task.id} task={task} />
 * When editing a different task, the key changes → React creates a new
 * instance → local state is initialized with the new task's data.
 * This is THE recommended way to reset form state for different items.
 */
import { useState, useEffect, useRef } from 'react';

export default function TaskEditModal({ task, onSave, onClose }) {
  // Local state initialized from props
  // Because parent uses key={task.id}, this state resets when editing a different task
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);

  // Ref for auto-focusing the title input when modal opens
  const titleRef = useRef(null);

  useEffect(() => {
    // Focus on mount — this is a legitimate use of Effects
    // because we're synchronizing with the DOM (an external system)
    titleRef.current?.focus();
  }, []); // Empty deps = run once on mount

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: task.id,
      updates: {
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
      },
    });
  }

  return (
    // Modal overlay — clicking backdrop closes the modal
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Edit task"
    >
      {/* Stop propagation so clicking inside modal doesn't close it
          https://react.dev/learn/responding-to-events#stopping-propagation */}
      <div className="modal" onClick={(e) => e.stopPropagation()} role="document">
        <h3>✏️ Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-desc">Description</label>
            <input
              id="edit-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-category">Category</label>
              <select
                id="edit-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {['work', 'personal', 'shopping', 'health', 'other'].map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edit-priority">Priority</label>
              <select
                id="edit-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {['high', 'medium', 'low'].map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

