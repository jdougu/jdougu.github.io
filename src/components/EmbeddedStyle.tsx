import { compile, Options } from 'sass';

interface Props {
    fileName: string,
}

export const EmbeddedStyle = ({ fileName }: Props) => {
    const options: Options<'sync'> = {
        style: 'compressed',
    };
    const result = compile(fileName, options);
    const style = result.css;
    return (
        <style>{style}</style>
    );
};
