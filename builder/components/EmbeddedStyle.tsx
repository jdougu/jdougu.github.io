import { compile, Options } from 'sass';

interface Props {
    path: string,
}

export const EmbeddedStyle = ({ path }: Props) => {
    const options: Options<'sync'> = {
        style: 'compressed',
    };
    const result = compile(path, options);
    const style = result.css;
    return (
        <style>{style}</style>
    );
};
