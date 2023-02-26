import { statSync } from 'fs';
import { resolve } from 'path';
import render from 'preact-render-to-string';
import { JSXInternal } from 'preact/src/jsx';

import { findNodeByFunctionName } from './preact';


export class Page {

    indexFilePath!: string;
    pageElement!: () => JSXInternal.Element;
    title!: string;
    date!: Date;

    private node!: JSXInternal.Element;

    private constructor() { }

    static async import(directory: string) {
        const page = new Page();
        page.indexFilePath = resolve(directory, 'index.tsx');
        if (statSync(page.indexFilePath, { throwIfNoEntry: false }) === undefined) {
            throw new Error(`index.tsx not found in directory ${page.indexFilePath}`);
        }

        page.pageElement = await importPage(page.indexFilePath);
        page.node = page.pageElement();

        page.title = findNodeByFunctionName(page.node, 'Title')?.props.children as string;

        const dateString = findNodeByFunctionName(page.node, 'PublishedDate')?.props.children as string;
        console.log(dateString);
        page.date = new Date(dateString);

        return page;
    }

    renderToString() {
        return render(this.node, { }, { pretty: '  '});
    }
}

async function importPage(path: string) {
    const page = await import(path);
    if (!page.default || typeof page.default !== 'function') {
        throw new Error(`Imported page ${path} has incorrect default`);
    }
    return page.default as () => JSXInternal.Element;
}
