import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {P, TextAlign} from '../text/TextComponents';
import { IStyleArgument } from '../../styles/theme';

const Footer = styled.footer`
    height: 30px;
    line-height: 30px;
    background-color: ${(p: IStyleArgument) => p.theme.colors.footerBackground};
    position: relative;
    z-index: 6;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Text = styled(P)`
    color: ${(p: IStyleArgument) => p.theme.colors.background};
`;

const MeetITFooter: FunctionComponent = (_props) => {
    return (
        <Footer>
            <Text align={TextAlign.Center}>
                © 2021 - Meet IT. Wszelkie prawa zastrzeżone.
            </Text>
        </Footer>
    );
};

export default MeetITFooter;
