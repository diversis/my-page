import { useEffect, useState, PointerEvent } from "react";

export const useWindowPointerDown = () => {
    const [clicks, setClicks] = useState<
        | {
            [key in keyof string]: {
                x: number;
                y: number;
            };
        }
        | {}
    >({});

    const handlePointerDown = async (
        event: PointerEventInit
    ) => {
        const timeKey = Date.now();
        await setClicks((state) => ({
            ...state,
            [timeKey]: {
                x: event.clientX || 0,
                y: event.clientY || 0,
            },
        }));
        setTimeout(
            async () =>
                setClicks((state) => {
                    const clickState = { ...state };
                    delete clickState[timeKey];
                    return clickState;
                }),
            2100
        );
    };

    useEffect(() => {

        window.addEventListener('pointerdown', handlePointerDown, { passive: true });

        return () => {
            window.removeEventListener(
                'pointerdown',
                handlePointerDown
            );
        };
    }, []);
    return clicks
}