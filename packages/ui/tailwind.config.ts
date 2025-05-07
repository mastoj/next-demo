import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../packages/**/*.{js,ts,jsx,tsx}", // 👈 Include shared packages
  ],
};

export default config;

// module.exports = {
//   content: [
//     "../../packages/**/*.{js,ts,jsx,tsx}", // 👈 Include shared packages

//   ],
// };
