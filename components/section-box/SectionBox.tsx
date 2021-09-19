import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import { P, A, FontWeight } from '../text/TextComponents';
import {addProps} from '../../utils/ComponentUtils';

type LessonProps = {
    title: string;
    id: string;
    colour?: LessonHeaderBackground;
}

type ColourProps = {
    colour: LessonHeaderBackground;
}

type LessonHeaderBackground = "Background" | "BackgroundLight";

const LessonHeader = styled(addProps<ColourProps>()(styled.div``))`
    display: block;
    height: 40px;
    text-align: left;
    padding-left: 40px;
    :hover {
        cursor: pointer;
    }
    background-color: ${
        (p: ColourProps & IStyleArgument) =>
            p.colour == "BackgroundLight"
                ? p.theme.colors.background
                : p.theme.colors.backgroundLight
    };
`;

const LessonTitle = styled(P)`
    vertical-align: middle;
    padding: 10px;
    margin-right: 30px;
    color: ${(q: IStyleArgument) => q.theme.colors.textMain};
`;

const Lesson: FunctionComponent<LessonProps> = (props) => {
    return (
        <A href={props.title != "Złożoność obliczeniowa" ? `/articles/${props.id}` : props.id}>
            <LessonHeader colour={props.colour}>
                <LessonTitle>{props.title}</LessonTitle>
            </LessonHeader>
        </A>
    );
}

const Close = styled.img`
    display: inline;
    cursor: pointer;
    float: right;
    margin-right: 10px;
    vertical-align: middle;
    padding-top: 10px;
`;

const SectionHeader = styled.div`
    background-color: ${(p: IStyleArgument) => p.theme.colors.backgroundStrong};
    height: 40px;
    text-align: center;
    :hover {
        cursor: pointer;
    }
    position: relative;
    z-index: 2;
    padding-top: 10px;
`;

const SectionTitle = styled(P)`
    display: inline;
    vertical-align: middle;
    /* padding-top: 15px; */
`;

const SectionWrapper = styled.div`
    box-shadow: 0px 0px 5px 5px rgba(100, 100, 100, 0.2);
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
`;

type SectionProps = {
    title: string;
    lessons: Array<LessonProps>;
}

export const SectionBox: FunctionComponent<SectionProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <SectionWrapper style={{width: open ? '100%' : '800px'}}>
            <SectionHeader onClick={() => {setOpen(!open)}} style={open ? {boxShadow: '0px 0px 5px 5px rgba(100, 100, 100, 0.2)'} : {}}>
                <SectionTitle noMargin weight={open ? FontWeight.SemiBold : FontWeight.Regular}>{props.title}</SectionTitle>
                <Close
                    src="/images/close.svg"
                    width="20px"
                    style={{display: open ? "block" : "none"}}
                />
            </SectionHeader>
            {open ? props.lessons.map((lesson, index) => 
                <Lesson
                    title={lesson.title} id={lesson.id}
                    colour={(index % 2 == 0) ? "BackgroundLight" : "Background"}
                />
            ) : <></>}
        </SectionWrapper>
    );
};
