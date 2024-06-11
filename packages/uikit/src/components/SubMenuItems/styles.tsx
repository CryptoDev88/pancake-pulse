import styled, { css } from "styled-components";
import { Flex, Box } from "../Box";

export const SubMenuItemWrapper = styled(Flex)<{ $isMobileOnly: boolean }>`
  ${({ theme }) => theme.mediaQueries.sm} {
    ${({ $isMobileOnly }) => ($isMobileOnly ? "display:none" : "")};
  }
  width: 100%;
  overflow: hidden;
  position: relative;
`;
const StyledSubMenuItems = styled(Flex)`
  position: relative;
  z-index: 1;
  width: 100%;
  display: block;
  white-space: nowrap;
  scroll-behavior: smooth;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    display: flex;
  }
  flex-grow: 1;
  background-color: ${({ theme }) => `${theme.colors.backgroundAlt2}`};
  box-shadow: inset 0px -2px 0px -8px rgba(133, 133, 133, 0.1);
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const maskSharedStyle = css`
  position: absolute;
  z-index: 2;
  width: 48px;
  height: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
  opacity: 1;
  will-change: opacity;
  transition: 0.25s ease-in opacity;
  &.hide {
    pointer-events: none;
    opacity: 0;
    transition: 0.25s ease-out opacity;
  }
`;

export const LeftMaskLayer = styled.div`
  ${maskSharedStyle}
  left: 0px;
`;
export const RightMaskLayer = styled.div`
  ${maskSharedStyle}
  right: 0px;
`;

export const StyledSubMenuItemWrapper = styled(Box)`
  display: inline-block;
  vertical-align: top;
  scroll-snap-align: start;
`;

export default StyledSubMenuItems;
