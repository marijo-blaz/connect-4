/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: "#7945FF",
                darkPurple: "#5C2DD5",
                orange: "#FFCE67",
                red: "#FD6687",
                white: "#FFFFFF",
            },
            keyframes: {
                moveDown: {
                    "0%": { transform: "translateY(-380px) scale(1,1)" },
                    "70%": { transform: "translateY(0px)" },
                    "72%": { transform: "translateY(-15px) scale(0.9,1)" },
                    "90%": { transform: "translateY(0px)" },
                    "92%": { transform: "translateY(-5px) scale(0.9,1)" },
                    "100%": { transform: "translateY(0px)" },
                },
            },
            animation: {
                moveDown: "moveDown 0.6s cubic-bezier(.73,-0.01,.49,.99)",
            },
        },
    },
    plugins: [],
};
