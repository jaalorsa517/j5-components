const path = require("path");
const { defineConfig } = require("vite");
import typescript from "rollup-plugin-typescript2";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "libComponents",
    },
  },
  plugins: [
    {
      ...typescript({ check: false }),
    },
  ],
});
