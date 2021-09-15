import {FunctionComponent} from 'react';
import Section from '../../components/section/Section';
import Center from '../../components/central/Center';
import {FontWeight, H0, H1} from '../../components/text/TextComponents';
import {RegisterButton} from '../../components/button/Button';
import styled from 'styled-components';
import ColumnLayoutElement from '../../components/column-layout-element/ColumnLayoutElement';
import {IStyleArgument} from '../../styles/theme';

const ElongatedH1 = styled(H1)`
    ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.tablet)} {
        margin-right: -280px;
    }
    ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.mobile)} {
        margin-right: -120px;
    }
    position: relative;
    z-index: 20;
`;

const Underline = styled.span`
    border-bottom: ${(p: IStyleArgument) => p.theme.colors.primaryStrong} solid
        4px;
`;

const ThisSection = styled(Section)`
    min-height: 800px;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.tablet)} {
        min-height: 800px;
        margin-top: 0;
    }
`;

const LandingSection: FunctionComponent = () => {
    return (
        <ThisSection
            addRelative
            alwaysCenter>
            <Center>
                <ColumnLayoutElement
                    normalColumns={2.18}
                    tabletColumns={2.3}
                    mobileColumns={1}>
                    <H0>
                        Określ swój{' '}
                        <Underline>cel{'\u00A0'}edukacyjny</Underline>,{' '}
                        <br /> a my pomożemy Ci go osiągnąć!
                    </H0>
                    <ElongatedH1 weight={FontWeight.Regular}>
                        Tutoring z matematyki, fizyki i programowania ze
                        studentami elitarnych uczelni i zwycięzcami olimpiad
                        przedmiotowych
                    </ElongatedH1>
                    <RegisterButton />
                </ColumnLayoutElement>
            </Center>
        </ThisSection>
    );
};

export default LandingSection;
