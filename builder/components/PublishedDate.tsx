export const PublishedDate = (props: { children: string }) => {
    const date = new Date(props.children);
    const dateString = date.toLocaleString('en-gb', { month: 'short', day: 'numeric', year: 'numeric' });
    return <time dateTime={date.toISOString()}>{dateString}</time>;
};
