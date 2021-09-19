import styled from 'styled-components';
import { IStyleArgument } from '../../styles/theme';

const PageWrapper = styled.div`
    display: inline-block;
    width: 100%;
    min-height: calc(100vh - 50px);
    background-color: ${(p: IStyleArgument) => p.theme.colors.background};
`;

export default PageWrapper;
