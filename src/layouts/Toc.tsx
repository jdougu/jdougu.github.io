import { kebabCase } from 'lodash';

import { PageData } from '../render';

export const Toc = ({ pages }: { pages: PageData[] }) => {
    const sorted = pages.map((p) => ({
        date: new Date(p.date),
        title: p.title,
        url: kebabCase(p.title) + '/index.html',
    })).sort((a, b) => a.date.getMilliseconds() - b.date.getMilliseconds());

    return <ul>
        {sorted.map((p) => <li>
            <a href={p.url}>{p.title}</a>
        </li>)}
    </ul>;
}
