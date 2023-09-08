/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["three"],
	async redirects() {
		return [
			{
				source: "/github",
				destination: "https://github.com/diversis",
				permanent: false,
			},
		];
	},
	i18n: {
        locales: ["default", "en-US", "ru-RU"],
        defaultLocale: "ru-RU",
        localeDetection: true,
    },
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};

module.exports = nextConfig;
