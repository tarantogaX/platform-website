import * as React from "react";
import ReactMarkdown from "react-markdown";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import MathJax from "react-mathjax";
import SyntaxHighlighter from "react-syntax-highlighter";
import RemarkMathPlugin from "remark-math";
import styled from "styled-components";
import {IStyleArgument} from '../../styles/theme';

interface FormulaProps {
  content: string;
}

type Math = { value: string };
type Code = {language: string, value: string};

const StyledDiv = styled.div`
    h2, p {
        color: ${(p: IStyleArgument) => p.theme.colors.textMain};
    }
    h2 {
        text-align: left;
    }
    h1, h3 {
        color: ${(p: IStyleArgument) => p.theme.colors.textStrong};
        text-align: left;
    }
    a {
        color: ${(p: IStyleArgument) => p.theme.colors.primary};
    }
    p {
        overflow-x: auto;
        overflow-y: visible;
        height: fit-content;
        font-size: 16px;
        line-height: 30px;
    }
    li {
        font-size: 16px;
        line-height: 30px;
    }
    code {
        background-color: #F0F0F0;
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