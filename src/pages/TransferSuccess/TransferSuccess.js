import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ButtonPattern } from '../../components/ButtonPattern/ButtonPattern';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from '../../components/Link/Link';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useAccounts } from '../../hooks/useAccounts';

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  padding: 16px;
`;

const CheckIcon = styled(FaCheckCircle)`
  color: ${({ theme }) => theme.colors.success};
`;

export const TransferSuccess = ({ formData }) => {
  const navigate = useNavigate();
  const { accessToken, user } = useAuthUser();
  const { refreshAccounts } = useAccounts();

  return (
    <PageLayout hasBottomButton>
      <SuccessContainer>
        <CheckIcon size={224} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Heading>Transfer Successful</Heading>
          {formData && (
            <Text>
              You successfully transferred <strong>{formData.amount}</strong> to
              {formData.name}
            </Text>
          )}
        </div>
        {formData && (
          <Link onClick={() => console.log('Share confirmation clicked')}>
            Share confirmation
          </Link>
        )}
      </SuccessContainer>
      <Spacer />
      <ButtonPattern
        primaryLabel="Home"
        onPrimaryClick={() => {
          refreshAccounts(user.id, accessToken);
          navigate('/');
        }}
        secondaryLabel="New Transfer"
        onSecondaryClick={() => {
          refreshAccounts(user.id, accessToken);
          navigate('/transfer-money');
        }}
      />
    </PageLayout>
  );
};
