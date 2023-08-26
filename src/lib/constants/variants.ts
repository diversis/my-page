import { Variants } from "framer-motion";

export const OPACITY_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};
