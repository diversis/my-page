import { useEffect, useState } from "react";

export const usePointerPosition = () => {
    const [pointerPosition, setPointerPosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });


    useEffect(() => {
        const handlePointerMove = async (e: PointerEventInit
        ) => {
            setPointerPosition({
                x: e.clientX || 0,
                y: e.clientY || 0,
            });
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener(
                'pointermove',
                handlePointerMove
            );
        };
    }, []);
    return pointerPosition
}