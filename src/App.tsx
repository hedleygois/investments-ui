import React from "react";
import "./App.css";
import { InvestmentsOverview } from "./domains/stocks/InvestmentsOverview";
import { HashRouter, Switch, Route } from "react-router-dom";
import { DividendsOverview } from "./domains/dividends/DividendsOverview";
import { FundsOverview } from "./domains/funds/FundsOverview";
import { OperationsOverview } from "./domains/operations/OperationsOverview";
import { Toolbar } from "./components/toolbar/Toolbar";
import { InvestmentDetails } from "./domains/stocks/InvestmentDetail";
import { NewStockOperation } from "./domains/operations/NewStockOperation";
import { NewFundsOperations } from "./domains/operations/NewFundsOperation";

function App() {
  return (
    <div
      id="App"
      style={{ height: "100%", width: "100%", position: "absolute", overflowY: "hidden" }}
    >
      <HashRouter>
        <header style={{ textAlign: "center" }}>
          <h2>Hallo, Hedley</h2>
        </header>
        <div style={{ display: "flex", height: "100%" }} data-testid="main">
          <Toolbar />
          <div data-testid="data" style={{ width: "100%" }}>
            <Switch>
              <Route
                path="/"
                exact
                component={() => <h3>Select one operation on the toolbar.</h3>}
              />
              <Route path="/dashboard" exact component={InvestmentsOverview} />
              <Route path="/dashboard/stock/detail/:symbol" component={InvestmentDetails} />
              <Route path="/dividends" component={DividendsOverview} />
              <Route path="/funds" component={FundsOverview} />
              <Route path="/dashboard/funds/detail/:name" component={FundsOverview} />
              <Route path="/operations/stocks/new" component={NewStockOperation} />
              <Route path="/operations/funds/new" component={NewFundsOperations} />
              <Route path="/operations" component={OperationsOverview} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
