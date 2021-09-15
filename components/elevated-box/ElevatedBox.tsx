import {addProps} from '../../utils/ComponentUtils';
import styled from 'styled-components';
import {IStyleArgument} from '../../styles/theme';

type ElevatedBoxProps = {
    useShadow?: boolean;
    useGrayBackground?: boolean;
    radius?: number;
    backgroundColor?: string;
};

const ElevatedBox = styled(addProps<ElevatedBoxProps>()(styled.div``))`
    padding: 15px;
    border-radius: ${(p) => p.radius ?? 10}px;
    background-color: ${(p: ElevatedBoxProps & IStyleArgument) =>
        p.backgroundColor == undefined
            ? p.useGrayBackground ?? true
                ? p.theme.colors.gray
                : 'rgba(255,255,255,0.5)'
            : p.backgroundColor};
    box-shadow: ${(p: ElevatedBoxProps & IStyleArgument) =>
        p.useShadow ?? true ? '0px 2px 5px 0px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export default ElevatedBox;
