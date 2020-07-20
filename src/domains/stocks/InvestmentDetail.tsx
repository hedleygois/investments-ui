import React, { useState, useEffect } from "react";
import { Stock } from "../../model/Stock";
import { Container, Paper } from "@material-ui/core";
import { fetchHistory } from "../../api/StocksApi";
import { useRouteMatch } from "react-router-dom";
import { pipe } from "fp-ts/lib/pipeable";
import { fromNullable, map, filter } from "fp-ts/lib/Option";
import { InfoCard } from "../../components/cards/InfoCard";
import { differenceInDays, parseISO } from "date-fns";
import { PriceVolumeChart } from "../../components/charts/PriceVolumeChart";
import styled from "styled-components";
import tw from "twin.macro";
import { StyledH2 } from "../../components/header/Header";

export const InvestmentDetails = () => {
  const [history, setHistory] = useState<Stock[]>([]);
  const match = useRouteMatch<{ symbol: string }>(
    "/dashboard/stock/detail/:symbol"
  );

  useEffect(() => {
    pipe(
      fromNullable(match),
      filter((match) => !!match.params.symbol),
      map((match) => match.params.symbol),
      // Refactor to TaskEither
      // side-effect alert
      map((params) => fetchHistory(params).then(setHistory))
    );
  }, []);

  const filterHistoryByPeriod = (days: number) => (history: Stock[]) =>
    history.filter(
      (stock) => differenceInDays(new Date(), parseISO(stock.latest)) <= days
    );

  const filterByMonth = filterHistoryByPeriod(30);
  const filterBy6Month = filterHistoryByPeriod(180);
  const filterByWeek = filterHistoryByPeriod(7);

  const calculateAbsVariationPeriod = (history: Stock[]) =>
    // horribly slow way of doing this
    history.reduce(
      (acc, el, idx, arr) => arr[arr.length - 1].price - arr[0].price,
      0
    );

  const calculatePercentVariationPeriod = (history: Stock[]) =>
    // horribly slow way of doing this
    history.reduce(
      (acc, el, idx, arr) => arr[arr.length - 1].price / arr[0].price,
      0
    );

  const absVariationMonth = pipe(
    filterByMonth(history),
    calculateAbsVariationPeriod
  );
  const percentageVariationMonth = pipe(
    filterByMonth(history),
    calculatePercentVariationPeriod
  );

  const absVariation6Month = pipe(
    filterBy6Month(history),
    calculateAbsVariationPeriod
  );
  const percentage6Month = pipe(
    filterBy6Month(history),
    calculatePercentVariationPeriod
  );

  const absVariationWeek = pipe(
    filterByWeek(history),
    calculateAbsVariationPeriod
  );
  const percentageVariationWeek = pipe(
    filterByWeek(history),
    calculatePercentVariationPeriod
  );

  return history.length > 0 ? (
    <Container>
      <Paper>
        <HeaderContainer>
          <StyledH2>{history[0].symbol}</StyledH2>
          <PriceVolumeChart history={history} />
        </HeaderContainer>
      </Paper>
      <BodyContainer>
        <InfoCard
          header="Price Variation"
          subHeader="(All Time)"
          body={`R$${(
            history[history.length - 1].price - history[0].price
          ).toFixed(2)}`}
          footer={`${(
            history[history.length - 1].price / history[0].price
          ).toFixed(6)}%`}
          footerColor={
            history[history.length - 1].price / history[0].price > 0
              ? "primary"
              : "error"
          }
        />
        <InfoCard
          header="Price Variation"
          subHeader="(6 Months)"
          body={`R$${absVariation6Month.toFixed(2)}`}
          footer={`${absVariation6Month.toFixed(6)}%`}
          footerColor={absVariation6Month > 0 ? "primary" : "error"}
        />
        <InfoCard
          header="Price Variation"
          subHeader="(Month)"
          body={`R$${absVariationMonth.toFixed(2)}`}
          footer={`${percentageVariationMonth.toFixed(6)}%`}
          footerColor={absVariationMonth > 0 ? "primary" : "error"}
        />
        <InfoCard
          header="Price Variation"
          subHeader="(Week)"
          body={`R$${absVariationWeek.toFixed(2)}`}
          footer={`${percentageVariationWeek.toFixed(6)}%`}
          footerColor={absVariationWeek > 0 ? "primary" : "error"}
        />
      </BodyContainer>
    </Container>
  ) : null;
};

const HeaderContainer = styled.div`
  ${tw`flex flex-column`}
`;

const BodyContainer = styled.div`
  ${tw`flex`}
`;
