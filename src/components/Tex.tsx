import { KatexOptions, renderToString } from 'katex';

export const $ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: false,
        output: 'html',
    };
    const html = renderToString(strings.raw[0], options);
    return <span data-katex dangerouslySetInnerHTML={{ __html: html }} />
};

export const $$ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: true,
        output: 'html',
    };
    const html = renderToString(strings.raw[0], options);
    return <div data-katex dangerouslySetInnerHTML={{ __html: html }} />
};

export const equation = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: true,
        output: 'html',
    };
    const tex = '\\begin{equation}\n' + strings.raw[0] + '\\end{equation}\n';
    const html = renderToString(tex, options);
    return <div data-katex dangerouslySetInnerHTML={{ __html: html }} />
};
