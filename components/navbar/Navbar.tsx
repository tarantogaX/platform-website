import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import ColumnLayoutElement from '../column-layout-element/ColumnLayoutElement';
import {NavbarButton, NavbarButtonSelected, NavbarSectionTitle} from './NavbarButton';

type LessonProps = {
    title: string;
    id: string;
    colour?: string;
}

type NavbarProps = {
    sectionTitle: string;
    lessonsList: Array<LessonProps>;
    selectedLesson: number;
};

const NavbarWrapper = styled(ColumnLayoutElement)`
    background-color: ${(p: IStyleArgument) => p.theme.colors.backgroundStrong};
    position: fixed;
    top: 54px;
    width: 250px;
`;

const ShadowWrapper = styled.div`
    z-index: 5;
    position:relative;
    box-shadow: ${
        (p: IStyleArgument) =>
            p.theme.name == 'light'
                ? '0px 0px 5px 5px rgba(0, 0, 0, 0.2)'
                : '0px 0px 5px 2px rgba(255, 255, 255, 0.2)'};
`;

const ShadowWrapperLast = styled(ShadowWrapper)`
    height: 800px;
`;


const Navbar: FunctionComponent<NavbarProps> = (props) => {
    return (
        <NavbarWrapper
            normalColumns={2}
            tabletColumns={2}
            mobileColumns={1}>
                <ShadowWrapper>
                    <NavbarSectionTitle text={props.sectionTitle} link={"/"} />
                    {props.lessonsList.map((lesson, index) =>
                        (index < props.selectedLesson)
                            ? <NavbarButton text={lesson.title} link={lesson.id} />
                            : <></>
                    )}
                </ShadowWrapper>
                    {props.lessonsList.map((lesson, index) =>
                        (index == props.selectedLesson)
                            ? <NavbarButtonSelected text={lesson.title} link={lesson.id}/>
                            : <></>
                    )}
                <ShadowWrapperLast>
                    {props.lessonsList.map((lesson, index) =>
                        (index > props.selectedLesson)
                            ? <NavbarButton text={lesson.title} link={lesson.id} />
                            : <></>
                    )}
                </ShadowWrapperLast>
        </NavbarWrapper>
    );
};

export default Navbar;
