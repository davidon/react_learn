/**
 * CategoryBadge.jsx — Pure Presentational Component
 *
 * KEY CONCEPT: Keeping Components Pure
 * https://react.dev/learn/keeping-components-pure
 *
 * A pure component:
 *   - Minds its own business — doesn't change objects/variables that existed before
 *   - Same inputs, same output — given same props, always returns same JSX
 *   - No side effects during render
 *
 * This is the simplest kind of component: takes props, returns JSX.
 * No state, no effects, no context. Just a pure function of its input.
 */

export default function CategoryBadge({ category }) {
  return <span className={`badge badge-${category}`}>{category}</span>;
}

export function PriorityBadge({ priority }) {
  return <span className={`badge badge-${priority}`}>{priority}</span>;
}

