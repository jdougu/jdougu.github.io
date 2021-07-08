import { BuildOptions, buildSync } from 'esbuild';
import { basename, dirname, extname, join, relative, resolve } from 'path';
import render from 'preact-render-to-string';

import { Html } from './layouts/Html';
import { copyFile, getFiles, writeFile } from './utils';

const SOURCE_DIR = resolve(process.cwd(), 'src/pages');
const DEST_DIR = resolve(process.cwd(), 'docs');

export const pageData = {
    title: 'jdougu',
    katex: false,
}

getFiles(SOURCE_DIR).forEach(async (file) => {

    const dest = destPath(file);

    if (basename(file) === 'index.tsx') {
        const page = await renderPage(file);
        if (page) {
            writeFile(dest, page);
        }
    } else if (basename(file) === 'script.tsx') {
        buildScript(file);
    } else if (basename(file)[0] !== '_' && extname(file) !== '.tsx') {
        copyFile(file, dest);
    }

});

async function renderPage(pagePath: string) {
    const PageModule = await import(pagePath);
    if (PageModule.default && typeof PageModule.default === 'function') {
        const renderedPage = render(<PageModule.default />, {}, { pretty: '  ' });
        const Page = () => (
            <Html title={pageData.title} katex={pageData.katex} html={renderedPage} />
        );
        return '<!DOCTYPE html>\n' + render(<Page />, {}, { pretty: '  ' });
    } else {
        return undefined;
    }
}

function destPath(file: string) {
    let fileName: string;

    if (extname(file) === '.tsx') {
        fileName = basename(file, '.tsx').toLowerCase() + '.html';
    } else {
        fileName = basename(file);
    }

    return join(DEST_DIR, dirname(relative(SOURCE_DIR, file)), fileName);
}

function buildScript(file: string) {
    const outFile= join(dirname(join(DEST_DIR, relative(SOURCE_DIR, file))), 'script.js');
    const options: BuildOptions = {
        bundle: true,
        entryPoints: [file],
        inject: ['./src/preact-shim.js'],
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        minify: true,
        outfile: outFile,
    };
    buildSync(options);
}
