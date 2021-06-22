import { KatexOptions, renderToString } from 'katex';

interface Props {
    children: string;
    inline?: boolean;
};

export const Tex = ({ children, inline }: Props) => {
    const options: KatexOptions = {
        displayMode: !inline,
        output: 'html',
    }
    const html = renderToString(children, options);
    return inline ? (<span dangerouslySetInnerHTML={{ __html: html }}/>)
                  : (<div dangerouslySetInnerHTML={{ __html: html }}/>);
}

export const $ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: false,
        output: 'html',
    };
    const html = renderToString(strings.raw[0], options);
    return <span dangerouslySetInnerHTML={{ __html: html }}></span>
};

export const $$ = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: true,
        output: 'html',
    };
    const html = renderToString(strings.raw[0], options);
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
};

export const equation = (strings: TemplateStringsArray) => {
    const options: KatexOptions = {
        displayMode: true,
        output: 'html',
    };
    const tex = '\\begin{equation}\n' + strings.raw[0] + '\\end{equation}\n';
    const html = renderToString(tex, options);
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
};
