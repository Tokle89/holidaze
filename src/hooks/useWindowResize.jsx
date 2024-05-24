import { useEffect } from "react";

/**
 *  A custom hook that sets the navigation and mobile to be closed when the window is resized to the to bigger or smaller than the given breakpoint.
 * @param {Function} setShowMenu - A function that sets the mobile menu to be closed
 * @param {Function} isOpen - A function that sets the navigation menu to be closed
 * @returns {void}
 * @example
 * UseWindowResizeEffect(setShowMenu, isOpen);
 */
const UseWindowResizeEffect = (setShowMenu, isOpen) => {
  useEffect(() => {
    const mobileQuery = window.matchMedia("(min-width: 976px)");
    const pcQuery = window.matchMedia("(max-width: 976px)");

    const handleResize = () => {
      if (mobileQuery.matches) {
        setShowMenu(false);
      } else if (pcQuery.matches) {
        isOpen(false);
      }
    };

    mobileQuery.addListener(handleResize);
    handleResize();

    return () => {
      mobileQuery.removeListener(handleResize);
    };
  }, [setShowMenu, isOpen]);
};

export default UseWindowResizeEffect;
