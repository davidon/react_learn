/**
 * TaskContext.jsx — Task State with Reducer + Context
 *
 * KEY CONCEPT: Scaling Up with Reducer and Context
 * https://react.dev/learn/scaling-up-with-reducer-and-context
 *
 * PATTERN: Combine useReducer (for complex state logic) with Context
 * (for deep passing) to manage state that many components need.
 *
 * This pattern is so common it's essentially a lightweight Redux:
 *   - Reducer handles all state transitions (predictable, testable)
 *   - Context distributes state + dispatch to the component tree
 *   - Components dispatch actions instead of calling setState
 *
 * KEY CONCEPT: useReducer
 * https://react.dev/learn/extracting-state-logic-into-a-reducer
 * useReducer(reducer, initialState) returns [state, dispatch]
 * Call dispatch({ type: 'ACTION_NAME', payload: data }) to update state.
 */
import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { taskReducer, initialState } from '../reducers/taskReducer';

// Separate contexts for state and dispatch
// BEST PRACTICE: This prevents components that only dispatch from
// re-rendering when state changes.
const TaskStateContext = createContext(null);
const TaskDispatchContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // KEY CONCEPT: Synchronizing with Effects
  // https://react.dev/learn/synchronizing-with-effects
  // Load tasks from localStorage on mount (empty dependency array = once)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage:', e);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // KEY CONCEPT: State as a Snapshot
  // https://react.dev/learn/state-as-a-snapshot
  // Each render sees its own "snapshot" of state.
  // When you dispatch an action, React schedules a re-render with the NEW state.

  // Memoize the state value to avoid unnecessary context re-renders
  const stateValue = useMemo(() => state, [state]);

  return (
    <TaskStateContext.Provider value={stateValue}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

// Custom hooks for consuming the contexts
export function useTaskState() {
  const context = useContext(TaskStateContext);
  if (context === null) {
    throw new Error('useTaskState must be used within a TaskProvider');
  }
  return context;
}

export function useTaskDispatch() {
  const context = useContext(TaskDispatchContext);
  if (context === null) {
    throw new Error('useTaskDispatch must be used within a TaskProvider');
  }
  return context;
}

