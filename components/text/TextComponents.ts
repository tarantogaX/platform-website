import styled from 'styled-components';
import {addProps} from '../../utils/ComponentUtils';
import {IStyleArgument} from '../../styles/theme';

export enum FontWeight {
    Regular,
    Bold,
    Thin,
}

export enum TextAlign {
    Left = 'left',
    Right = 'right',
    Center = 'center',
    Justify = 'justify',
}

type TextProps = {
    primary?: boolean;
    secondary?: boolean;
    align?: TextAlign;
    weight?: FontWeight;
    color?: string;
    noMargin?: boolean;
    mobileDownscale?: boolean;
};

const FontFromWeight = (weight: FontWeight) => {
    weight = weight ?? FontWeight.Regular;
    switch (weight) {
        case FontWeight.Regular:
            return "'MontserratRegular', sans-serif";
        case FontWeight.Bold:
            return "'MontserratBold', sans-serif";
        case FontWeight.Thin:
            return "'MontserratThin', sans-serif";
    }
};

export const BUTTON = styled(addProps<TextProps>()(styled.button``))`
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Bold)};
`;

export const H0 = styled(addProps<TextProps>()(styled.h1``))`
    font-size: 36px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Bold)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 20px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;

export const H1 = styled(addProps<TextProps>()(styled.h1``))`
    font-size: 27px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Bold)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 17px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;

export const H2 = styled(addProps<TextProps>()(styled.h2``))`
    font-size: 23px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Bold)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 14px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;

export const H3 = styled(addProps<TextProps>()(styled.h3``))`
    font-size: 19px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Bold)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 12px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;

export const P = styled(addProps<TextProps>()(styled.p``))`
    font-size: 18px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Regular)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 12px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;

export const P2 = styled(addProps<TextProps>()(styled.p``))`
    font-size: 16px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Regular)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 12px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;

export const A = styled(addProps<TextProps>()(styled.a``))`
    font-size: 18px;
    font-family: ${(p: TextProps) =>
        FontFromWeight(p.weight ?? FontWeight.Regular)};
    text-align: ${(p: TextProps) => p.align as string};
    color: ${(p: IStyleArgument & TextProps) =>
        p.color
            ? p.color
            : p.primary
            ? p.theme.colors.primaryStrong
            : p.secondary
            ? p.theme.colors.secondary
            : p.theme.colors.black};
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        ${(p) => (p.mobileDownscale ?? true ? 'font-size: 12px;' : '')}
    }
    ${(p) => (p.noMargin ? 'margin: 0' : '')}
`;
