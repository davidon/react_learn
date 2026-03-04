/**
 * ScrollToTopButton.jsx — DOM Manipulation with Refs
 *
 * KEY CONCEPT: Manipulating the DOM with Refs
 * https://react.dev/learn/manipulating-the-dom-with-refs
 *
 * Sometimes you need to access the actual DOM nodes managed by React.
 * For example, to focus an input, scroll to an element, or measure dimensions.
 * Refs give you a direct reference to a DOM node.
 *
 * KEY CONCEPT: Referencing Values with Refs
 * https://react.dev/learn/referencing-values-with-refs
 * Refs are "escape hatches" from the React data flow.
 * Unlike state, changing a ref does NOT trigger a re-render.
 * Use refs for values that don't affect the visual output.
 *
 * This component also demonstrates:
 * - useEffect for subscribing to DOM events (scroll)
 * - Cleanup functions in Effects
 * - useState for toggling visibility
 */
import { useState, useEffect } from 'react';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);


  // KEY CONCEPT: Synchronizing with Effects
  // https://react.dev/learn/synchronizing-with-effects
  //
  // Effects run AFTER render and let you synchronize with external systems.
  // Here we subscribe to the window's scroll event (an external system).
  useEffect(() => {
    function handleScroll() {
      // Show button when user scrolls down more than 300px
      setIsVisible(window.scrollY > 300);
    }

    // Subscribe to scroll event
    window.addEventListener('scroll', handleScroll);

    // CLEANUP FUNCTION: Called when component unmounts or before re-running
    // https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
    // Always clean up event listeners to prevent memory leaks!
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty deps = subscribe once on mount, cleanup on unmount


  // Conditional rendering: don't render the button when not needed
  if (!isVisible) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      ⬆️
    </button>
  );
}

