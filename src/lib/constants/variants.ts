import { Variants } from "framer-motion";

export const SPRING_2 = {
    type: "spring",
    stiffness: 320,
    damping: 32,
};

export const SPRING_LIGHT = {
    type: "spring",
    stiffness: 120,
    damping: 14,
};

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

export const THEME_TOGGLE_VARIANTS: Variants = {
    hidden: {
        rotate: '180deg',
    },
    visible: {
        rotate: '0deg',
        transition: SPRING_LIGHT,
    },
    exit: {
        rotate: '-180deg',
        transition: SPRING_LIGHT,
    },
};

export const SLIDE_Y_VARIANTS: Variants = {
    hidden: {
        translateY: "-100%",
        opacity: 0,
        transition: SPRING_2,
    },
    visible: {
        translateY: "0%",
        opacity: 1,
        transition: {
            ...SPRING_2,
        },
    },
    exit: {
        translateY: "-100%",
        opacity: 0,
        transition: {
            ...SPRING_2,
        },
    },
};

export const STAGGER_VARIANTS: Variants = {
    hidden: {},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            staggerChildren: 0.1,
            when: "beforeChildren",
        },
    },
    exit: {
        transition: {
            duration: 0.2,
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren",
        },
    },
};
