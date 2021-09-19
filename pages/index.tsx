import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../styles/theme';
import Center from '../components/central/Center';
import { H0, H1, P, P2, A, FontWeight } from '../components/text/TextComponents';
import ColumnLayoutElement from '../components/column-layout-element/ColumnLayoutElement';
import { getSectionsList } from '../lib/articles';
import {SectionBox} from "../components/section-box/SectionBox";

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

const KompendiumWrapper = styled(Center)`
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: block;
    }
`;

const CourseDescription = styled(ColumnLayoutElement)`
    width: 50%;
    margin-right: 5%;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        width: 100%;
        margin: 0;
    }
`;

const CourseImage = styled.img`
    width: 45%;
    vertical-align: middle;
    /* margin-top: 20%;
    margin-bottom: 20%; */
    margin-top: 60px;
    ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.tablet)} {
        margin-top: 30px;
    }
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: block;
        width: 100%;
        margin-top: 10px;
    }
`;

const AllSectionsWrapper = styled(Center)`
    display: block;
    margin-top: 100px;
    margin-bottom: 100px;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        margin-top: 50px;
        margin-bottom: 30px;
    }
`;

const CourseTitle = styled(H0)`
    color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
    font-size: 50px;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        font-size: 35px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const CourseText = styled(P)`
    color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
    text-align: justify;
`;


const MaterialsCenter = styled(Center)`
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: block;
    }
`;

const MaterialWrapper = styled(ColumnLayoutElement)`
    width: 45%;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: block;
        width: 100%;
    }
`;

const ImageWrapper = styled.div`
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        position: relative;
        overflow: hidden;
        width: 100%;
        text-align: center;
        justify-content: center;
    }
`;

const MaterialWrapperOI = styled(MaterialWrapper)`
    margin-left: 5%;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        margin: auto;
        justify-content: center;
    }
`;

const MaterialWrapperOM = styled(MaterialWrapper)`
    margin-right: 5%;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        margin: auto;
    }
`;

const MaterialTitle = styled(H1)`
    height: 125px;
    color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
    font-size: 40px;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.tablet)} {
        font-size: 30px;
        height: 90px;
    }

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        font-size: 25px;
        margin-top: 60px;
        margin-bottom: 30px;
        height: auto;
    }
`;

const MaterialTitleOI = styled(MaterialTitle)`
    text-align: left;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        text-align: center;
    }
`;

const MaterialTitleOM = styled(MaterialTitle)`
    text-align: right;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        text-align: center;
    }
`;

const OIArticleImage = styled.img`
    width: 80%;
    /* margin-top: 60px; */
    transition: transform .2s;
    :hover {
        transform: scale(1.1);
    }

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        width: 90%;
        height: 90%;
        left: 5%;
    }
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
        width: 80%;
        height: 80%;
    }

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        width: 90%;
        height: 90%;
        left: 5%;
    }
`;

function Home ({allSectionsList}) {
    return (
        <>
            <Head>
                <title>Meet IT Kompendium</title>
            </Head>
            <KompendiumWrapper maxWidth={1500} style={{marginTop: '70px'}}>
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
            </KompendiumWrapper>
            <AllSectionsWrapper maxWidth={1500}>
                {allSectionsList.map(section => <SectionBox title={section.title} lessons={section.lessons}/>)}
            </AllSectionsWrapper>
            <MaterialsCenter maxWidth={1700} style={{marginTop: '70px'}}>
                <MaterialWrapperOI
                    normalColumns={1}
                    tabletColumns={1}
                    mobileColumns={1}
                    vertAlign={'top'}>
                    <ImageWrapper>
                        <MaterialTitleOI weight={FontWeight.SemiBold}>Top 10 rzeczy na II etap OI</MaterialTitleOI>
                        <a href="/oi-top10">
                            <OIArticleImage src={"/images/oitop10.jpg"}/>
                        </a>
                    </ImageWrapper>
                </MaterialWrapperOI>
                <MaterialWrapperOM
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
                </MaterialWrapperOM>
            </MaterialsCenter>
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

export default Home;