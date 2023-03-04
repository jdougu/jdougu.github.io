/**
 * Return a new array with leading and trailing blank lines removed.
 */
export function trimBlankLines(lines: string[]) {
    const trimmedLines = [...lines];
    while (isBlank(trimmedLines[0])) {
        trimmedLines.shift()
    }
    while (isBlank(trimmedLines[trimmedLines.length - 1])) {
        trimmedLines.pop();
    }
    return trimmedLines;
}

/**
 * Is the line blank (only contains whitespace characters).
 */
export function isBlank(line: string) {
    return !line.match(/[!\S]+/);
}

/**
 * Return a new array where the leading indent of the first line is removed
 * from all the lines.
 */
export function removeLeadingIndent(lines: string[]) {
    const firstIndent = lines[0].length - lines[0].trimStart().length;
    return lines.map((line) => line.substring(firstIndent));
}
