import { KatexOptions, renderToString } from 'katex';

export const $ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: false,
        output: 'mathml',
    };
    const mathML = renderToString(strings.raw[0], options);
    // @ts-ignore
    return <math dangerouslySetInnerHTML={{ __html: strip(mathML) }} />
};

export const $$ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: true,
        output: 'mathml',
    };
    const mathML = renderToString(strings.raw[0], options);
    // @ts-ignore
    return <math display="block" dangerouslySetInnerHTML={{ __html: strip(mathML) }} />;
};

function strip(mathML: string) {
    const spanRegEx = /<[\/]?span[^>]*>/g;
    mathML = mathML.replace(spanRegEx, '');

    const mathRegEx = /<[\/]?math[^>]*>/g;
    mathML = mathML.replace(mathRegEx, '');

    const semanticsRegEx = /<[\/]?semantics[^>]*>/g;
    mathML = mathML.replace(semanticsRegEx, '');

    const annotationRegEx = /<annotation.*\/annotation>/g;
    mathML = mathML.replace(annotationRegEx, '');

    return mathML;
}
