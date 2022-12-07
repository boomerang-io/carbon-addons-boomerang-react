import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import image from "@rollup/plugin-image";
import pkg from "./package.json" assert { type: "json" };

const config = {
  input: "./src/index.ts",
  output: [
    {
      dir: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: pkg.module,
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
  ],
  external: Object.keys(pkg.dependencies).map((packageName) => new RegExp(`^${packageName}(\/.*)?`)),
  plugins: [peerDepsExternal(), image(), resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser()],
};

export default config;
