import React, { FC } from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import tw from "twin.macro";
import { StyledH2 } from "../../components/header/Header";

type FormOperationLayoutProps = {
  children: React.ReactNode;
};

export const FormOperationLayout: FC = ({ children }) => (
  <Container>
    <StyledH2>New Operation</StyledH2>
    <OperationContainer>{children}</OperationContainer>
  </Container>
);

const Container = styled(Paper)`
  ${tw`py-2 px-4`}
`;

const OperationContainer = styled.div`
  ${tw`flex flex-col`}
`;
