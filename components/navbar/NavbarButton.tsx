import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import ColumnLayoutElement from '../column-layout-element/ColumnLayoutElement';
import { P, FontWeight } from '../text/TextComponents';

type LessonButtonProps = {
    text: string;
    link: string;
};

const Button = styled(P)`
    text-align: left;
    margin: 0;
    padding-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 10px;
`;

const ButtonSelected = styled(Button)`
    background-color: ${(p: IStyleArgument) => p.theme.colors.background};
`;

const ButtonSectionTitle = styled(Button)`
    background-color: ${(p: IStyleArgument) => p.theme.colors.primaryLight};
    color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
`;


export const NavbarButton: FunctionComponent<LessonButtonProps> = (props) => {
    return (
        <a href={props.link}>
            <Button>{props.text}</Button>
        </a>
    );
};

export const NavbarButtonSelected: FunctionComponent<LessonButtonProps> = (props) => {
    return (
        <a href={props.link}>
            <ButtonSelected weight={FontWeight.Bold}>{props.text}</ButtonSelected>
        </a>
    );
}

export const NavbarSectionTitle: FunctionComponent<LessonButtonProps> = (props) => {
    return (
        <a href={props.link}>
            <ButtonSectionTitle weight={FontWeight.Bold}>{props.text}</ButtonSectionTitle>
        </a>
    );
}
