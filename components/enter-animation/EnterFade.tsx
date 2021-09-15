import React, {FunctionComponent, useEffect, useState} from 'react';
import TrackVisibility from 'react-on-screen';
import styled from 'styled-components';
import {addProps} from '../../utils/ComponentUtils';

const VisibilityWrapper = styled(
    addProps<{visible: boolean}>()(TrackVisibility),
)`
    transition: opacity 1s;
    opacity: ${(p) => (p.visible ? 1 : 0)};
`;

const EnterFade: FunctionComponent<{style?: any; className?: string}> = (
    props,
) => {
    const [vis, setVis] = useState(false);

    return (
        <VisibilityWrapper
            style={props.style}
            className={props.className}
            visible={vis}
            partialVisibility>
            {({isVisible}) => {
                setVis(isVisible);

                return <>{props.children}</>;
            }}
        </VisibilityWrapper>
    );
};

export default EnterFade;
