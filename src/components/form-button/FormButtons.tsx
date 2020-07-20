import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import tw from "twin.macro";

type FormButtonsProps = {
  onSuccessClick: () => void;
  onCancelClick: () => void;
};

export const FormButtons = ({
  onSuccessClick,
  onCancelClick,
}: FormButtonsProps) => (
  <ButtonsContainer>
    <Button
      variant="contained"
      color="primary"
      onClick={() => onSuccessClick()}
    >
      Save
    </Button>
    <Button variant="contained" onClick={() => onCancelClick()}>
      Cancel
    </Button>
  </ButtonsContainer>
);

const ButtonsContainer = styled.div`
  ${tw`mt-2`}
`;
