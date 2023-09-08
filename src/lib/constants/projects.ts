import NextIcon from "@public/media/tech/next.svg";
import TailwindCSSIcon from "@public/media/tech/tailwindcss.svg";
import MUIIcon from "@public/media/tech/mui.svg";
import PrismaIcon from "@public/media/tech/prisma.svg";
import FramerIcon from "@public/media/tech/framer.svg";
import RadixUIIcon from "@public/media/tech/radixui.svg";
import TSIcon from "@public/media/tech/typescript.svg";
import JSIcon from "@public/media/tech/javascript.svg";
import CSS3Icon from "@public/media/tech/css3.svg";
import ViteIcon from "@public/media/tech/vite.svg";
import UnoCSSIcon from "@public/media/tech/unocss.svg";
import SvelteIcon from "@public/media/tech/svelte.svg";
import FrontendMentorIcon from "@public/media/tech/frontendmentor.svg";
import VercelIcon from "@public/media/tech/vercel.svg";

export const NEXTJS = { name: "NextJS", Icon: NextIcon };
export const TAILWINDCSS = {
    name: "TailwindCSS",
    Icon: TailwindCSSIcon,
};
export const MUI = { name: "MUI", Icon: MUIIcon };
export const PRISMA = { name: "Prisma", Icon: PrismaIcon };
export const FRAMER = {
    name: "Framer Motion",
    Icon: FramerIcon,
};
export const RADIX = {
    name: "Radix UI",
    Icon: RadixUIIcon,
};
export const TS = { name: "Typescript", Icon: TSIcon };
export const JS = { name: "Javascript", Icon: JSIcon };
export const CSS = { name: "CSS", Icon: CSS3Icon };
export const VITE = { name: "Vite", Icon: ViteIcon };
export const UNO = { name: "UnoCSS", Icon: UnoCSSIcon };
export const SVELTE = { name: "Svelte", Icon: SvelteIcon };

export const VERCEL = { name: "Vercel", Icon: VercelIcon };

type Tech = {
    name: string;
    Icon: any;
};

export type Project = {
    name: string;
    type: string;
    typeIcon?: any;
    hosting: Tech;
    tech: Tech[];
    webLink: string;
    gitHub: string;
    image: string;
};

export const PROJECTS: Project[] = [
    {
        name: "EAlien shop",
        type: "e-commerce",
        hosting: VERCEL,
        tech: [
            NEXTJS,
            TAILWINDCSS,
            TS,
            PRISMA,
            FRAMER,
            MUI,
        ],
        webLink: "https://ealien-app.vercel.app/",
        gitHub: "https://github.com/diversis/ealien_app",
        image: "ealien.png",
    },
    {
        name: "Space tourism multi-page website",
        type: "Frontend mentor challenge",
        typeIcon: FrontendMentorIcon,
        hosting: VERCEL,
        tech: [NEXTJS, TAILWINDCSS, TS, FRAMER],
        webLink:
            "https://space-tourism-next-beta.vercel.app/",
        gitHub: "https://github.com/diversis/space-tourism-next",
        image: "space.png",
    },
    {
        name: "URL shortening API landing page",
        type: "Frontend mentor challenge",
        typeIcon: FrontendMentorIcon,
        hosting: VERCEL,
        tech: [
            NEXTJS,
            TAILWINDCSS,
            TS,PRISMA,
            FRAMER,
            RADIX,
            
        ],
        webLink:
            "https://url-shortening-api-nine.vercel.app/",
        gitHub: "https://github.com/diversis/url-shortening-api",
        image: "shortly.png",
    },
    {
        name: "Interactive card details form",
        type: "Frontend mentor challenge",
        typeIcon: FrontendMentorIcon,
        hosting: VERCEL,
        tech: [JS, CSS, VITE],
        webLink: "https://interactive-details-form-ivory.vercel.app/",
        gitHub: "https://github.com/diversis/interactive-card-details-form",
        image: "ccdetails.png",
    },
    {
        name: "Clipboard landing page",
        type: "Frontend mentor challenge",
        typeIcon: FrontendMentorIcon,
        hosting: VERCEL,
        tech: [UNO, VITE],
        webLink: "https://clipboard-landing-mu.vercel.app/",
        gitHub: "https://github.com/diversis/clipboard-landing",
        image: "clipboard.png",
    },

    {
        name: "Multi-step form",
        type: "Frontend mentor challenge",
        typeIcon: FrontendMentorIcon,
        hosting: VERCEL,
        tech: [SVELTE, TAILWINDCSS, TS],
        webLink:
            "https://multi-step-form-diversis.vercel.app/",
        gitHub: "https://github.com/diversis/multi-step-form",
        image: "multistep.png",
    },
    {
        name: "REST Countries API with color theme switcher",
        type: "Frontend mentor challenge",
        typeIcon: FrontendMentorIcon,
        hosting: VERCEL,
        tech: [SVELTE, TAILWINDCSS, TS],
        webLink:
            "https://rest-countries-frontend-beta.vercel.app/",
        gitHub: "https://github.com/diversis/RestApiCountriesFrontend",
        image: "restcountries.png",
    },
];
