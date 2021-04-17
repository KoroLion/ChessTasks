import typescript from '@rollup/plugin-typescript';
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
                // { src: 'src/images/*', dest: 'build/images' },
                { src: 'src/index.html', dest: 'build/' },
                // { src: 'node_modules/handlebars/dist/handlebars.min.js', dest: 'build/' }
            ]
        })
    ]
};
