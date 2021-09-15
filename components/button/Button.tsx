import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import React, {FunctionComponent} from 'react';
import Link from 'next/link';

const Button = styled.button`
    font-weight: bold;
    border: 0;
    border-radius: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    padding-left: 50px;
    padding-right: 50px;
    background-color: ${(p: IStyleArgument) => p.theme.colors.secondary};
    color: ${(p: IStyleArgument) => p.theme.colors.white};
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
    opacity: ${(p) => (p.disabled ? '0.7' : '1')};

    :focus {
        outline: 0;
    }

    :hover {
        opacity: ${(p) => (p.disabled ? '0.7' : '0.9')};
        cursor: pointer;
    }
`;
// const advancedMatching = {}; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
// const options = {
//     autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
//     debug: false, // enable logs
// };
export const RegisterButton: FunctionComponent<{
    className?: string;
    onClick?: () => void;
}> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let onClick = () => {};

    // React.useEffect(() => {
    //     // eslint-disable-next-line @typescript-eslint/no-var-requires
    //     const ReactPixel = require('react-facebook-pixel');
    //     ReactPixel.default.init('220345079654886', advancedMatching, options);
    //     ReactPixel.default.pageView(); // For tracking page view

    //     onClick = () => {
    //         ReactPixel.default.track('InitiateCheckout', {
    //             content_name: 'tutoring',
    //         });
    //     };
    // });
    return (
        <Link href={'/sample-lesson'}>
            <Button
                {...props}
                onClick={() => {
                    onClick();
                }}>
                    Kompendium
            </Button>
        </Link>
    );
};

export default Button;
