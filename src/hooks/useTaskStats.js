/**
 * useTaskStats.js — Derived State with useMemo
 *
 * KEY CONCEPT: useMemo — Caching Expensive Calculations
 * https://react.dev/reference/react/useMemo
 *
 * useMemo lets you cache the result of a calculation between re-renders.
 * React will only recompute the memoized value when one of the dependencies changes.
 *
 * WHEN TO USE useMemo:
 *   ✅ Expensive calculations (filtering/sorting large arrays)
 *   ✅ Derived data used in multiple places
 *   ✅ Values passed as props to memo()-wrapped components
 *   ❌ Simple calculations (overhead of memoization > cost of recomputing)
 *
 * BEST PRACTICE: Don't store derived state in useState!
 * Instead, compute it during rendering with useMemo.
 * See: https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state
 */
import { useMemo } from 'react';

export function useTaskStats(tasks) {
  // useMemo(calculateFn, dependencies)
  // Only recalculates when `tasks` array reference changes
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;

    // Group by category
    const byCategory = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    // Group by priority
    const byPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, byCategory, byPriority, completionRate };
  }, [tasks]);

  return stats;
}

