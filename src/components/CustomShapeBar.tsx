import { Box, SelectChangeEvent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context, generateRandomColor, SelectInput } from "./Dashboard.tsx";

import { FunctionComponent } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};

const TriangleBar: FunctionComponent<any> = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function CustomShapeBar() {
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
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="electricRange"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={generateRandomColor()} />
          ))}
        </Bar>
      </BarChart>
    </Box>
  );
}
