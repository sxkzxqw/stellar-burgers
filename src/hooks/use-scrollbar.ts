import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

const config = {};

const useScrollbar = (root: { current: HTMLDivElement }, hasScroll: boolean) => {
    useEffect(() => {
        let scrollbars: any

        if (root.current && hasScroll) {
            scrollbars = OverlayScrollbars(root.current, config)
        }

        console.log(scrollbars);

        return () => {
            if (scrollbars) {
                scrollbars.destroy();
            }
        }
    }, [root, hasScroll])
};

export { useScrollbar };