import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import dts from "rollup-plugin-dts";
import { join } from "path";
import { codecovRollupPlugin } from "@codecov/rollup-plugin";

const outputDir = join(import.meta.dirname, "/dist/npm/");

export default [
  {
    input: {
      index: "src/index.ts",
    },
    output: {
      dir: outputDir,
      format: "es",
    },
    external: ["yargs/yargs", "yargs/helpers", "fs/promises"],
    plugins: [
      json(),
      typescript({ tsconfig: "./tsconfig.json" }),
      codecovRollupPlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: "package",
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: `${outputDir}/types.d.ts`, format: "es" }],
    plugins: [json(), typescriptPaths({ preserveExtensions: true }), dts()],
  },
];
