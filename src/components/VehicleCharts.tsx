import React from "react";
import BarLineChart from "./BarLineChart.tsx";
import LineChart from "./LineChart.tsx";
import CustomShapeBar from "./CustomShapeBar.tsx";
import RadioBarChart from "./RadioBarChart.tsx";
const VehicleCharts = ({ data }: any) => {
  return (
    <div>
      <BarLineChart />
      <LineChart />
      <CustomShapeBar />

      <RadioBarChart />
    </div>
  );
};

export default VehicleCharts;
