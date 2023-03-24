/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'gray': {
					'50': '#f7f8f9',
          '100': '#ebedee',
          '200': '#d1d4d7',
          '300': '#b5babf',
          '400': '#7d868f',
          '500': '#0f1922',
          '600': '#0d151e',
          '700': '#0a1018',
          '800': '#070c11',
					'900': '#04070a',
				}
			}
		},
	},
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography')
	],
}
