import { kebabCase } from 'lodash';
import { join, resolve } from 'path';
import render from 'preact-render-to-string';

import { Html } from './layouts/';
import { Page } from './Page';
import { pages } from './pages';
import { writeFile } from './utils';

const SRC_DIR = resolve(process.cwd(), 'pages');
const DEST_DIR = resolve(process.cwd(), 'docs');
const DOCTYPE = '<!DOCTYPE html>\n';
const STYLE_PATH = resolve(process.cwd(), 'builder', 'layouts', '_style.scss');

(async function build() {
    renderToc(await pages);
    renderPages(await pages);
})();

function renderToc(pages: Page[]) {
}

function renderPages(pages: Page[]) {
    pages.forEach((page) => {
        const P = () => (
            <Html title={page.title} stylePath={STYLE_PATH}>
                {page.pageElement()}
            </Html>
        );

        const pageString = DOCTYPE + render(<P />, {}, { pretty: '  '});
        const dest = join(DEST_DIR, kebabCase(page.title), 'index.html');
        writeFile(dest, pageString);
    });
}
