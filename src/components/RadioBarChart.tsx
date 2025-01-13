import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { Context, higestChartData, VehicleData } from "../utils/utils.tsx";
import { CustomMakes, SelectInput } from "./CommonComponents.tsx";
import { styles } from "./styles.ts";
interface IState {
  selectedYear: number;
}
const RadioBarChart = () => {
  const vehiclesData: VehicleData[] | null = useContext(Context);
  const [chartData, setChartData] = useState<VehicleData[] | []>([]);
  const [selectedYear, setSelectedYear] =
    useState<IState["selectedYear"]>(2024);
  const handleSelectYear = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedYear(+value);
  };

  useEffect(() => {
    setChartData(
      higestChartData({
        vehiclesData: vehiclesData,
        selectedYear: selectedYear,
        itemName: "Make",
      })
    );
  }, [vehiclesData, selectedYear]);

  return (
    <Box sx={styles.chartMainBox}>
      <Typography sx={styles.chartHeading}>
        Top Electric Vehicle Makes by Range
      </Typography>
      <Box sx={styles.tooltip}>
        <Tooltip title="Filter the Top Electric Vehicle Makes by Model Year">
          <InfoOutlinedIcon />
        </Tooltip>
        <SelectInput
          selectedYear={selectedYear}
          handleSelectYear={handleSelectYear}
          isNeedDefault={false}
        />
      </Box>
      <ResponsiveContainer width="100%" height="80%">
        <RadialBarChart
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
        </RadialBarChart>
      </ResponsiveContainer>
      <CustomMakes chartData={chartData} />
    </Box>
  );
};
export default RadioBarChart;
