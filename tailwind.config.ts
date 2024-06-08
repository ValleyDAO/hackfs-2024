import type { Config } from "tailwindcss";

const config: Config = {
	content: ["{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"],
	theme: {
		extend: {
			fontSize: {
				xs: "0.85rem",
				sm: "0.95rem",
				base: "1.05rem",
				lg: "1.1rem",
				xl: "1.25rem",
			},
			backgroundColor: {
				primary: "#004560",
				secondary: "#287a93",
				third: "#91d3e2",
			},
			borderColor: {
				primary: "#004560",
				secondary: "#287a93",
				third: "#91d3e2",
			},
			colors: {
				primary: "#004560",
				secondary: "#287a93",
				third: "#91d3e2",
			},
		},
	},
	plugins: [],
};
export default config;
