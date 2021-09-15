import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {P, TextAlign} from '../text/TextComponents';
import {Localized} from '../../contexts/language-context/LanguageContext';

const Footer = styled.footer`
    height: 30px;
    line-height: 30px;
    background-color: black;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const MeetITFooter: FunctionComponent = (_props) => {
    return (
        <Footer>
            <P align={TextAlign.Center} color="white">
                <Localized lang={'pl'}>
                    © 2021 - Fundacja. Meet IT. Wszelkie prawa zastrzeżone.
                </Localized>
                <Localized lang={'en'}>
                    © 2021 - Foundation. Meet IT. All rights reserved.
                </Localized>
            </P>
        </Footer>
    );
};

export default MeetITFooter;
