export const addProps = <NEW>() => <C>(
    component: React.ComponentType<C>,
): React.ComponentType<C & NEW> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return component as React.ComponentType<C & NEW>;
};
