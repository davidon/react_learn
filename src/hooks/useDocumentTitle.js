/**
 * useDocumentTitle.js — A Custom Hook for Side Effects
 *
 * KEY CONCEPT: Reusing Logic with Custom Hooks
 * https://react.dev/learn/reusing-logic-with-custom-hooks
 *
 * Custom Hooks let you extract component logic into reusable functions.
 * Rules:
 *   1. Name must start with "use" (e.g., useDocumentTitle)
 *   2. Can call other Hooks (useState, useEffect, etc.)
 *   3. Can be called only at the top level of a component or another Hook
 *
 * KEY CONCEPT: You Might Not Need an Effect
 * https://react.dev/learn/you-might-not-need-an-effect
 * Effects are for synchronizing with external systems (DOM, network, etc.)
 * document.title IS an external system → Effect is appropriate here.
 */
import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // BEST PRACTICE: Cleanup function in Effects
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
    // Return a cleanup function to restore the previous title
    // when the component unmounts or the title changes.
    return () => {
      document.title = previousTitle;
    };
  }, [title]); // Re-run only when title changes
}

