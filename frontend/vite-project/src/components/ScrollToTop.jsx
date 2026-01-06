import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    const scrollToTop = () => {
        // Target the #root element which is the actual scroll container
        const root = document.getElementById('root');
        if (root) {
            root.scrollTop = 0;
        }
        // Also try these as fallbacks
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    // useLayoutEffect runs synchronously before browser paint
    useLayoutEffect(() => {
        scrollToTop();

        // Use requestAnimationFrame to ensure DOM has been updated
        requestAnimationFrame(() => {
            scrollToTop();
        });
    }, [pathname]);

    // Multiple fallback timeouts to handle async content loading
    useEffect(() => {
        scrollToTop();

        // Immediate timeout
        const timeout1 = setTimeout(scrollToTop, 0);
        // Short delay for fast loading content
        const timeout2 = setTimeout(scrollToTop, 50);
        // Longer delay for slower loading content
        const timeout3 = setTimeout(scrollToTop, 100);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, [pathname]);

    return null;
};

export default ScrollToTop;
