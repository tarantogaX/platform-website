import * as React from "react";
import ReactMarkdown from "react-markdown";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import MathJax from "react-mathjax";
import SyntaxHighlighter from "react-syntax-highlighter";
import RemarkMathPlugin from "remark-math";
import styled from "styled-components";
import {Colours} from "../primitives/Colours";

interface FormulaProps {
  content: string;
}

type Math = { value: string };
type Code = {language: string, value: string};

//only colours
const StyledDiv = styled.div`
    h2 {
        color: ${Colours.Black}
    }
    h3 {
        color: ${Colours.LightBlack}
    }
    p {
        color: ${Colours.Black}
    }
    a {
        color: ${Colours.Green}
    }
`;

const mapProps = (props: ReactMarkdown.ReactMarkdownProps) => ({
    ...props,
    escapeHtml: false,
    plugins: [
        RemarkMathPlugin,
    ],
    renderers: {
        ...props.renderers,
        code: ({language, value}: Code) =>
            <SyntaxHighlighter language={language} children={value} />,
        math: ({value}: Math) =>
            <MathJax.Node formula={value} />,
        inlineMath: ({value}: Math) =>
            <MathJax.Node inline formula={value} />,
    }
});

export const Mathjax: React.FunctionComponent<FormulaProps> = ({content}) => {
    const source = content.split("$$").join("\n$$\n");
    return (
        <StyledDiv>
            <MathJax.Provider>
                <
                //@ts-ignore
                ReactMarkdownWithHtml {...mapProps({source})} />
            </MathJax.Provider>
        </StyledDiv>
        );
};