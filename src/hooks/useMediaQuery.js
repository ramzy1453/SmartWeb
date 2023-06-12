import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [breakpoints, setBreakpoints] = useState({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      setBreakpoints({
        isXs: window.matchMedia("(max-width: 575px)").matches,
        isSm: window.matchMedia("(min-width: 576px) and (max-width: 767px)")
          .matches,
        isMd: window.matchMedia("(min-width: 768px) and (max-width: 991px)")
          .matches,
        isLg: window.matchMedia("(min-width: 992px) and (max-width: 1199px)")
          .matches,
        isXl: window.matchMedia("(min-width: 1200px)").matches,
      });
    };

    window.addEventListener("resize", updateBreakpoints);

    // Call it once to set initial value
    updateBreakpoints();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return breakpoints;
};

export default useMediaQuery;
