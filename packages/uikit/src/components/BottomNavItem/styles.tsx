import styled from "styled-components";
import { Text } from "../Text";

export const StyledBottomNavItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  height: 44px;
  padding: 4px 12px;
  min-width: 0;
  &:hover {
    border-radius: 16px;
  }
  &:hover,
  &:hover div {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`;

export const StyledBottomNavText = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  user-select: none;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;
