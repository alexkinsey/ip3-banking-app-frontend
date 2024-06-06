import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ButtonPattern } from '../../components/ButtonPattern/ButtonPattern';
import { Text } from '../../components/Text/Text';

export const MoveMoney = () => {
  return (
    <PageLayout heading="Move money">
      <Text weight="medium">From</Text>
      <Text weight="medium">To</Text>
      <ButtonPattern primaryLabel="Transfer" secondaryLabel="Cancel" />
    </PageLayout>
  );
};
