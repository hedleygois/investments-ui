import React, { useState, useEffect } from "react";
import { FundWithValue } from "../../model/Fund";
import { fetchAllFundsWithLastValue, fetchAllFundsWithLastValueFP } from "../../api/FundsApi";
import { CircularProgress, Grid } from "@material-ui/core";
import { DataGrid } from "../../components/data-grid/DataGrid";
import { InfoCard } from "../../components/cards/InfoCard";
import { useHistory } from "react-router";

export const FundsOverview = () => {
  const history = useHistory();
  const [funds, setFunds] = useState<FundWithValue[] | undefined>(undefined);

  useEffect(() => {
    fetchAllFundsWithLastValueFP().then(setFunds);
    // fetchAllFundsWithLastValue().then(setFunds);
  }, []);

  return !funds ? (
    <CircularProgress />
  ) : (
    <DataGrid>
      {funds.map(({ value, Fund }) => (
        <Grid>
          <InfoCard
            header={Fund.name}
            body={`R$${value.toFixed(2)}`}
            onClick={() => history.push(`/dashboard/funds/detail/${Fund.name}`)}
          />
        </Grid>
      ))}
    </DataGrid>
  );
};
