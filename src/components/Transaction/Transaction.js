import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text/Text';
import {
  FaShoppingBasket,
  FaUtensils,
  FaPlane,
  FaHeart,
  FaFileInvoice,
  FaShoppingCart,
  FaFileInvoiceDollar,
} from 'react-icons/fa';
import { LuPopcorn } from 'react-icons/lu';

const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconVendorPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  background-color: ${({ theme, $category }) =>
    theme.colors.category[$category] || theme.colors.primary};
  aspect-ratio: 1;
  height: 52px;
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VendorPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Mapping of categories to icons
const categoryIcons = {
  groceries: FaShoppingBasket,
  eatingOut: FaUtensils,
  travel: FaPlane,
  entertainment: LuPopcorn,
  health: FaHeart,
  shopping: FaShoppingCart,
  bills: FaFileInvoice,
};

export const Transaction = ({
  vendor = 'Vendor Name',
  time = '01:30pm',
  amount = '-10.99',
  category = 'bills',
}) => {
  const formattedAmount =
    Number(amount) < 0 ? `-£${Math.abs(amount)}` : `£${amount}`;

  const CategoryIcon = styled(categoryIcons[category] || FaFileInvoiceDollar)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
  `;

  return (
    <TransactionContainer>
      <IconVendorPriceContainer>
        <IconBox $category={category}>
          <CategoryIcon />
        </IconBox>
        <VendorPriceContainer>
          <Text>{vendor}</Text>
          <Text size={5} color="grey">
            {time}
          </Text>
        </VendorPriceContainer>
      </IconVendorPriceContainer>
      <Text>{formattedAmount}</Text>
    </TransactionContainer>
  );
};
