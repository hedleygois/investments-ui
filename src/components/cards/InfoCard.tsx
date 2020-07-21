import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";
import tw from "twin.macro";

type TypographyColor =
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "error";

type InfoCardProps = {
  onClick?: () => void;
  header?: string;
  subHeader?: string;
  body?: string;
  footer?: string;
  footerColor?: TypographyColor;
};

export const InfoCard = ({
  onClick,
  header,
  subHeader,
  body,
  footer,
  footerColor,
}: InfoCardProps) => (
  <CardContainer onClick={onClick} data-testid={`info-card-${header}`}>
    <CardContent>
      <MainCardText color="textSecondary" gutterBottom>
        {header}
      </MainCardText>
      <SubCardText color="textSecondary" gutterBottom>
        {subHeader}
      </SubCardText>
      <BaseCardText variant="h5" component="h2">
        {body}
      </BaseCardText>
      <BaseCardText variant="body2" component="p" color={footerColor}>
        {footer}
      </BaseCardText>
    </CardContent>
  </CardContainer>
);

const CardContainer = styled(Card)`
  ${tw`m-2`}
  height: 135px;
  width: 185px;
`;

// Fix these types later
const BaseCardText = styled(Typography)<{ component?: any }>`
  ${tw`overflow-hidden truncate`}
`;

const MainCardText = styled(BaseCardText)<{ component?: any }>`
  ${tw`text-sm`}
`;

const SubCardText = styled(MainCardText)<{ component?: any }>`
  ${tw`mb-3`}
`;
