import React from "react";
import { Grid } from "@material-ui/core";
import { Stock } from "../../model/Stock";
import { useHistory } from "react-router-dom";
import { InfoCard } from "../../components/cards/InfoCard";
import { DataGrid } from "../../components/data-grid/DataGrid";

type StocksOverviewGridProps = { stocks: Map<string, Stock> };

export const StocksOverviewGrid = ({
  stocks,
}: StocksOverviewGridProps) => {
  const history = useHistory();

  return (
    <DataGrid>
      {Array.from(stocks.entries()).map(([symbol, stock]) => (
        <Grid key={symbol} item>
          <InfoCard
            header={symbol}
            body={`R$${stock.price.toFixed(2)}`}
            footer={`${stock.changeP.toFixed(2)}%`}
            footerColor={stock.changeP > 0 ? "primary" : "error"}
            onClick={() => history.push(`/dashboard/stock/detail/${symbol}`)}
          />
        </Grid>
      ))}
    </DataGrid>
  );
};
