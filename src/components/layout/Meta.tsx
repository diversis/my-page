import Head from "next/head";
import { useRouter } from "next/router";

const DOMAIN = "https://diversis.vercel.app";

const localeData = require("@/locales/projects/card.json");

export default function Meta({
	title = "Diversis",
	description,
	image = `${DOMAIN}/media/hero.png`,
}: {
	title?: string;
	description?: string;
	image?: string;
}) {
	return (
		<Head>
			<link
				rel='icon'
				href='/media/hero.png'
			/>

			<meta charSet='utf-8' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<meta
				itemProp='image'
				content={image}
			/>
			<title>{title}</title>
			<meta
				name='description'
				content={description}
				key='description'
			/>
			<meta
				property='og:logo'
				content={image}
			/>
			<meta
				property='og:title'
				content={title}
			/>
			<meta
				property='og:description'
				content={description}
			/>
			<meta
				property='og:image'
				content={image}
			/>

			<meta
				name='twitter:card'
				content='summary_large_image'
			/>
			<meta
				name='twitter:site'
				content='@'
			/>
			<meta
				name='twitter:creator'
				content='@d1v3r515'
			/>
			<meta
				name='twitter:title'
				content={title}
			/>
			<meta
				name='twitter:description'
				content={description}
			/>
			<meta
				name='twitter:image'
				content={image}
			/>
		</Head>
	);
}
