import React from 'react';
import { IconBox, StyledIcon } from './CategoryIcon.style';
import { formatToCamelCase } from '../../common/helpers/formatToCamelCase';
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

const categoryIcons = {
  food: FaShoppingBasket,
  eatingOut: FaUtensils,
  travel: FaPlane,
  entertainment: LuPopcorn,
  health: FaHeart,
  shopping: FaShoppingCart,
  bills: FaFileInvoice,
};

export const CategoryIcon = ({
  category,
  size = 52,
  glow = false,
  className,
}) => {
  category = formatToCamelCase(category);
  const IconComponent = categoryIcons[category] || FaFileInvoiceDollar;
  const iconSize = Math.floor(size * 0.6);
  return (
    <IconBox
      $category={category}
      size={size}
      $glow={glow}
      className={className}
    >
      <StyledIcon as={IconComponent} size={iconSize} />
    </IconBox>
  );
};
