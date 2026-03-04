# 📋 React Learn App — Task Manager

A comprehensive **React learning application** that covers virtually every topic from [react.dev/learn](https://react.dev/learn) in a single, cohesive Task Manager app. Every file is heavily commented with key concepts, best practices, and links back to the official documentation.

> **Purpose**: This project serves as a living reference for learning React. Read the code, read the comments, build it, and experiment!

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- npm ≥ 9 (comes with Node.js)

### Install Dependencies

```bash
npm install
```

### Run with Vite (Recommended)

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

### Run with Webpack (Alternative)

```bash
npm run webpack:dev
```

Opens at [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
# Vite
npm run build
npm run preview    # Preview the production build locally

# Webpack
npm run webpack:build
```

---

## 📁 Project Structure

```
react/
├── index.html                  # Single HTML entry point
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration (primary bundler)
├── webpack.config.js           # Webpack configuration (alternative)
├── vercel.json                 # Vercel deployment config
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD
├── src/
│   ├── main.jsx                # App entry — createRoot, StrictMode, Providers
│   ├── App.jsx                 # Root component — composition pattern
│   ├── index.css               # Global styles with CSS custom properties
│   ├── components/
│   │   ├── Header.jsx          # Presentational component, composition
│   │   ├── ThemeToggle.jsx     # Context consumer, event handling
│   │   ├── TaskForm.jsx        # Controlled inputs, refs, events, state
│   │   ├── FilterBar.jsx       # Shared state, lifting state up
│   │   ├── TaskList.jsx        # Lists, keys, conditional rendering, useCallback
│   │   ├── TaskItem.jsx        # memo(), props, event handler props
│   │   ├── TaskEditModal.jsx   # Key-based state reset, preserving state
│   │   ├── Dashboard.jsx       # useMemo, derived state, pure rendering
│   │   ├── CategoryBadge.jsx   # Pure presentational component
│   │   └── ScrollToTopButton.jsx # Refs, DOM manipulation, Effects cleanup
│   ├── context/
│   │   ├── ThemeContext.jsx     # Context API, Provider pattern, useCallback
│   │   └── TaskContext.jsx      # Reducer + Context, separate dispatch context
│   ├── hooks/
│   │   ├── useTaskStats.js     # Custom hook, useMemo for derived data
│   │   └── useDocumentTitle.js # Custom hook, Effect with cleanup
│   └── reducers/
│       └── taskReducer.js      # Pure reducer, immutable updates, state structure
```

---

## 📚 React Concept Map

Every major topic from [react.dev/learn](https://react.dev/learn) is covered. Here's where to find each concept:

### 1. Describing the UI

| Concept | File(s) | Docs |
|---|---|---|
| Your First Component | `App.jsx`, all components | [→ Link](https://react.dev/learn/your-first-component) |
| Importing/Exporting Components | All files use ES modules | [→ Link](https://react.dev/learn/importing-and-exporting-components) |
| Writing Markup with JSX | `App.jsx`, `Header.jsx` | [→ Link](https://react.dev/learn/writing-markup-with-jsx) |
| JavaScript in JSX with `{}` | `Dashboard.jsx`, `TaskItem.jsx` | [→ Link](https://react.dev/learn/javascript-in-jsx-with-curly-braces) |
| Passing Props | `TaskItem.jsx`, `CategoryBadge.jsx`, `Dashboard.jsx` | [→ Link](https://react.dev/learn/passing-props-to-a-component) |
| Conditional Rendering | `TaskList.jsx`, `TaskItem.jsx`, `Dashboard.jsx` | [→ Link](https://react.dev/learn/conditional-rendering) |
| Rendering Lists | `TaskList.jsx`, `TaskForm.jsx`, `FilterBar.jsx`, `Dashboard.jsx` | [→ Link](https://react.dev/learn/rendering-lists) |
| Keeping Components Pure | `taskReducer.js`, `CategoryBadge.jsx`, `Dashboard.jsx` | [→ Link](https://react.dev/learn/keeping-components-pure) |

### 2. Adding Interactivity

| Concept | File(s) | Docs |
|---|---|---|
| Responding to Events | `ThemeToggle.jsx`, `TaskForm.jsx`, `TaskItem.jsx` | [→ Link](https://react.dev/learn/responding-to-events) |
| State: A Component's Memory | `TaskForm.jsx`, `ThemeContext.jsx` | [→ Link](https://react.dev/learn/state-a-components-memory) |
| Render and Commit | `main.jsx` | [→ Link](https://react.dev/learn/render-and-commit) |
| State as a Snapshot | `TaskContext.jsx`, `TaskEditModal.jsx` | [→ Link](https://react.dev/learn/state-as-a-snapshot) |
| Queueing State Updates | `taskReducer.js` (dispatch batching) | [→ Link](https://react.dev/learn/queueing-a-series-of-state-updates) |
| Updating Objects in State | `taskReducer.js` (`EDIT_TASK`, `SET_FILTER`) | [→ Link](https://react.dev/learn/updating-objects-in-state) |
| Updating Arrays in State | `taskReducer.js` (`ADD_TASK`, `DELETE_TASK`, `TOGGLE_TASK`) | [→ Link](https://react.dev/learn/updating-arrays-in-state) |

### 3. Managing State

| Concept | File(s) | Docs |
|---|---|---|
| Reacting to Input with State | `TaskForm.jsx` (controlled inputs) | [→ Link](https://react.dev/learn/reacting-to-input-with-state) |
| Choosing the State Structure | `taskReducer.js` (`initialState`) | [→ Link](https://react.dev/learn/choosing-the-state-structure) |
| Sharing State Between Components | `FilterBar.jsx` ↔ `TaskList.jsx` via context | [→ Link](https://react.dev/learn/sharing-state-between-components) |
| Preserving and Resetting State | `TaskEditModal.jsx` (`key` prop reset) | [→ Link](https://react.dev/learn/preserving-and-resetting-state) |
| Extracting Logic into a Reducer | `taskReducer.js`, `TaskContext.jsx` | [→ Link](https://react.dev/learn/extracting-state-logic-into-a-reducer) |
| Passing Data Deeply with Context | `ThemeContext.jsx`, `TaskContext.jsx` | [→ Link](https://react.dev/learn/passing-data-deeply-with-context) |
| Scaling Up with Reducer + Context | `TaskContext.jsx` + `taskReducer.js` | [→ Link](https://react.dev/learn/scaling-up-with-reducer-and-context) |

### 4. Escape Hatches

| Concept | File(s) | Docs |
|---|---|---|
| Referencing Values with Refs | `TaskForm.jsx`, `ScrollToTopButton.jsx` | [→ Link](https://react.dev/learn/referencing-values-with-refs) |
| Manipulating the DOM with Refs | `TaskForm.jsx` (focus), `TaskEditModal.jsx` | [→ Link](https://react.dev/learn/manipulating-the-dom-with-refs) |
| Synchronizing with Effects | `ThemeContext.jsx`, `TaskContext.jsx`, `ScrollToTopButton.jsx` | [→ Link](https://react.dev/learn/synchronizing-with-effects) |
| You Might Not Need an Effect | `useDocumentTitle.js` (this one IS appropriate) | [→ Link](https://react.dev/learn/you-might-not-need-an-effect) |
| Reusing Logic with Custom Hooks | `useTaskStats.js`, `useDocumentTitle.js` | [→ Link](https://react.dev/learn/reusing-logic-with-custom-hooks) |
| `useMemo` | `useTaskStats.js`, `TaskList.jsx` | [→ Link](https://react.dev/reference/react/useMemo) |
| `useCallback` | `TaskList.jsx`, `ThemeContext.jsx` | [→ Link](https://react.dev/reference/react/useCallback) |
| `memo` | `TaskItem.jsx` | [→ Link](https://react.dev/reference/react/memo) |

---

## 🏗️ Build Tool Configs

### Vite (`vite.config.js`)

```js
// Primary dev/build tool — fast HMR, ES modules, simple config
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  base: '/',  // Change to '/repo-name/' for GitHub Pages
});
```

**Why Vite?** Instant dev server startup, native ES module support, blazing fast HMR (Hot Module Replacement). [Learn more](https://vitejs.dev/guide/why.html)

### Webpack (`webpack.config.js`)

Included as an alternative/learning reference. Webpack requires more configuration (loaders, plugins) but is more established and configurable for complex setups. [Learn more](https://webpack.js.org/concepts/)

---

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Update `vite.config.js`** — Set `base` to your repository name:

   ```js
   base: '/your-repo-name/',
   ```

2. **Enable GitHub Pages** in your repo:
   - Go to Settings → Pages → Source → **GitHub Actions**

3. **Push to `main`** — The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy.

4. **Manual deploy** (alternative):

   ```bash
   npm run build:gh-pages
   # Upload the `dist/` folder to your GitHub Pages branch
   ```

### Deploy to Vercel

**Option A: CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

**Option B: Git Integration**

1. Push your repo to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Vite — click **Deploy**

The included `vercel.json` handles SPA routing (all paths → `index.html`).

**Option C: Manual**

```bash
npm run build
# Upload the `dist/` folder via Vercel dashboard
```

---

## 🎯 Key Patterns & Best Practices Summary

| Pattern | Where | Why |
|---|---|---|
| **Provider Composition** | `main.jsx` | Wrap app in context providers at the top |
| **Reducer + Context** | `TaskContext.jsx` | Scalable state management without libraries |
| **Separate State/Dispatch Contexts** | `TaskContext.jsx` | Components that only dispatch don't re-render on state changes |
| **Custom Hooks** | `hooks/` folder | Extract & reuse stateful logic |
| **memo + useCallback** | `TaskItem.jsx`, `TaskList.jsx` | Skip unnecessary re-renders in lists |
| **Key-based State Reset** | `TaskEditModal.jsx` | Reset component state when editing different items |
| **Controlled Inputs** | `TaskForm.jsx` | React state drives input values |
| **Derived State (not stored)** | `TaskList.jsx`, `useTaskStats.js` | Compute from source of truth, avoid redundant state |
| **Effect Cleanup** | `ScrollToTopButton.jsx` | Always clean up subscriptions/listeners |
| **Pure Components** | `CategoryBadge.jsx`, `taskReducer.js` | Same input → same output, no side effects |
| **Immutable State Updates** | `taskReducer.js` | Never mutate state; use spread `...` to create copies |

---

## 📖 Further Reading

- [React Documentation](https://react.dev/learn) — The official tutorial this app is based on
- [Thinking in React](https://react.dev/learn/thinking-in-react) — The mental model for building React apps
- [React API Reference](https://react.dev/reference/react) — Complete API docs
- [Vite Documentation](https://vitejs.dev/) — Build tool docs
- [Webpack Documentation](https://webpack.js.org/) — Alternative bundler docs

---

## 📝 License

MIT — Free to use for learning and reference.

