import { kebabCase } from 'lodash';
import { join } from 'path';

import { Page } from '../Page';

interface TocProps {
    pages: Page[];
}

export const Toc = ({ pages }: TocProps ) =>
{
    const newestFirst = pages.sort((a, b) => a.date.getMilliseconds() - b.date.getMilliseconds());

    return (
        <ul>
            {newestFirst.map((p) => <TocEntry page={p}></TocEntry>)}
        </ul>
    );
};

interface TocEntryProps {
    page: Page;
}

const TocEntry = ({ page }: TocEntryProps) => {
    const url = join(kebabCase(page.title), 'index.html');
    return (
        <li><a href={url}>{page.title}</a></li>
    );
}
