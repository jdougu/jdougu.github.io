export const titleRegex = /<h1 class="title">([^<]*)<\/h1>/;

export const Title = (props: { children: string }) => {
    return (
        <h1 class="title">{props.children}</h1>
    );
}
