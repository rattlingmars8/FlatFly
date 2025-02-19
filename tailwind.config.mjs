/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2A4D69",
                accent: "#F4A261",
                background: "#F8F9FA",
                text: "#333E50",
                borderGray: "#E0E5EC",
            },
        },
    },
    plugins: [],
};
