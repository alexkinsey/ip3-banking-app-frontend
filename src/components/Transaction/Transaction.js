// React Icons
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

// Styled Components
import {
  IconBox,
  IconVendorPriceContainer,
  TransactionContainer,
  VendorPriceContainer,
} from './Transaction.style';
import { Text } from '../Text/Text';
import styled from 'styled-components';

// Helpers
import { formatToCamelCase } from '../../common/helpers/formatToCamelCase';

// Mapping of categories to icons
const categoryIcons = {
  food: FaShoppingBasket,
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
  category = formatToCamelCase(category);
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
