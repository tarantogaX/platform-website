import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {P, TextAlign} from '../text/TextComponents';

const Footer = styled.footer`
    height: 30px;
    line-height: 30px;
    background-color: black;
    position: relative;
    z-index: 6;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const MeetITFooter: FunctionComponent = (_props) => {
    return (
        <Footer>
            <P align={TextAlign.Center} color="white">
                © 2021 - Meet IT. Wszelkie prawa zastrzeżone.
            </P>
        </Footer>
    );
};

export default MeetITFooter;
