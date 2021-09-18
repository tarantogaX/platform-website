import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../styles/theme';
import Center from '../components/central/Center';
import { H0, H1, P, P2, A, FontWeight } from '../components/text/TextComponents';
import ColumnLayoutElement from '../components/column-layout-element/ColumnLayoutElement';
import { Colours } from '../components/primitives/Colours';
import { getSectionsList } from '../lib/articles';
import {addProps} from '../utils/ComponentUtils';
import { RegisterButton } from '../components/button/Button';

/*
articles:
treść z hedge doca
tytuł
\ -> \\
" -> \" (z wyjątkiem pierwszego i ostatniego)
entery po ##
podwójne entery
```cpp=```
sections.json
*/

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
        <A href={props.title != "Złożoność obliczeniowa" ? `/articles/${props.id}` : props.id}>
            <LessonHeader colour={props.colour}>
                <LessonTitle noMargin>{props.title}</LessonTitle>
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
    margin-left: auto;
    margin-right: auto;
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
    text-align: justify;
`;

const MaterialWrapper = styled(CourseDescription)`
    width: 45%;
`;

const MaterialTitleOI = styled(H1)`
    color: ${Colours.LightBlack};
    font-size: 40px;
    text-align: left;
    margin-bottom: 20px;
`;

const MaterialTitleOM = styled(H1)`
    color: ${Colours.LightBlack};
    font-size: 40px;
    text-align: right;
`;

const OIArticleImage = styled.img`
    width: 80%;
    margin-top: 20px;
`;

const IframeWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
    text-align: center;
    justify-content: center;
`;

const IframeResponsive = styled.iframe`
    position: absolute;
    top: 0;
    left: 20%;
    bottom: 0;
    right: 0;
    width: 80%;
    height: 80%;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.tablet)} {
        left: 10%;
        width: 80%;
        height: 80%;
    }

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        left: 5%;
        width: 90%;
        height: 90%;
    }
`;

function Home ({allSectionsList}) {
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
            <Center maxWidth={1700} style={{marginTop: '70px'}}>
                <MaterialWrapper
                    normalColumns={1}
                    tabletColumns={1}
                    mobileColumns={1}
                    vertAlign={'top'}>
                    <MaterialTitleOI weight={FontWeight.SemiBold}>Top 10 rzeczy na II etap OI</MaterialTitleOI>
                    <RegisterButton text="Artykuł" link="/oi-top10"/>
                    <a href="/oi-top10">
                        <OIArticleImage src={"/images/oitop10.jpg"}/>
                    </a>
                </MaterialWrapper>
                <MaterialWrapper
                    normalColumns={1}
                    tabletColumns={1}
                    mobileColumns={1}
                    vertAlign={'top'}>
                    <MaterialTitleOM weight={FontWeight.SemiBold}>
                        Olimpiada Matematyczna – Zwycięzcy radzą, czego się uczyć
                    </MaterialTitleOM>
                    <IframeWrapper>
                        <IframeResponsive width="960px" height="541px" src="https://www.youtube.com/embed/3AscLWtSz7Y"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="responsive-iframe"
                            allowFullScreen style={{
                                //width: '1000px'
                            }}/>
                    </IframeWrapper>
                </MaterialWrapper>
            </Center>
            <Center>
                <img
                    style={{
                        width: '100%',
                    }}
                    src={`/images/end_text_pl.svg`}
                    alt={'Dołącz do ludzi który mają ambitne cele i działaj razem z nimi!'}
                />
            </Center>
        </>
    );
};

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/3AscLWtSz7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

export default Home;