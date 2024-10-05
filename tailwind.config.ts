import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container: {
		center: true,
		padding: "15px",
	},
	screens: {
		sm: '640px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
	},
	fontFamily: {
		primary: 'var(--font-jetbrainsMono)',
	},
  	extend: {
		colors: {
			primary: '#000000',
			accent: {
				DEFAULT: "#CFB53B",
				hover: "#d4af37",
			}
		},
		keyframes:{
			"accordion-down": {
				from: {height: "0"},
				to: { height: "var(--radix-accordion-content-height)"},
			},
			"accordion-up": {
				from: {height: "var(--radix-accordion-content-height)"},
				to: { height: "0"},
			},
  		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
		}
	},
  },
  plugins: [animate],
};
export default config;
