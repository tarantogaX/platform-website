import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import LessonContent from '../page-fragments/lesson/LessonContent';
import Center from '../components/central/Center';
import { getAllArticlesIds, getArticlesData, getSectionWithLesson } from '../lib/articles'

export async function getStaticProps() {
  const articleData = getArticlesData("oi_top10");
  return {
    props: {
        articleData
    }
  };
}

export default function Article ({ articleData }) {
    return (
        <>
            <Head>
                <title>Top 10 rzeczy na II etap OI</title>
            </Head>
            <Center noLeftMargin noRightMargin maxWidth={1700}>
                <LessonContent title={articleData.title} content={articleData.content} withNavbar={false} />
            </Center>
        </>
    );
};
