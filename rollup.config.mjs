import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import image from "@rollup/plugin-image";
import pkg from "./package.json" assert { type: "json" };

const config = {
  input: "./src/index.ts",
  output: [
    {
      dir: pkg.main,
      format: "cjs",
      preserveModules: true,
      interop: "auto",
      exports: "named"
    },
    {
      dir: pkg.module,
      format: "esm",
      preserveModules: true,
    },
  ],
  external: Object.keys(pkg.dependencies).map((packageName) => new RegExp(`^${packageName}(\/.*)?`)),
  plugins: [peerDepsExternal(), image(), resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
};

export default config;
