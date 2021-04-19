import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy'
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import serve from 'rollup-plugin-serve';

export default {
    input: 'src/index.ts',
    output: {
        sourcemap: true,
        file: 'build/bundle.min.js',
        format: 'cjs',
        assetFileNames: "assets/[name][extname]"
    },
    plugins: [
        webWorkerLoader({
            inline: false,
            skipPlugins: ['serve', 'styles', 'typescript', 'copy']
        }),
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
        serve({
            contentBase: 'build',
            port: 8080
        })
    ]
};
