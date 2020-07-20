import React from "react";
import "./App.css";
import { StocksOverview } from "./domains/stocks/StocksOverview";
import { HashRouter, Switch, Route } from "react-router-dom";
import { DividendsOverview } from "./domains/dividends/DividendsOverview";
import { FundsOverview } from "./domains/funds/FundsOverview";
import { OperationsOverview } from "./domains/operations/OperationsOverview";
import { Toolbar } from "./components/toolbar/Toolbar";
import { StocksDetails } from "./domains/stocks/StocksDetail";
import { NewStockOperation } from "./domains/operations/NewStockOperation";
import { NewFundsOperations } from "./domains/operations/NewFundsOperation";
import tw from "twin.macro";
import styled from "styled-components";
import { StyledH2 } from "./components/header/Header";

function App() {
  return (
    <Container id="App">
      <HashRouter>
        <HeaderContainer>
          <StyledH2>Hallo, Hedley</StyledH2>
        </HeaderContainer>
        <Main data-testid="main">
          <Toolbar />
          <MainArea>
            <Switch>
              <Route path="/dashboard" exact component={StocksOverview} />
              <Route
                path="/dashboard/stock/detail/:symbol"
                component={StocksDetails}
              />
              <Route path="/dividends" component={DividendsOverview} />
              <Route path="/funds" component={FundsOverview} />
              <Route
                path="/dashboard/funds/detail/:name"
                component={FundsOverview}
              />
              <Route
                path="/operations/stocks/new"
                component={NewStockOperation}
              />
              <Route
                path="/operations/funds/new"
                component={NewFundsOperations}
              />
              <Route path="/operations" component={OperationsOverview} />

              <Route path="/" exact component={StocksOverview} />
            </Switch>
          </MainArea>
        </Main>
      </HashRouter>
    </Container>
  );
}

const Container = styled.div`
  ${tw`h-full w-full absolute overflow-y-hidden bg-blue-200`}
`;

const HeaderContainer = styled.header`
  ${tw`text-center bg-blue-200 text-white pt-2`}
`;

const Main = styled.div`
  ${tw`flex h-full`}
`;

const MainArea = styled.div`
  ${tw`w-full`}
`;

export default App;
