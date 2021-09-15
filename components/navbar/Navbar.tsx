import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import ColumnLayoutElement from '../column-layout-element/ColumnLayoutElement';

type NavbarProps = {
    sectionTitle: string;
    lessonsList: Array<string>;
    selectedLesson: number;
};

const NavbarWrapper = styled.div`
    background-color: gray;
    width: 100px;
    height: 100%;
`;


const Navbar: FunctionComponent<NavbarProps> = (props) => {
    return (
        <NavbarWrapper />
    );
};

export default Navbar;
