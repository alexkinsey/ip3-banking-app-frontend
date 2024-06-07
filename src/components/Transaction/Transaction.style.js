import styled from 'styled-components';

export const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconVendorPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconBox = styled.div`
  background-color: ${({ theme, $category }) =>
    theme.colors.category[$category] || theme.colors.primary};
  aspect-ratio: 1;
  height: 52px;
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VendorPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
