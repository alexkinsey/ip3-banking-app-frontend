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
  StyledIcon,
  TransactionContainer,
  VendorPriceContainer,
} from './Transaction.style';
import { Text } from '../Text/Text';

// Helpers
import { formatToCamelCase } from '../../common/helpers/formatToCamelCase';
import { formatCurrency } from '../../common/helpers/formatCurrency';
import { useNavigate } from 'react-router-dom';

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
  id = '1',
}) => {
  const navigate = useNavigate();
  category = formatToCamelCase(category);

  // Get the icon component for the category
  const IconComponent = categoryIcons[category] || FaFileInvoiceDollar;

  return (
    <TransactionContainer onClick={() => navigate(`transaction/${id}`)}>
      <IconVendorPriceContainer>
        <IconBox $category={category}>
          <StyledIcon as={IconComponent} />
        </IconBox>
        <VendorPriceContainer>
          <Text>{vendor}</Text>
          <Text size={5} color="grey">
            {time}
          </Text>
        </VendorPriceContainer>
      </IconVendorPriceContainer>
      <Text>{formatCurrency(amount)}</Text>
    </TransactionContainer>
  );
};
