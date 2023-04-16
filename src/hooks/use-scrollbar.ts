import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

const config = {};

const useScrollbar = (root: any, hasScroll: boolean) => {
    useEffect(() => {
        let scrollbars: any;

        if (root.current && hasScroll) {
            scrollbars = OverlayScrollbars(root.current, config)
        }

        return () => {
            if (scrollbars) {
                scrollbars.destroy();
            }
        }
    }, [root, hasScroll])
};

export { useScrollbar };