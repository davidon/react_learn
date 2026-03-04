/**
 * taskReducer.js — Centralized State Logic with useReducer
 *
 * KEY CONCEPT: Extracting State Logic into a Reducer
 * https://react.dev/learn/extracting-state-logic-into-a-reducer
 *
 * A reducer is a PURE FUNCTION that takes (state, action) and returns new state.
 * Benefits:
 *   - All state transitions in one place (easy to read & debug)
 *   - Each action describes "what happened", not "how to update"
 *   - Pure functions are easy to test
 *
 * BEST PRACTICE: Keeping Components Pure
 * https://react.dev/learn/keeping-components-pure
 * Reducers must be pure — same input always produces same output,
 * no side effects (no API calls, no localStorage here).
 *
 * KEY CONCEPT: Updating Objects and Arrays in State
 * https://react.dev/learn/updating-objects-in-state
 * https://react.dev/learn/updating-arrays-in-state
 * NEVER mutate state directly! Always return new objects/arrays.
 * Use spread operator (...) to create copies.
 */

// Initial state shape — demonstrates Choosing the State Structure
// https://react.dev/learn/choosing-the-state-structure
// BEST PRACTICE:
//   1. Group related state — tasks + filters together
//   2. Avoid redundant state — don't store "completedTasks" separately
//   3. Avoid duplication — don't copy task data into filter state
//   4. Avoid deeply nested state — keep tasks flat
export const initialState = {
  tasks: [],
  filter: {
    status: 'all',     // 'all' | 'active' | 'completed'
    category: 'all',   // 'all' | 'work' | 'personal' | 'shopping' | 'health' | 'other'
    priority: 'all',   // 'all' | 'high' | 'medium' | 'low'
  },
  sortBy: 'newest', // 'newest' | 'oldest' | 'priority'
};

export function taskReducer(state, action) {
  switch (action.type) {
    // Adding to an array: use spread to create new array
    // https://react.dev/learn/updating-arrays-in-state#adding-to-an-array
    case 'ADD_TASK': {
      const newTask = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description || '',
        category: action.payload.category || 'other',
        priority: action.payload.priority || 'medium',
        completed: false,
        createdAt: Date.now(),
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks], // prepend new task
      };
    }

    // Removing from an array: use filter to create new array without the item
    // https://react.dev/learn/updating-arrays-in-state#removing-from-an-array
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }

    // Updating an object in an array: use map + spread
    // https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
    case 'TOGGLE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed } // spread creates a new object
            : task
        ),
      };
    }

    // Replacing an item: map + spread with merged payload
    case 'EDIT_TASK': {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    }

    // Updating nested objects: spread at each level
    // https://react.dev/learn/updating-objects-in-state#updating-a-nested-object
    case 'SET_FILTER': {
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.key]: action.payload.value,
        },
      };
    }

    case 'SET_SORT': {
      return {
        ...state,
        sortBy: action.payload,
      };
    }

    // Initialize from localStorage (used by TaskProvider)
    case 'LOAD_TASKS': {
      return {
        ...state,
        tasks: action.payload,
      };
    }

    default:
      // BEST PRACTICE: Throw on unknown actions to catch bugs early
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

