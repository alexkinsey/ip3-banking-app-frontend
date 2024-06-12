import styled from 'styled-components';
import { CategoryIcon } from '../../components/CategoryIcon/CategoryIcon';

export const IconTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 8px;
`;

export const StyledCategoryIcon = styled(CategoryIcon)`
  margin: 0 0 8px 0;
`;

export const LabelText = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
