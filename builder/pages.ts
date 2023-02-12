import { resolve } from 'path';
import { JSXInternal } from 'preact/src/jsx';

import { getDirectories, hasFile } from './filesystem';

const PAGES_DIRECTORY = resolve(process.cwd(), 'pages');

const directories = getDirectories(PAGES_DIRECTORY).filter((d) => {
    const path = resolve(PAGES_DIRECTORY, d);
    return hasFile(path, 'index.tsx');
});

export const pages = directories.map((d) => {
    const directory = resolve(PAGES_DIRECTORY, d);
    const index = resolve(directory, 'index.tsx');

    return {
        directory,
        index,
        page: importPage(index),
    }
});

async function importPage(path: string) {
    const page = await import(path);
    if (!page.default || typeof page.default !== 'function') {
        throw new Error(`Imported page ${path} has incorrect default`);
    }
    return page.default as () => JSXInternal.Element;
}
