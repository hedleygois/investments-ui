import {
  Input,
  InputAdornment,
  InputLabel,

  MenuItem, Select
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchAllSymbols } from "../../api/StocksApi";
import { SuccessFailureAlert } from "../../components/alert/SuccessFalureAlert";
import { FormButtons } from "../../components/form-button/FormButtons";
import { operateStock } from "../../service/OperationService";
import { FormOperationLayout } from "./FormOperationLayout";


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
    <FormOperationLayout>
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
      <FormButtons
        onSuccessClick={() =>
          operateStock({ symbol: stock, amount, operation, value }).then(
            setSuccess
          )
        }
        onCancelClick={() => history.push("/dashboard")}
      />
      <SuccessFailureAlert
        success={success}
        successMessage="Stock Operation Saved"
      />
    </FormOperationLayout>
  );
};