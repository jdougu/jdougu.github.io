import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

/**
 * Copy file synchronously, make directories and overwrite if needed.
 */
export function copyFile(src: string, dest: string) {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
}

/**
 * Get the list of directories in `directory`.
 */
export function getDirectories(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((d) => d.name);
}

/**
 * Get a recursive directory listing of absolute paths.
 */
export function getFiles(directory: string): string[] {
    const dirEntries = readdirSync(directory, { withFileTypes: true });
    const files = dirEntries.map((dirEntry) => {
        const path = resolve(directory, dirEntry.name);
        return dirEntry.isDirectory() ? getFiles(path) : path;
    });
    return Array.prototype.concat(...files);
}

/**
 * Write file synchronously, make directories and overwrite if needed.
 */
export function writeFile(dest: string, data: string) {
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, data);
}
