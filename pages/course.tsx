import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../styles/theme';
import LessonContent from '../page-fragments/lesson/LessonContent';
import Navbar from '../components/navbar/Navbar';
import Center from '../components/central/Center';
import { H0, P, P2, A, FontWeight } from '../components/text/TextComponents';
import ColumnLayoutElement from '../components/column-layout-element/ColumnLayoutElement';
import { Colours } from '../components/primitives/Colours';
import { getSectionsList } from '../lib/articles';
import {addProps} from '../utils/ComponentUtils';
import Link from 'next/link';

export async function getStaticProps() {
  const allSectionsList = getSectionsList()
  return {
    props: {
        allSectionsList
    }
  }
}

type LessonProps = {
    title: string;
    id: string;
    colour?: string;
}

type LessonHeaderProps = {
    colour?: string;
}

const LessonHeader = styled(addProps<LessonHeaderProps>()(styled.div``))`
    display: block;
    height: 40px;
    text-align: left;
    padding-left: 40px;
    :hover {
        cursor: pointer;
    }
    background-color: ${(p: LessonHeaderProps) => p.colour ? p.colour : Colours.LightGray};
`;

const LessonTitle = styled(P)`
    vertical-align: middle;
    padding: 10px;
    margin-right: 30px;
`;

const Lesson: FunctionComponent<LessonProps> = (props) => {
    return (
        <Link href={`/articles/${props.id}`}>
            <LessonHeader colour={props.colour}>
                <LessonTitle noMargin>{props.title}</LessonTitle>
            </LessonHeader>
        </Link>
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
    background-color: ${Colours.LightGray};
    height: 40px;
    text-align: center;
    :hover {
        cursor: pointer;
    }
    position: relative;
    z-index: 2;
`;

const SectionTitle = styled(P)`
    display: inline;
    vertical-align: middle;
    padding-top: 15px;
`;

const SectionWrapper = styled.div`
    box-shadow: 0px 0px 5px 5px rgba(100, 100, 100, 0.2);
    margin-bottom: 30px;
`;

type SectionProps = {
    title: string;
    lessons: Array<LessonProps>;
}

const Section: FunctionComponent<SectionProps> = (props) => {
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
                <Lesson title={lesson.title} id={lesson.id} colour={(index % 2 == 0) ? Colours.White : Colours.DarkWhite} />
            ) : <></>}
        </SectionWrapper>
    );
};


const CourseDescription = styled(ColumnLayoutElement)`
    width: 60%;
    margin-right: 30px;
`;

const CourseImage = styled.img`
    width: 30%;
    margin-top: 30px;
`;

const AllSectionsWrapper = styled(Center)`
    display: block;
    margin-top: 100px;
`;

const CourseTitle = styled(H0)`
    color: ${Colours.LightBlack};
    font-size: 50px;
`;

const CourseText = styled(P)`
    color: ${Colours.LightBlack};
`;

function Course ({allSectionsList}) {
    return (
        <>
            <Head>
                <title>Meet IT Kompendium</title>
            </Head>
            <Center maxWidth={1500} style={{marginTop: '70px'}}>
                <CourseDescription
                    normalColumns={1}
                    tabletColumns={1}
                    mobileColumns={1}
                    vertAlign={'top'}>
                    <CourseTitle weight={FontWeight.SemiBold}>Kompendium</CourseTitle>
                    <CourseText>
                        Znajdziesz tu materiały, które (według nas) pokrywają całą tematykę, z
                        jaką możesz się spotkać na Olimpiadzie Informatycznej. Każdy z działów zawiera kilka 
                        lekcji o zróżnicowanej trudności. Lekcje o wyższych numerach mogą, ale nie muszą, być 
                        trudniejsze niż te o niższych. W razie problemów zawsze możesz prosić swojego tutora Meet IT o pomoc. 
                        Gdybyś jakimś cudem trafił tutaj jako osoba nienależąca do projektu, koniecznie dowiedz się więcej – 
                        na naszej stronie lub Facebook'u. Zachęcamy do skorzystania ze wsparcia!
                    </CourseText>
                </CourseDescription>
                <CourseImage src={"/images/whiteboard.jpg"}/>
            </Center>
            <AllSectionsWrapper maxWidth={1500} style={{marginBottom: '200px'}}>
                {allSectionsList.map(section => <Section title={section.title} lessons={section.lessons}/>)}
            </AllSectionsWrapper>
        </>
    );
};

export default Course;