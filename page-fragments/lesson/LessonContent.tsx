import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import ColumnLayoutElement from '../../components/column-layout-element/ColumnLayoutElement';
import { Mathjax } from '../../components/mathjax/Mathjax';
import { P } from '../../components/text/TextComponents';
import {IStyleArgument} from '../../styles/theme';

const Title = styled.h1`
  color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
  text-align: center;

  ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
    font-size: 30px;
  }
`;

const MainText = styled(P)`
  display: block;
  margin-bottom: 40px;
  font-size: 18px;
`;

type LessonContentProps = {
    title: string;
    content: string;
    withNavbar: boolean;
};

const LessonWrapper = styled(ColumnLayoutElement)`
  width: 55%;
  top: 0;
  padding: 0;
  padding-top: 50px;
  padding-bottom: 300px;

  ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
    width: 90%;
  }
`;

const LessonWrapperNoNavbar = styled(LessonWrapper)`
  margin-left: 23%;
  margin-right: 22%;

  ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

const LessonWrapperWithNavbar = styled(LessonWrapper)`
  margin-left: 35%;
  margin-right: 10%;

  ${(p: IStyleArgument) => p.theme.up(p.theme.breakpoint.tablet)} {
    margin-left: 40%;
    margin-right: 5%;
  }

  ${(p: IStyleArgument) => p.theme.down(p.theme.breakpoint.mobile)} {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

const LessonText = styled(MainText)`
  margin-bottom: 0.5rem;
  margin-top: 0;
  font-size: 18px;
  text-align: justify;
`;

/*
Lessons format:
title - h1
subtitles - h2
subsubtitles - h3
text: p, a
*/

const LessonContent: FunctionComponent<LessonContentProps> = (props) => {
  const XD = props.withNavbar ? LessonWrapperWithNavbar : LessonWrapperNoNavbar;

  return (
      <XD
        normalColumns={1}
        tabletColumns={1}
        mobileColumns={1}>
          <Title>
              {props.title}
          </Title>
          <LessonText>
              <Mathjax content={props.content} />
          </LessonText>
      </XD>
  );
};

export default LessonContent;
