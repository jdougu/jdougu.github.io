import { basename, dirname, extname, join, relative, resolve } from 'path';
import render from 'preact-render-to-string';

import { titleRegex } from './components/'
import { Html } from './layouts/Html';
import { copyFile, getFiles, writeFile } from './utils';

const SOURCE_DIR = resolve(process.cwd(), 'src/pages');
const DEST_DIR = resolve(process.cwd(), 'docs');

getFiles(SOURCE_DIR).forEach(async (file) => {

    const dest = destPath(file);

    if (basename(file) === 'index.tsx') {
        const page = await renderPage(file);
        if (page) {
            writeFile(dest, page);
        }
    } else if (basename(file)[0] !== '_') {
        copyFile(file, dest);
    }

});

async function renderPage(pagePath: string) {
    const PageModule = await import(pagePath);
    if (PageModule.default && typeof PageModule.default === 'function') {
        const renderedPage = render(<PageModule.default />);
        const katex = /katex/.test(renderedPage);
        const match = titleRegex.exec(renderedPage);
        const title = (match && match[1] ? match[1] + ' \u2013 ' : '') + 'jdudy';
        const Page = () => (
            <Html title={title} katex={katex}>
                <PageModule.default />
            </Html>
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
