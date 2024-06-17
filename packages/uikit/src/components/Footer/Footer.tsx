import { vars } from "../../ui";
import React from "react";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledText,
  StyledToolsContainer,
} from "./styles";

import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import styled from "styled-components";

const FooterText = styled.div`
  box-shadow: none;
  width: 100%;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto", Sans-serif;
  // margin: 0 8px;
  padding: 10px 0 0 0;
  border: none;
  display: flex;
  justify-content: center;

  // ${({ theme }) => theme.mediaQueries.xs} {
  //   width: 80px;
  // }

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   width: auto;
  // }
`;

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "20px 40px 20px 40px"]} {...props} justifyContent="center">
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          {/* <LogoWithTextIcon isDark width="130px" /> */}
        </StyledIconMobileContainer>
        <Flex
          order={[2, null, 1]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "0px"]}
        >
          {items?.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledList key={index}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      data-theme="dark"
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? vars.colors.warning : "text"}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <Box display={["none", null, "block"]}>
            {/* <LogoWithTextIcon isDark width="160px" /> */}
            <FooterText>
              <br />
            </FooterText>
            <br />
            <p>
              <div style={{ color: "#FFFFFF" }}> </div>
            </p>
            {/* <Link href="https://www.geckoterminal.com/pulsechain/pools/0xc8df4af0c613c8820be2e84e082c6d62afbd4226" color="cyan" target="_blank">GeckoTerminal</Link> */}
          </Box>
          <StyledSocialLinks order={[1]} pb={["0px", null, "0px"]} mb={["0", null, "0px"]} />
        </Flex>

        {
          <StyledToolsContainer
            data-theme="dark"
            order={[1, null, 3]}
            flexDirection={["column", null, "row"]}
            justifyContent="space-between"
          >
            <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
              {/* <Box mr="20px">
              <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" />
            </Box>*/}
              <Button
                data-theme="light"
                as="a"
                href="https://dextop.pro/v1"
                target="_blank"
                scale="sm"
                endIcon={<ArrowForwardIcon color="backgroundAlt" />}
              >
                {buyCakeLabel}
              </Button>
            </Flex>
          </StyledToolsContainer>
        }
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
