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
import { sections, SectionProps } from "../../lib/sections";
  
function getSectionWithLesson(id: string): SectionProps {
    const thisSection = sections.find(section => section.lessons.map(lesson => lesson.id).indexOf(id) > -1);
    return thisSection;
}


const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    padding: 7px;
    background-color: ${(p: IStyleArgument) => p.theme.colors.headerBackground};
    z-index: 100;
    width: 100vw;
    box-shadow: ${
        (p: IStyleArgument) =>
            p.theme.name == 'light'
                ? '0px 0px 5px 5px rgba(0, 0, 0, 0.2)'
                : '0px 0px 5px 2px rgba(255, 255, 255, 0.2)'};
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
    background-color: ${(p: IStyleArgument) => p.theme.colors.headerBackground};
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
        padding: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        transform: translateX(${(p) => (p.open ? '0' : '100%')});
        background-color: ${(p: IStyleArgument) => p.theme.colors.headerBackground};
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


const InnerLinksWrapper = styled(addProps<{show: boolean}>()(styled.div``))`
    display: none;
    ${(p: {show: boolean} & IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: ${(q: {show: boolean} & IStyleArgument) => q.show ? 'block' : 'none'};
        background-color: ${(q: {show: boolean} & IStyleArgument) => q.theme.colors.backgroundStrong};
        box-shadow: 5px 0px 5px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 2;
    }
`;

const HeaderInnerLink = styled(A)`
    display: none;
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        display: inline-block;
        text-align: center;
        width: 100%;
        min-width: unset;
        line-height: 40px;
        margin: 0;
        padding: 0;
    }
`;

const HeaderSection = styled(HeaderInnerLink)`
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        background-color: ${(p: IStyleArgument) => p.theme.colors.primaryLight};
        color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
        font-weight: bold;
        line-height: 45px;
    }
`;

const HeaderLesson = styled(HeaderInnerLink)`
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        background-color: ${(p: IStyleArgument) => p.theme.colors.backgroundStrong};
        color: ${(p: IStyleArgument) => p.theme.colors.textMain};
    }
`;

const HeaderLessonSelected = styled(HeaderInnerLink)`
    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
        background-color: ${(p: IStyleArgument) => p.theme.colors.background};
        color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
        font-weight: bold;
        line-height: 45px;
        position: relative;
        z-index: 0;
    }
`;

const MeetITHeader: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const url = router.asPath;
    const urlList = url.split("/");
    const lessonId = urlList[urlList.length - 1];

    let lessonIndex = -1;
    let lessonsList = [];

    if (urlList.length > 2) {
        const sectionData = getSectionWithLesson(lessonId);
        lessonsList = sectionData.lessons;
        lessonIndex = sectionData.lessons.map(lesson => lesson.id).indexOf(lessonId);
    }

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
                    <div style={{height: '20px'}} />
                    {urlList.length > 2
                        ? <>
                            <InnerLinksWrapper show={true}>
                                <HeaderSection
                                    onClick={() => setOpen(false)}
                                    href={"/"}>
                                    {getSectionWithLesson(lessonId).title}
                                </HeaderSection>
                                {lessonsList.filter((lesson, index) => (index < lessonIndex)).map((lesson, index) =>
                                    <HeaderLesson onClick={() => setOpen(false)} href={(lesson.id.length < 10 ? "/articles/" : "") + lesson.id}>
                                        {lesson.title}
                                    </HeaderLesson>
                                )}
                            </InnerLinksWrapper>
                                <HeaderLessonSelected onClick={() => setOpen(false)} href={"/articles/" + lessonsList[lessonIndex].id}>
                                    {lessonsList[lessonIndex].title}
                                </HeaderLessonSelected>
                            <InnerLinksWrapper show={lessonIndex < lessonsList.length - 1}>
                                {lessonsList.filter((lesson, index) => (index > lessonIndex)).map((lesson, index) =>
                                    <HeaderLesson onClick={() => setOpen(false)} href={(lesson.id.length < 10 ? "/articles/" : "") + lesson.id}>
                                        {lesson.title}
                                    </HeaderLesson>
                                )}
                            </InnerLinksWrapper>
                        </>
                        : <></>
                    }
                </LinksWrapper>
            </Center>
        </HeaderWrapper>
    );
};

export default MeetITHeader;