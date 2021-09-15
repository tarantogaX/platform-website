import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../styles/theme';
import Section from '../components/section/Section';
import LessonContent from '../page-fragments/lesson/LessonContent';


const ThisSection = styled(Section)`
    min-height: 800px;

    ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.tablet)} {
        min-height: 800px;
        margin-top: 0;
    }
`;


const Lesson: FunctionComponent = () => {
    return (
        <>
          <Head>
              <title>Meet IT Lesson</title>
          </Head>
          {/* <Navbar sectionTitle="ds" lessonsList={["dfsa", "fs"]} selectedLesson={1} /> */}
          <LessonContent title="Title" content="content" />
        </>
    );
};

export default Lesson;
