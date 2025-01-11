import { Box, SelectChangeEvent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Context, generateRandomColor, SelectInput } from "./Dashboard.tsx";

const style = {
  top: 0,
  left: 30,
  lineHeight: "24px",
};

export default function DotLineChart() {
  const vehiclesData: any = useContext(Context);

  const [chartData, setChartData] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState(1998);

  const [opacity, setOpacity] = React.useState({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };
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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          <Line
            type="monotone"
            dataKey="electricRange"
            strokeOpacity={opacity.uv}
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
