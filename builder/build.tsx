import { kebabCase } from 'lodash';
import { join, resolve } from 'path';
import render from 'preact-render-to-string';

import { Html, Toc } from './layouts/';
import { Page } from './Page';
import { writeFile } from './utils';

const BASE_TITLE = 'jdougu';
const SRC_DIR = resolve(process.cwd(), 'pages');
const DEST_DIR = resolve(process.cwd(), 'docs');
const DOCTYPE = '<!DOCTYPE html>\n';
const STYLE_PATH = resolve(process.cwd(), 'builder', 'layouts', '_style.scss');

(async function build() {
    const pages = await Page.importPages(SRC_DIR);
    renderToc(pages);
    renderPages(pages);
})();

function renderToc(pages: Page[]) {
    const T = () => (
        <Html title={BASE_TITLE} stylePath={STYLE_PATH}>
            <Toc pages={pages}></Toc>
        </Html>
    );

    const pageString = DOCTYPE + render(<T />, {}, { pretty: '  '});
    writeFile(join(DEST_DIR, 'index.html'), pageString);
}

function renderPages(pages: Page[]) {
    pages.forEach((page) => {
        const P = () => (
            <Html title={BASE_TITLE + ' | ' + page.title} stylePath={STYLE_PATH}>
                {page.pageElement()}
            </Html>
        );

        const pageString = DOCTYPE + render(<P />, {}, { pretty: '  '});
        const dest = join(DEST_DIR, kebabCase(page.title), 'index.html');
        writeFile(dest, pageString);
    });
}
