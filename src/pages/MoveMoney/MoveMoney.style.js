import styled from 'styled-components';
import { IoSwapVertical } from 'react-icons/io5';
import { darken, lighten } from 'polished';

export const TransferLocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme, $from }) =>
    $from ? theme.colors.primary : theme.colors.secondary};
  width: 100%;
  padding: 16px;
  border: 3px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
`;

export const SwapIcon = styled(IoSwapVertical)`
  font-size: 42px;
  color: ${({ theme }) => theme.colors.primary};
  margin: -8px auto -42px auto;

  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  &:hover {
    fill: ${({ theme }) => lighten(0.05, theme.colors.primary)};
  }

  &:active {
    transform: scale(0.9);
    fill: ${({ theme }) => darken(0.05, theme.colors.primary)};
  }
`;
