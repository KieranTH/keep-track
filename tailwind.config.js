/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
    "./sheets/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1f9af1",
        "primary-content": "#ffffff",
        "primary-dark": "#0d7fd0",
        "primary-light": "#4fb0f4",

        secondary: "#f11f42",
        "secondary-content": "#ffffff",
        "secondary-dark": "#d00d2e",
        "secondary-light": "#f44f6a",

        "background-dark": "#1a1a1a",
        "foreground-dark": "#262626",
        "border-dark": "#404040",

        "background-light": "#f0f0f0",
        "foreground-light": "#fbfbfb",
        "border-light": "#dfdfdf",

        "copy-dark": "#fbfbfb",
        "copy-dark-light": "#d9d9d9",
        "copy-dark-lighter": "#a6a6a6",

        "copy-light": "#262626",
        "copy-light-light": "#666666",
        "copy-light-lighter": "#8c8c8c",

        success: "#1ff11f",
        warning: "#f1f11f",
        error: "#f11f1f",

        "success-content": "#011001",
        "warning-content": "#101001",
        "error-content": "#ffffff",
      },
    },
  },
  plugins: [],
};
