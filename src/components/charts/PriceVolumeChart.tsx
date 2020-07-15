import React from "react";
import { Stock } from "../../model/Stock";

import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Bar,
  BarChart,
  Brush,
} from "recharts";

type PriceVolumeChartProps = {
  history: Stock[];
};

export const PriceVolumeChart = ({ history }: PriceVolumeChartProps) => (
  <LineChart
    width={1000}
    height={800}
    data={history}
    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
  >
    <XAxis dataKey="latest" />
    <YAxis dataKey="price" />
    <Tooltip />
    <CartesianGrid stroke="#f5f5f5" />
    <Line type="monotone" dataKey="latest" stroke="#ff7300" />
    <Line type="monotone" dataKey="price" stroke="#387908" />
    <Brush>
      <BarChart data={history}>
        <Bar dataKey="volume" />
      </BarChart>
    </Brush>
  </LineChart>
);
