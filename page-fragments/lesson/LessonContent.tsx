import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import ColumnLayoutElement from '../../components/column-layout-element/ColumnLayoutElement';
import { Mathjax } from '../../components/mathjax/Mathjax';
import { Colours } from '../../components/primitives/Colours';
import { H3, P } from '../../components/text/TextComponents';
import {IStyleArgument} from '../../styles/theme';

const Title = styled.h1`
  color: ${Colours.LightBlack};
  text-align: center;
`;

const MainText = styled(P)`
  display: block;
  margin-bottom: 40px;
  font-size: 18px;
`;

type LessonContentProps = {
    title: string;
    content: string;
};

const LessonWrapper = styled(ColumnLayoutElement)`
  width: 55%;
  margin-left: 10%;
  top: 0;
  padding-top: 50px;
  padding-bottom: 300px;
  margin-left: 500px;
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
    return (
        <LessonWrapper
          normalColumns={2}
          tabletColumns={2}
          mobileColumns={1}>
            <Title>
                {props.title}
            </Title>
            <LessonText>
                <Mathjax content={props.content} />
            </LessonText>
        </LessonWrapper>
    );
};

export default LessonContent;
