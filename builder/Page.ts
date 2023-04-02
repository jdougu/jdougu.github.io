import { statSync } from 'fs';
import { resolve } from 'path';
import { JSXInternal } from 'preact/src/jsx';

import { fileExists, findNodeByFunctionName, getDirectories } from './utils';

export class Page {

    indexFilePath!: string;
    pageElement!: () => JSXInternal.Element;
    title!: string;
    date!: Date;

    private node!: JSXInternal.Element;

    private constructor() { }

    static async importPages(directory: string) {
        const pagePaths = getDirectories(directory)
            .filter((d) => fileExists(resolve(directory, d, 'index.tsx')))
            .map((d) => resolve(directory, d, 'index.tsx'));

        const pagePromises: Promise<Page>[] = [];

        pagePaths.forEach((p) => {
            try {
                const page = Page.importPage(p);
                pagePromises.push(page);
            } catch (error) {
                console.error((error as Error).message);
            }
        });

        return Promise.all(pagePromises);
    }

    private static async importPage(path: string) {
        const page = new Page();

        page.indexFilePath = path;
        page.pageElement = await Page.dynamicImportPage(page.indexFilePath);
        page.node = page.pageElement();
        page.title = findNodeByFunctionName(page.node, 'Title')?.props.children as string;
        const dateString = findNodeByFunctionName(page.node, 'PublishedDate')?.props.children as string;
        page.date = new Date(dateString);

        return page;
    }

    private static async dynamicImportPage(path: string) {
        const page = await import(path);
        if (!page.default || typeof page.default !== 'function') {
            throw new Error(`Imported page ${path} has incorrect default`);
        }
        return page.default as () => JSXInternal.Element;
    }
}


