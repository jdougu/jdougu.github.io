import { Options, renderSync } from 'sass';

interface Props {
    fileName: string
}

export const EmbeddedStyle = ({ fileName }: Props) => {
    const options: Options = {
        file: fileName,
        outputStyle: 'compressed',
    };
    const style = renderSync(options).css.toString();
    return (
        <style>{style}</style>
    );
};
