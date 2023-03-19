import { KatexOptions, renderToString } from 'katex';

export const $ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: false,
        output: 'mathml',
    };
    const mathML = renderToString(strings.raw[0], options);
    return <span class="maths" dangerouslySetInnerHTML={{ __html: strip(mathML) }} />
};

function strip(mathML: string) {
    const spanRegEx = /<[\/]?span[^>]*>/g;
    mathML = mathML.replace(spanRegEx, '');

    const semanticsRegEx = /<[\/]?semantics[^>]*>/g;
    mathML = mathML.replace(semanticsRegEx, '');

    const annotationRegEx = /<annotation.*\/annotation>/g;
    mathML = mathML.replace(annotationRegEx, '');

    return mathML;
}
