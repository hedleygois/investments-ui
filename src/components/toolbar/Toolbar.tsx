import React from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router";

export const Toolbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "10%",
        background: "#f0f0f0",
        marginLeft: 10,
      }}
      data-testid="toolbar"
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dividends">Dividends</Link>
        </li>
        <Switch>
          <Route
            path="/dividends"
            component={() => (
              <li style={{ marginLeft: 5 }}>
                <Link to="/dividends/new">New</Link>
              </li>
            )}
          />
        </Switch>
        <li>
          <Link to="/funds">Funds</Link>
          <Switch>
            <Route
              path="/funds"
              component={() => (
                <li style={{ marginLeft: 5 }}>
                  <Link to="/funds/new">New</Link>
                </li>
              )}
            />
          </Switch>
        </li>
        <li>
          <Link to="/operations">Operations</Link>
        </li>
        <Switch>
          <Route
            path="/operations"
            component={() => (
              <>
                <li style={{ marginLeft: 5 }}>
                  <Link to="/operations/stocks/new">New Stock Operation</Link>
                </li>
                <li style={{ marginLeft: 5 }}>
                  <Link to="/operations/funds/new">New Funds Operation</Link>
                </li>
              </>
            )}
          />
        </Switch>
      </ul>
    </div>
  );
};
