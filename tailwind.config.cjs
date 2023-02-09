/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: "#7945FF",
                orange: "#FFCE67",
                red: "#FD6687",
                white: "#FFFFFF",
            },
            keyframes: {
                moveDown: {
                    "0%": { transform: "translateY(-380px)" },
                    "100%": { transform: "translateY(0px)" },
                },
            },
            animation: {
                moveDown: "moveDown 0.75s cubic-bezier(.75,0,.73,1.25)",
            },
        },
    },
    plugins: [],
};
