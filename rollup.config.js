import {terser} from "rollup-plugin-terser";

export default [
  {
    input: './src/index.js',
    output: {
      extend: true,
      name: "ccd3",
      file: './dist/ccd3.js',
      format: "umd",
      indent: true,
    }
  },
  {
    input: './src/index.js',
    plugins: [
      terser()
    ],
    output: {
      extend: true,
      name: "ccd3",
      file: './dist/ccd3.min.js',
      format: "umd",
      indent: false,
    }
  }
]