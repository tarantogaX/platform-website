import styled from 'styled-components';
import {addProps} from '../../utils/ComponentUtils';

type CenterProps = {
    maxWidth?: number;
    centerItems?: boolean;
    noLeftMargin?: boolean;
    noRightMargin?: boolean;
};

const Center = styled(addProps<CenterProps>()(styled.div``))`
    max-width: ${(p) => p.maxWidth ?? 1250}px;
    padding-left: ${(p) => (p.noLeftMargin ?? false ? 0 : 25)}px;
    padding-right: ${(p) => (p.noRightMargin ?? false ? 0 : 25)}px;
    margin-left: ${(p) => (p.noLeftMargin ?? false ? '0' : 'auto')};
    margin-right: ${(p) => (p.noRightMargin ?? false ? '0' : 'auto')};
    overflow: visible;
    ${(p) =>
        p.centerItems ? 'text-align: center; justify-content: center;' : ''}
`;

export default Center;
