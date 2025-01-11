import { Box, SelectChangeEvent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context, generateRandomColor, SelectInput } from "./Dashboard.tsx";
import { Legend, RadialBar, RadialBarChart } from "recharts";
const style = {
  top: 0,
  left: 30,
  lineHeight: "24px",
};

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
      <RadialBarChart
        width={900}
        height={300}
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={40}
        data={chartData}
      >
        <RadialBar
          minAngle={15}
          label={{ position: "insideStart", fill: "white", fontSize: "10px" }}
          background
          clockWise
          dataKey="electricRange"
        />
        <Legend
          iconSize={20}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
    </Box>
  );
}
