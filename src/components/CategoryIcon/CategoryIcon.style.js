import styled from 'styled-components';
import { lighten, rgba } from 'polished';

export const IconBox = styled.div`
  background-color: ${({ theme, $category }) =>
    theme.colors.category[$category] || theme.colors.primary};
  aspect-ratio: 1;
  height: ${({ size }) => `${size}px`};
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme, $category, $glow }) =>
    $glow &&
    `0px 0px 16px 4px ${rgba(lighten(0.2, theme.colors.category[$category]), 0.5)}`};
`;

export const StyledIcon = styled.i`
  color: ${({ theme }) => theme.colors.white};
`;
