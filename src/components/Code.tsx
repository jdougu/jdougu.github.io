import { removeLeadingIndent, trimBlankLines } from '../utils';

export const Code = (props: { children: string }) => {
    return (
        <div>
            {...preLines(props.children)}
        </div>
    );
};

function preLines(code: string) {
    let lines = trimBlankLines(code.split('\n'));
    lines = removeLeadingIndent(lines);
    return lines.map((line) => <pre>{line}</pre>);
}
