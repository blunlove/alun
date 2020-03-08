import commonjs from 'rollup-plugin-commonjs' 
import VuePlugin from 'rollup-plugin-vue';
import node from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'package/index.js',
  extensions: ['.js', '.vue', '.json'],
  output: {
    file: 'lib/bundle.js',
    format: 'cjs',
  },
  plugins: [
    node({
      extensions: ['.vue', '.js']
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    VuePlugin()
  ]
};