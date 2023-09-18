import Head from "next/head";

const DOMAIN = "https://diversis.vercel.app";

export default function Meta({
	title = "My Page",
	description = "My Page",
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
			<meta
				property='og:logo'
				content={image}></meta>
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
