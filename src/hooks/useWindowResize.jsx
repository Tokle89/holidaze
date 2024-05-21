import { useEffect } from "react";

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
