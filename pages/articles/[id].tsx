import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import LessonContent from '../../page-fragments/lesson/LessonContent';
import Navbar from '../../components/navbar/Navbar';
import Center from '../../components/central/Center';
import { getAllArticlesIds, getArticlesData, getSectionWithLesson } from '../../lib/articles'

export async function getStaticProps({ params }) {
  const articleData = getArticlesData(params.id);
  const sectionData = getSectionWithLesson(params.id);
  const articleIndex = sectionData.lessons.map(lesson => lesson.id).indexOf(params.id);
  return {
    props: {
        articleData,
        sectionData,
        articleIndex
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllArticlesIds();
  return {
    paths,
    fallback: false
  };
}

export default function Article ({ articleData, sectionData, articleIndex }) {
    return (
        <>
            <Head>
                <title>{articleData.title}</title>
            </Head>
            <Center noLeftMargin noRightMargin maxWidth={1500}>
                <Navbar
                  sectionTitle={sectionData.title} lessonsList={sectionData.lessons} selectedLesson={articleIndex} />
                <LessonContent title={articleData.title} content={articleData.content} withNavbar={true} />
            </Center>
        </>
    );
};
