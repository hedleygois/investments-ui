import React from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";

export const Toolbar = () => {
  return (
    <ToolbarContainer data-testid="toolbar">
      <List>
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
              <InnerLink>
                <Link to="/dividends/new">New</Link>
              </InnerLink>
            )}
          />
        </Switch>
        <li>
          <Link to="/funds">Funds</Link>
          <Switch>
            <Route
              path="/funds"
              component={() => (
                <InnerLink>
                  <Link to="/funds/new">New</Link>
                </InnerLink>
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
                <InnerLink>
                  <Link to="/operations/stocks/new">New Stock Operation</Link>
                </InnerLink>
                <InnerLink>
                  <Link to="/operations/funds/new">New Funds Operation</Link>
                </InnerLink>
              </>
            )}
          />
        </Switch>
      </List>
    </ToolbarContainer>
  );
};

// TODO Fix these breakpoints later
const ToolbarContainer = styled.div`
  ${tw`flex flex-row lg:w-1/6 md:w-1/6 sm:w-1/4 bg-blue-50`}
`;

const List = styled.ul`
  ${tw`list-none p-0 w-full`}
`;

const InnerLink = styled.li`
  ${tw`ml-1`}
`;
