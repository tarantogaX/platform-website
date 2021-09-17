import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../styles/theme';
import LessonContent from '../page-fragments/lesson/LessonContent';
import Navbar from '../components/navbar/Navbar';
import Center from '../components/central/Center';
import { BUTTON, H0, P, P2 } from '../components/text/TextComponents';
import ColumnLayoutElement from '../components/column-layout-element/ColumnLayoutElement';
import { Colours } from '../components/primitives/Colours';
import { getSortedArticlesData } from '../lib/articles'

export async function getStaticProps() {
  const allArticlesData = getSortedArticlesData()
  return {
    props: {
        allArticlesData
    }
  }
}

const SectionHeader = styled.div`
    background-color: ${Colours.LightGray};
    width: 800px;
    height: 40px;
    text-align: center;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    :hover {
        cursor: pointer;
    }
`;

const SectionTitle = styled(P)`
    padding: 10px;
`;

type SectionProps = {
    title: string;
    id: number;
}

const Section: FunctionComponent<SectionProps> = (props) => {
    return (
        <SectionHeader>
            <SectionTitle noMargin>{props.title}</SectionTitle>
        </SectionHeader>
    );
};


const CourseDescription = styled(ColumnLayoutElement)`
    width: 60%;
    margin-right: 30px;
`;

const CourseImage = styled.img`
    width: 30%;
    margin: 0;
`;

const SectionsWrapper = styled(Center)`
    display: block;
    margin-top: 100px;
`;

function Course ({allArticlesData}) {
    return (
        <>
            <Head>
                <title>Meet IT Kompendium</title>
            </Head>
            <Center maxWidth={1500}>
                <CourseDescription
                    normalColumns={2}
                    tabletColumns={2}
                    mobileColumns={1}>
                    <H0>Kompendium</H0>
                    <P>Znajdziesz tu materiały, które (według nas) pokrywają całą tematykę, z jaką możesz się spotkać na Olimpiadzie Informatycznej. Każdy z działów zawiera kilka lekcji o zróżnicowanej trudności. Lekcje o wyższych numerach mogą, ale nie muszą, być trudniejsze niż te o niższych. W razie problemów zawsze możesz prosić swojego tutora Meet IT o pomoc. Gdybyś jakimś cudem trafił tutaj jako osoba nienależąca do projektu, koniecznie dowiedz się więcej – na naszej stronie lub Facebook'u. Zachęcamy do skorzystania ze wsparcia!</P>
                </CourseDescription>
                <CourseImage src={"/images/whiteboard.jpg"}/>
            </Center>
            <SectionsWrapper maxWidth={1500} style={{marginBottom: '200px'}}>
                {allArticlesData.map(({ id, title }) => <Section title={title} id={2}/>)}
            </SectionsWrapper>
        </>
    );
};

export default Course;