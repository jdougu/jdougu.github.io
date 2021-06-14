import { ComponentChildren } from 'preact';

import { EmbeddedStyle } from '../components/EmbeddedStyle';

interface Props {
    children?: ComponentChildren;
    subTitle?: string;
    title: string;
}

export const Html = (props: Props) => {
    return(
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <EmbeddedStyle fileName="./src/layouts/_style.scss" />
                <title>{props.title}</title>
            </head>
            <body>
                <main>
                    {props.children}
                </main>
            </body>
        </html>
    );
};
