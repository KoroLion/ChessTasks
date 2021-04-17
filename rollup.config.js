import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/index.ts',
    output: {
        sourcemap: true,
        file: 'build/bundle.min.js',
        format: 'cjs',
        assetFileNames: "assets/[name][extname]"
    },
    plugins: [
        typescript({
            target: "ES6",
            sourceMap: false
        }),
        styles({
            mode: ['extract', 'styles.min.css'],
            minimize: true
        }),
        copy({
            targets: [
                { src: 'src/images/*', dest: 'build/images' },
                { src: 'src/index.html', dest: 'build/' },
                { src: 'node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.min.js', dest: 'build/' }
            ]
        }),
        nodeResolve(),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**'  // Default: undefined
        })
    ]
};
