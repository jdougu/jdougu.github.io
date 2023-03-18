import { pages } from './pages';

async function build() {
    const ps = await pages;
    console.log(ps);
    ps.forEach((p) => console.log(p.renderToString()));
}

build();
