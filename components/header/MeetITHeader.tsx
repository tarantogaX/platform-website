import React, {FunctionComponent, useContext, useState} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import Link from 'next/link';
import Center from '../central/Center';
import {addProps} from '../../utils/ComponentUtils';
import {RegisterButton} from '../button/Button';
import 'react-languages-select/css/react-languages-select.css';
import {useRouter} from 'next/router';
import { A } from '../text/TextComponents';

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    padding: 7px;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
    width: 100vw;
`;

const Burger = styled.button`
    display: none;
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }
    background: url('/images/burger.svg') no-repeat center;
    background-color: white;
    border: 0;
    cursor: pointer;
    :hover {
        opacity: 0.9;
    }
`;

const Logo = styled.img`
    height: 40px;
    :hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const LinksWrapper = styled(addProps<{open: boolean}>()(styled.div``))`
    float: right;
    transition: transform 1s;
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        left: 90px;
        bottom: 0;
        padding: 20px;
        transform: translateX(${(p) => (p.open ? '0' : '100%')});
        background-color: white;
        text-align: center;
    }
`;

const HeaderLink = styled(A)`
    display: inline-block;
    line-height: 20px;
    margin-right: 80px;
    min-width: 0;
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.tablet)} {
        min-width: 107px;
        margin-left: 0;
        margin-right: 20px;
    }
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        width: 100%;
        min-width: unset;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 10px;
    }
    text-align: center;
`;

const MeetITHeader: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <HeaderWrapper>
            <Center noLeftMargin noRightMargin style={{marginLeft: '45px', marginRight: '50px'}} maxWidth={'100%'}>
                <Burger
                    onClick={() => setOpen(!open)}
                    aria-label={'Open menu'}
                />
                <Link href={'https://meetit.eu/'}>
                    <Logo
                        onClick={() => setOpen(false)}
                        src={'/images/logo.svg'}
                        alt={'MeetIt logo'}
                    />
                </Link>
                <LinksWrapper open={open}>
                    <HeaderLink
                        onClick={() => setOpen(false)}
                        href={'http://meetit.eu/'}>
                        O nas
                    </HeaderLink>
                    <HeaderLink
                        onClick={() => setOpen(false)}
                        href={'/'}>
                        Kompendium
                    </HeaderLink>
                    <HeaderLink
                        onClick={() => setOpen(false)}
                        href={'https://camps.meetit.eu/'}>
                        Obóz
                    </HeaderLink>
                    <HeaderLink
                        onClick={() => setOpen(false)}
                        href={'https://forms.gle/s5Y88r5qu8Q8mk327'}>
                        Zostań tutorem
                    </HeaderLink>
                    <RegisterButton onClick={() => setOpen(false)} text={"Tutoring"} link={"https://tutoring.meetit.eu/"} />
                </LinksWrapper>
            </Center>
        </HeaderWrapper>
    );
};

export default MeetITHeader;