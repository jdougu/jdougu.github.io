import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { ComponentChildren } from 'preact'

import { writeFile } from '../utils';

interface Props {
    children: ComponentChildren;
    filename: string;
}

export const Hydrate = (props: Props) => {
    writeScript(props.filename);
    return (
        <>
            <div id="hydrate">
                {props.children}
            </div>
            <script src="./script.js"></script>
        </>
    );
}

function getComponentName(filename: string) {
    const contents = readFileSync(filename, 'utf8');
    const match = />\s*<([A-Z][a-zA-Z]*) \/>\s*<\/Hydrate>/g.exec(contents);
    return match && match[1] ? match[1] : undefined;
}

function writeScript(filename: string) {
    const componentName = getComponentName(filename);
    const script = `
        import { hydrate } from 'preact';
        import { ${componentName} } from './${componentName}';
        hydrate(<${componentName} />, document.getElementById('hydrate')!);
    `;
    writeFile(join(dirname(filename), 'script.tsx'), script);
}
