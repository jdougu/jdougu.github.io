import { resolve } from 'path';

import { getDirectories, hasFile } from './utils';
import { Page } from './Page';

const PAGES_DIRECTORY = resolve(process.cwd(), 'pages');

const directories = getDirectories(PAGES_DIRECTORY).filter((d) => {
    const path = resolve(PAGES_DIRECTORY, d);
    return hasFile(path, 'index.tsx');
});

const pagePromises: Promise<Page>[] = [];

directories.forEach(async (d) => {
    const directory = resolve(PAGES_DIRECTORY, d);

    try {
        const page = Page.import(directory);
        pagePromises.push(page);
    } catch (error) {
        console.error((error as Error).message);
    }
});

export const pages = Promise.all(pagePromises);
