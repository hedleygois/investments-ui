import React from "react";
import { OperationsTable } from "./OperationsTable";
import {
  listStockOperations,
  listFundsOperations,
} from "../../api/OperationsApi";

export const OperationsOverview = () => (
  <div style={{ display: "flex", flexDirection: "column", margin: "10px 10px 10px 10px" }}>
    <div style={{ marginBottom: 30 }}>
      <OperationsTable fetchData={listStockOperations} />
    </div>
    <OperationsTable fetchData={listFundsOperations} />
  </div>
);