type Color = string;
type ThemeType = 'dark' | 'light';

export interface ITheme {
    name: ThemeType;
    colors: {
        primary: Color;     //Green
        primaryLight: Color;    //Light green
        secondary: Color;      //Blue

        background: Color;      //White
        backgroundLight: Color;        //DarkWhite
        backgroundStrong: Color;        //LightGray
        headerBackground: Color;    //White
        footerBackground: Color;        //100% Black

        textMain: Color;        //Black
        textStrong: Color;       //LightBlack
    };
    breakpoint: {
        header: string;
        mobile: string;
        tablet: string;
    };
    up: (bp: string, vert?: boolean) => string;
    down: (bp: string, vert?: boolean) => string;
    between: (low: string, high: string, vert?: boolean) => string;
    header: (bp: string) => string;
}

export interface IStyleArgument {
    theme: ITheme;
}

export const DefaultTheme: ITheme = {
    name: 'light',
    breakpoint: {
        header: '1000px',
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
        headerBackground: "#FFFFFF",
        footerBackground: "#000000",
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
    header: (breakpoint) => `@media (max-${breakpoint})`,
};

export const DarkTheme: ITheme = {
    name: 'dark',
    breakpoint: {
        header: '500px',
        mobile: '576px',
        tablet: '1200px',
    },
    colors: {
        primary: "#1BBC07",     //ok
        primaryLight: "#0e7801",     //ok
        secondary: "#2c67ab",

        background: "#000000",  //ok
        backgroundLight: "#1c1c1c",     //ok
        backgroundStrong: "#343336",     //ok
        headerBackground: "#1c1c1c",
        footerBackground: "#FFFFFF",     //ok

        textMain: "#F7F7F7",     //ok
        textStrong: "#e0e0e0",     //ok
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
    header: (breakpoint) => `@media (max-${breakpoint})`,
};
