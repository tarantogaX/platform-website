import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import ColumnLayoutElement from '../../components/column-layout-element/ColumnLayoutElement';
import { Mathjax } from '../../components/mathjax/Mathjax';
import { H3, P } from '../../components/text/TextComponents';
import {IStyleArgument} from '../../styles/theme';

const Title = styled(H3)`
  display: block;
  font-weight: bold;
  font-size: 3rem;
  margin-bottom: 20px;
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
  padding-top: 30px;
  padding-bottom: 300px;
`;

const LessonText = styled(MainText)`
  margin-bottom: 0.5rem;
  margin-top: 0;
  font-size: 18px;
`;


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
