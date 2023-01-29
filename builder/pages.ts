import { resolve } from 'path';

import { getDirectories } from './filesystem';

const SOURCE_DIRECTORY = resolve(process.cwd(), 'pages');
export const directories = getDirectories(SOURCE_DIRECTORY);

