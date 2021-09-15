import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import {addProps} from '../../utils/ComponentUtils';
import EnterFade from '../enter-animation/EnterFade';

type SectionProps = {
    outerChild?: React.ComponentType;
    heightMultiplier?: number;
    tabletHeightMultiplier?: number;
    alwaysCenter?: boolean;
    className?: string;
    addRelative?: boolean;
};

const Outer = styled(addProps<SectionProps>()(styled.div``))`
    display: inline-block;
    position: relative;
    width: 100%;

    ${(p) =>
        p.alwaysCenter
            ? `
            display: inline-block;
        position: relative;
        height: ${(p.heightMultiplier ?? 1) * 100}vh;
        ::before {
            content: '';
            display: inline-block;
            width: 1px;
            height: 100%;
            vertical-align: middle;
        }
    `
            : ''}

    ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.mobile)} {
        display: inline-block;
        position: relative;
        height: ${(p) => (p.tabletHeightMultiplier ?? 1) * 100}vh;
        ::before {
            content: '';
            display: inline-block;
            width: 1px;
            height: 100%;
            vertical-align: middle;
        }
    }
    ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.tablet)} {
        height: ${(p) => (p.heightMultiplier ?? 1) * 100}vh;
    }

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.tablet)} {
        margin-top: 50px;
    }
    overflow: visible;
`;

const Inner = styled(addProps<SectionProps>()(styled.div``))`
    overflow: visible;
    margin: auto;
    width: calc(100% - 2px);
    z-index: 1;

    ${(p) => (p.addRelative ? 'position: relative;' : '')}

    ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.mobile)} {
        display: inline-block;
        vertical-align: middle;
        margin: auto;
        position: relative;
    }

    ${(p) =>
        p.alwaysCenter
            ? `
            display: inline-block;
        vertical-align: middle;
        margin: auto;
    `
            : ''}
`;

const Section: FunctionComponent<SectionProps> = (props) => {
    return (
        <Outer
            className={props.className}
            heightMultiplier={props.heightMultiplier}
            tabletHeightMultiplier={props.tabletHeightMultiplier}
            alwaysCenter={props.alwaysCenter}>
            <Inner
                alwaysCenter={props.alwaysCenter}
                addRelative={props.addRelative}>
                <EnterFade>{props.children}</EnterFade>
            </Inner>
            {props.outerChild ? React.createElement(props.outerChild) : <></>}
        </Outer>
    );
};

export default Section;
