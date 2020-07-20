import React, { useState, useEffect } from "react";
import { OperationType } from "../../model/OperationType";
import { useHistory } from "react-router";
import { fetchAllFunds, AllFundsResponse } from "../../api/FundsApi";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { operateFund } from "../../service/OperationService";
import { SuccessFailureAlert } from "../../components/alert/SuccessFalureAlert";
import styled from "styled-components";
import tw from "twin.macro";
import { StyledH2 } from "../../components/header/Header";

export const NewFundsOperations = () => {
  const [value, setValue] = useState(0.0);
  const [fund, setFund] = useState<string>("");
  const [operation, setOperation] = useState(OperationType.BUY.valueOf());
  const [funds, setFunds] = useState<AllFundsResponse[]>([]);

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const history = useHistory();

  useEffect(() => {
    fetchAllFunds().then(setFunds);
  }, []);

  return (
    <Paper>
      <StyledH2>New Operation</StyledH2>
      <FundsOperationContainer>
        <div>
          <InputLabel htmlFor="operation-type">Operation Type</InputLabel>
          <Select
            labelId="operation-type"
            value={operation}
            onChange={(value) => setOperation(value.target.value as number)}
          >
            <MenuItem value={0}>BUY</MenuItem>
            <MenuItem value={1}>SELL</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel htmlFor="fund">Fund</InputLabel>
          <Select
            labelId="fund"
            value={fund}
            onChange={(value) => setFund(value.target.value as string)}
          >
            {funds.map((fund) => (
              <MenuItem value={fund.name}>{fund.name}</MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel htmlFor="operation-value">Value</InputLabel>
          <Input
            id="operation-value"
            required
            type="number"
            onChange={(value) => setValue(Number(value.target.value))}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </div>
      </FundsOperationContainer>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            operateFund({
              fundId: funds.find((f) => f.name === fund)?.id,
              valueToOperate: value,
              operation,
            })
              .then(() => setSuccess(true))
              .catch(() => setSuccess(false))
          }
        >
          Save
        </Button>
        <Button variant="contained" onClick={() => history.push("/dashboard")}>
          Cancel
        </Button>
      </div>
      <SuccessFailureAlert
        success={success}
        successMessage="Funds Operation Saved"
      />
    </Paper>
  );
};

const FundsOperationContainer = styled.div`
  ${tw`flex flex-column`}
`;
