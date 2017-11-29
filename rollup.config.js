import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'bytes-util'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    buble(),
    resolve(),
    commonjs()
  ]
}
