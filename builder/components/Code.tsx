import { removeLeadingIndent, trimBlankLines } from '../utils';

export const code = (strings: TemplateStringsArray) => {
    return (
        <div>
            {...preLines(strings.raw[0])}
        </div>
    );
};

function preLines(code: string) {
    let lines = trimBlankLines(code.split('\n'));
    lines = removeLeadingIndent(lines);
    return lines.map((line) => <pre>{line}</pre>);
}
