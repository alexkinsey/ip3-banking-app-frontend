// Styled Components
import {
  IconVendorPriceContainer,
  TransactionContainer,
  VendorPriceContainer,
} from './Transaction.style';
import { Text } from '../Text/Text';

// Helpers
import { formatToCamelCase } from '../../common/helpers/formatToCamelCase';
import { formatCurrency } from '../../common/helpers/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { CategoryIcon } from '../CategoryIcon/CategoryIcon';

export const Transaction = ({
  vendor = 'Vendor Name',
  time = '01:30pm',
  amount = '-10.99',
  category = 'bills',
  id = '1',
}) => {
  const navigate = useNavigate();
  category = formatToCamelCase(category);

  return (
    <TransactionContainer onClick={() => navigate(`transaction/${id}`)}>
      <IconVendorPriceContainer>
        <CategoryIcon category={category} />
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
