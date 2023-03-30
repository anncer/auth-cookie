import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import path from "path";
import terser from "@rollup/plugin-terser";
import { fileURLToPath } from "node:url";
import pkg from "./package.json" assert { type: "json" };

const external = [...Object.keys(pkg.devDependencies)];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    input: path.resolve(__dirname, "src/index.ts"),
    external,
    cache: false,
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: false,
      },
      {
        file: pkg.main,
        exports: "named",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.global.js",
        name: "autoCookie",
        format: "iife",
        sourcemap: false,
      },
      {
        format: "umd",
        name: "autoCookie",
        file: `dist/index.min.js`,
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        // must specify tsconfig pathname
        tsconfig: path.resolve(__dirname, "tsconfig.node.json"),
        compilerOptions: {
          // https://github.com/Swatinem/rollup-plugin-dts/issues/147
          declarationDir: false ? undefined : "./types",
          declaration: true,
        }
      }),
    ],
  },
  {
    input: "./dist/types/index.d.ts",
    cache: false,
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  }
]
