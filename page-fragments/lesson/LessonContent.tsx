import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import { Mathjax } from '../../components/mathjax/Mathjax';
import {IStyleArgument} from '../../styles/theme';

enum Colour {
  MeetITdarkGrey = "#3a3e3a",
  MeetITwhite = "white",
  MeetITlightGreen = "#5cff5c",
  MeetITgreen = "#42eb53",
  MeetITgreen_main = "#0fb020",
  MeetITgreen_hover = "#0fd620",
  MeetITblack = "black",
  MeetITgrey = "#888888",
  MeetITlightGrey = "#CCCCCC",
  MeetITsuperLightGrey = "#F7F7F7",
  MeetITsuperLightGreyHover = "#F0F0F0",
  MeetITdarkWhite = "#F7F7F7",
}

enum Font {
  MeetITsans = "Source Sans Pro, sans-serif",
}

const Sans = styled.span`
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");
`;

const Title = styled(Sans)`
  display: block;

  color: ${Colour.MeetITblack};

  font-weight: bold;
  font-family: ${Font.MeetITsans};
  font-size: 3rem;
  margin-bottom: 20px;
`;

const MainText = styled(Sans)`
  display: block;
  color: ${Colour.MeetITblack};
  font-family: ${Font.MeetITsans};
  margin-bottom: 40px;
  font-size: 18px;
`;

type LessonContentProps = {
    title: string;
    content: string;
};

const LessonWrapper = styled.div`
  width: 75rem;
  padding-top: 10rem;
  padding-left: 10rem;
  padding-right: 7rem;
  padding-top: 8rem;
`;

const LessonTitle = styled(Title)`
`;

const LessonText = styled(MainText)`
  margin-bottom: 0.5rem;
  margin-top: 0;
  font-size: 18px;
  color: green;
`;


const LessonContent: FunctionComponent<LessonContentProps> = (props) => {
    return (
        <LessonWrapper>
            <LessonTitle>
                {props.title}
            </LessonTitle>
            <LessonText>
                <Mathjax content={props.content} />
            </LessonText>
        </LessonWrapper>
    );
};

export default LessonContent;
