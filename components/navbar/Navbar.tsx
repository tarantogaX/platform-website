import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import ColumnLayoutElement from '../column-layout-element/ColumnLayoutElement';
import {NavbarButton, NavbarButtonSelected, NavbarSectionTitle} from './NavbarButton';
import {Colours} from "../primitives/Colours";

type LessonProps = {
    title: string;
    id: number;
    colour?: string;
}

type NavbarProps = {
    sectionTitle: string;
    lessonsList: Array<LessonProps>;
    selectedLesson: number;
};

const NavbarWrapper = styled(ColumnLayoutElement)`
    /* margin-top: 300px; */
    background-color: ${Colours.LightGray};
    /* width: 30%;
    height: 100px; */
    width: 25%;
    padding-top: 55px;
    padding-bottom: 80%;
`;


const Navbar: FunctionComponent<NavbarProps> = (props) => {
    return (
        <NavbarWrapper
            normalColumns={2}
            tabletColumns={2}
            mobileColumns={1}>
                <NavbarSectionTitle text={props.sectionTitle} link={props.sectionTitle} />
                {props.lessonsList.map((lesson, index) =>
                    (index != props.selectedLesson)
                        ? <NavbarButton text={lesson.title} link={lesson.id} />
                        : <NavbarButtonSelected text={lesson.title} link={lesson.id} />
                )}
        </NavbarWrapper>
    );
};

export default Navbar;
