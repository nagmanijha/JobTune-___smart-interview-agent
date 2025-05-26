/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    "@tailwindcss/postcss": {}, // ✅ updated plugin
    "autoprefixer": {},
  },
};

export default config;
