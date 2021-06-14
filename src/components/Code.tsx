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

/**
 * Trim blank lines from the start and end of the array.
 */
function trimBlankLines(lines: string[]) {
    while (isBlank(lines[0])) {
        lines.shift()
    }
    while (isBlank(lines[lines.length - 1])) {
        lines.pop();
    }
    return lines;
}

function isBlank(line: string) {
    return !line.match(/[!\S]+/);
}

function removeLeadingIndent(lines: string[]) {
    const firstIndent = lines[0].length - lines[0].trimStart().length;
    return lines.map((line) => line.substring(firstIndent));
}
