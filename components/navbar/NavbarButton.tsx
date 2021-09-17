import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import ColumnLayoutElement from '../column-layout-element/ColumnLayoutElement';
import { P, FontWeight } from '../text/TextComponents';
import {Colours} from "../primitives/Colours";

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
`;

const ButtonSelected = styled(Button)`
    background-color: ${Colours.White};
`;

const ButtonSectionTitle = styled(Button)`
    background-color: ${Colours.LightGreen};
    color: ${Colours.LightBlack};
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
            <ButtonSelected>{props.text}</ButtonSelected>
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
