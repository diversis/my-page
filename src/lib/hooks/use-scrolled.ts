import { useCallback, useEffect, useState } from "react";

export default function useScrolled(threshold: number) {
    const [scrolled, setScrolled] = useState(false);

    const onScroll = useCallback(() => {
        setScrolled(window.scrollY > threshold);
    }, [threshold]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    return scrolled;
}
