//import { BuildOptions, buildSync } from 'esbuild';
import { join, resolve } from 'path';
import render from 'preact-render-to-string';
import { JSXInternal } from 'preact/src/jsx';
import { hasProp, findNodeByFunctionName } from './utils'

import { Html, Toc } from './layouts';
import { getDirectories, writeFile } from './utils';
import { kebabCase } from 'lodash';

const BASE_TITLE = 'jdougu';
const DOCTYPE = '<!DOCTYPE html>\n';

const SOURCE_DIR = resolve(process.cwd(), 'src/pages');
const DEST_DIR = resolve(process.cwd(), 'docs');

async function importPage(directory: string) {
    const pageIndexPath = join(directory, 'index.tsx');
    const page = await import(pageIndexPath);
    if (!page.default || typeof page.default !== 'function') {
        throw new Error(`Imported page ${pageIndexPath} has incorrect default`);
    }
    return page.default as () => JSXInternal.Element;
}

function getPageData(page: () => JSXInternal.Element) {
    const node = page();
    const dateNode = findNodeByFunctionName(node, 'Date');
    const date = dateNode ? new Date(dateNode.props.children as string) : Date.now()
    const katex = hasProp(node, 'data-katex');
    const title = findNodeByFunctionName(node, 'Title')?.props.children as string;
    if (title === undefined)  {
        throw new Error('A page is missing a title');
    }
    return {
        date,
        katex,
        Page: page,
        title,
    };
}

export type PageData = ReturnType<typeof getPageData>

(async function () {
    const pageDirectories = getDirectories(SOURCE_DIR)
        .filter((d) => d !== 'assets')
        .map((d) => resolve(SOURCE_DIR, d));

    const pages = (await Promise.all(pageDirectories.map((d) => importPage(d))))
        .map((page) => getPageData(page));

    renderToc(pages);

    pages.forEach((p) => renderPage(p));
})();

function renderToc(pages: PageData[]) {
    const page = DOCTYPE + render(
        <Html title={BASE_TITLE}>
            <Toc pages={pages}></Toc>
        </Html>,
        {}, { pretty: '  ' }
    );

    writeFile(join(DEST_DIR, 'index.html'), page);
}

function renderPage(page: PageData) {
    const Page = () =>
        <Html title={page.title + ' | ' + BASE_TITLE} katex={page.katex}>
            <page.Page />
        </Html>;
    const pageString = DOCTYPE + render(<Page />, {}, { pretty: '  '});
    const dest = join(DEST_DIR, kebabCase(page.title), 'index.html');
    writeFile(dest, pageString);

}

/*function buildScript(file: string) {
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
}*/
