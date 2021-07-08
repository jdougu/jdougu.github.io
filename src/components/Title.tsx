import { pageData } from '../render';

export const Title = (props: { children: string }) => {
    pageData.title = props.children + ' \u2013 jdougu';
    return (
        <h1 class="title">{props.children}</h1>
    );
}
