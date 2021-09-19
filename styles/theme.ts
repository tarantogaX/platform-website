type Color = string;

export interface ITheme {
    colors: {
        primary: Color;     //Green
        primaryLight: Color;    //Light green
        secondary: Color;      //Blue

        background: Color;      //White
        backgroundLight: Color;        //DarkWhite
        backgroundStrong: Color;        //LightGray

        textMain: Color;        //Black
        textStrong: Color;       //LightBlack
    };
    breakpoint: {
        mobile: string;
        tablet: string;
    };
    up: (bp: string, vert?: boolean) => string;
    down: (bp: string, vert?: boolean) => string;
    between: (low: string, high: string, vert?: boolean) => string;
}

export interface IStyleArgument {
    theme: ITheme;
}

export const DefaultTheme: ITheme = {
    breakpoint: {
        mobile: '576px',
        tablet: '1200px',
    },
    colors: {
        primary: "#1BBC07",
        primaryLight: "#D6F5D9",
        secondary: "#508ED6",
        background: "#FFFFFF",
        backgroundLight: "#F7F7F7",
        backgroundStrong: "#EFEFEF",
        textMain: "#1D1E20",
        textStrong: "#494949",
    },
    up: (breakpoint, vertical = false) =>
        `@media (min-${
            vertical ? 'height' : 'width'
        }: calc(${breakpoint} + 0.02px))`,
    down: (breakpoint, vertical = false) =>
        `@media (max-${vertical ? 'height' : 'width'}: ${breakpoint})`,
    between: (breakpointMin, breakpointMax, vertical = false) =>
        `@media (max-${
            vertical ? 'height' : 'width'
        }: ${breakpointMax}) and (min-${
            vertical ? 'height' : 'width'
        }: calc(${breakpointMin} + 0.02px))`,
};
