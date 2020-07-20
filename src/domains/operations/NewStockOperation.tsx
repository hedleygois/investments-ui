import React, { useState, useEffect } from "react";
import {
  Paper,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@material-ui/core";

import { fetchAllSymbols } from "../../api/StocksApi";
import { operateStock } from "../../service/OperationService";
import { useHistory } from "react-router";
import { StyledH2 } from "../../components/header/Header";
import styled from "styled-components";
import tw from "twin.macro";
import { SuccessFailureAlert } from "../../components/alert/SuccessFalureAlert";

export const NewStockOperation = () => {
  const [value, setValue] = useState(0.0);
  const [amount, setAmount] = useState(0);
  const [stock, setStock] = useState("");
  const [operation, setOperation] = useState(1);
  const [stocks, setStocks] = useState<string[]>([]);

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const history = useHistory();

  useEffect(() => {
    fetchAllSymbols().then((response) =>
      setStocks(response.map(({ symbol }) => symbol))
    );
  }, []);

  return (
    <Paper>
      <StyledH2>New Operation</StyledH2>
      <FormContainer>
        <div>
          <InputLabel htmlFor="operation-type">Operation Type</InputLabel>
          <Select
            labelId="operation-type"
            value={operation}
            onChange={(value) => setOperation(value.target.value as number)}
          >
            <MenuItem value={1}>BUY</MenuItem>
            <MenuItem value={2}>SELL</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel htmlFor="stock-symbol">Stock</InputLabel>
          <Select
            labelId="stock-symbol"
            value={stock}
            onChange={(value) => setStock(value.target.value as string)}
          >
            {stocks.map((stock) => (
              <MenuItem value={stock}>{stock}</MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel htmlFor="operation-stock-amount">Amount</InputLabel>
          <Input
            id="operation-stock-amount"
            required
            type="number"
            onChange={(value) => setAmount(Number(value.target.value))}
          />
        </div>
        <div>
          <InputLabel htmlFor="operation-value">Cost</InputLabel>
          <Input
            id="operation-value"
            required
            type="number"
            onChange={(value) => setValue(Number(value.target.value))}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </div>
      </FormContainer>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            operateStock({ symbol: stock, amount, operation, value }).then(setSuccess)
          }
        >
          Save
        </Button>
        <Button variant="contained" onClick={() => history.push("/dashboard")}>
          Cancel
        </Button>
      </div>
      <SuccessFailureAlert success={success} successMessage="Stock Operation Saved" />
    </Paper>
  );
};

const FormContainer = styled.div`
  ${tw`flex flex-column`}
`;
