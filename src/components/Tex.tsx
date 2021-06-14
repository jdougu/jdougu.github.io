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
