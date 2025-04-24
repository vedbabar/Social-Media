import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				'twitter-blue': '#1D9BF0', // Twitter's exact blue color
				'twitter-blue-hover': '#1A8CD8', // Slightly darker for hover state
				'primary': '#1D9BF0',
				'secondary': '#181818',
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			"light",
			{
				black: {
					primary: "#1D9BF0",         // Twitter Blue
					secondary: "#192734",       // Card background
					accent: "#1D9BF0",
					neutral: "#15202B",         // Deep background
					"base-100": "#15202B",      // Main background
					"base-200": "#192734",      // Secondary surfaces
					"base-300": "#22303C",      // Optional
					"base-content": "#E7E9EA",  // Text color
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
		],
	},
};
