import { ComponentChildren } from 'preact'

import { EmbeddedStyle } from '../components/';

interface Props {
    children: ComponentChildren;
    stylePath?: string;
    title: string;
}

export const Html = (props: Props) => (
    <html>
        <head lang="en">
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {props.stylePath && <EmbeddedStyle path={props.stylePath}></EmbeddedStyle>}
            <title>{props.title}</title>
        </head>
        <body>
            <main>{props.children}</main>
        </body>
    </html>
);
