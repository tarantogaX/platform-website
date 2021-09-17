import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';
import Section from '../../components/section/Section';
import LessonContent from '../../page-fragments/lesson/LessonContent';
import Navbar from '../../components/navbar/Navbar';
import Center from '../../components/central/Center';
import { getAllArticlesIds, getArticlesData } from '../../lib/articles'

export async function getStaticProps({ params }) {
  const articleData = getArticlesData(params.id)
  return {
    props: {
        articleData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllArticlesIds()
  return {
    paths,
    fallback: false
  }
}

export default function Article ({ articleData }) {
    return (
        <>
            <Head>
                <title>Meet IT Lesson</title>
            </Head>
            <Center noLeftMargin maxWidth={1500}>
                <Navbar sectionTitle="Algorytmy dynamiczne" lessonsList={["Dziel i zwyciężaj", "Zliczanie kubełkowe", "Gąsienica", "Sortowanie kątowe"]} selectedLesson={1} />
                <LessonContent title={articleData.title} content={articleData.content} />
            </Center>
        </>
    );
};
