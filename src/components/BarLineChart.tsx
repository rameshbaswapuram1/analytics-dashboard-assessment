import { Box, SelectChangeEvent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Context, generateRandomColor, SelectInput } from "./Dashboard.tsx";

const data = [
  {
    name: "Page A",
    uv: 590,
  },
  {
    name: "Page B",
    uv: 868,
  },
];

export default function App() {
  const vehiclesData: any = useContext(Context);

  const [chartData, setChartData] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState(1998);

  const handleSelectYear = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedYear(+value || 1998);
  };

  useEffect(() => {
    const filterData =
      vehiclesData?.filter((vehicle) => {
        const modelYear = vehicle["Model Year"] ?? "";
        return +modelYear === selectedYear;
      }) || [];

    const chartData =
      filterData.map((vehicle: any) => ({
        name: vehicle.Make,
        electricRange: vehicle["Electric Range"] || 0,
        fill: generateRandomColor(),
      })) || [];

    const higherData: any =
      Object.values(
        chartData.reduce((acc, item) => {
          if (!item || !item.name || item.electricRange == null) {
            return acc;
          }
          const electricRangeValue = parseFloat(item.electricRange);
          if (isNaN(electricRangeValue)) {
            return acc;
          }
          if (
            !acc[item.name] ||
            electricRangeValue > parseFloat(acc[item.name].electricRange)
          ) {
            acc[item.name] = {
              ...item,
              electricRange: electricRangeValue.toString(),
            };
          }
          return acc;
        }, {}) || {}
      ) || [];

    setChartData(higherData.slice(0, 10));
  }, [vehiclesData, selectedYear]);
  return (
    <Box>
      <SelectInput
        selectedYear={selectedYear}
        handleSelectYear={handleSelectYear}
      />
      <ComposedChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="electricRange" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="electricRange" stroke="#ff7300" />
      </ComposedChart>
    </Box>
  );
}
