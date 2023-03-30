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

const createOutput = () => {
  const output = [
    {
      file: pkg.module,
      format: "es",
      sourcemap: false,
    }
  ];
  // if (!isDev) {
    output.push({
      file: pkg.main,
      exports: "named",
      format: "cjs",
      sourcemap: false,
    });
    output.push({
      file: "dist/index.global.js",
      name: "compool",
      format: "iife",
      sourcemap: false,
    });

    output.push({
      format: "umd",
      name: "compool",
      file: `dist/index.min.js`,
      plugins: [terser()]
    })
  // }
  return output;
};

export default () => {
  const rollupOptions = [
    {
      input: path.resolve(__dirname, "src/index.ts"),
      external,
      cache: false,
      output: createOutput(false),
      plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        typescript({
          // must specify tsconfig pathname
          tsconfig: path.resolve(__dirname, "tsconfig.node.json"),
          compilerOptions: {
            sourceMap: false,
            // https://github.com/Swatinem/rollup-plugin-dts/issues/147
            declarationDir: false ? undefined : "./types",
            declaration: true,
          },
        }),
      ],
    },
  ];
  // if (isProd) {
    rollupOptions.push({
      input: "./dist/types/src/index.d.ts",
      output: [
        {
          file: "dist/index.d.ts",
          format: "es",
        },
      ],
      plugins: [dts()],
    });
   
  // }
  return rollupOptions;
};
