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

const StyledDiv = styled.div`
    h1, h2, h3{
        margin-left: 4rem;
        margin-bottom: 18px;
        margin-top: 30px;
        font-weight: bold;
        line-height: 100%;
        display: block;
        color: ${Colours.Black};
    }
    code{
        color: inherit;
    }
    p, pre, code{
        margin-bottom: 18px;
    };
    h1{
       font-size: 80px;
       margin-bottom: 36px;
    };
    h2{
       font-size: 70px;
       margin-top: 130px;
       margin-bottom: 36px;
    }
    h3{
       font-size: 35px;
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