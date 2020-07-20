import React, { useState, useEffect } from "react";
import { OperationType } from "../../model/OperationType";
import { useHistory } from "react-router";
import { fetchAllFunds, AllFundsResponse } from "../../api/FundsApi";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { operateFund } from "../../service/OperationService";
import { SuccessFailureAlert } from "../../components/alert/SuccessFalureAlert";
import { FormButtons } from "../../components/form-button/FormButtons";
import { FormOperationLayout } from "./FormOperationLayout";

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
    <FormOperationLayout>
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
      <FormButtons
        onSuccessClick={() =>
          operateFund({
            fundId: funds.find((f) => f.name === fund)?.id,
            valueToOperate: value,
            operation,
          })
            .then(() => setSuccess(true))
            .catch(() => setSuccess(false))
        }
        onCancelClick={() => history.push("/dashboard")}
      />
      <SuccessFailureAlert
        success={success}
        successMessage="Funds Operation Saved"
      />
    </FormOperationLayout>
  );
};