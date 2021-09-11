import fetch from 'node-fetch';
import { ComponentChildren } from 'preact';

interface Props {
    children: ComponentChildren
    href: string;
}

export const Link = ({ children, href }: Props) => {
    fetch(href, { method: 'head' }).catch(() => {
        console.warn(`Warning: Link to ${href} appears broken`);
    });
    return (
        <a href={href}>{children}</a>
    );
}
