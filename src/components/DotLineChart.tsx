import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Context,
  higestChartData,
  NewTooltip,
  VehicleData,
} from "../utils/utils.tsx";
import {
  CustomMakes,
  CustomTooltip,
  SelectInput,
} from "./CommonComponents.tsx";
import { styles } from "./styles.ts";

interface IState {
  selectedYear: number;
  maxDomain: number;
}
const DotLineChart = () => {
  const vehiclesData: VehicleData[] | null = useContext(Context);

  const [chartData, setChartData] = useState<VehicleData[] | []>([]);
  const [selectedYear, setSelectedYear] =
    useState<IState["selectedYear"]>(2024);
  const [maxDomain, setMaxDomain] = useState<IState["maxDomain"]>(150);
  const handleSelectYear = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedYear(+value);
  };

  useEffect(() => {
    setChartData(
      higestChartData({
        vehiclesData: vehiclesData,
        selectedYear: selectedYear,
        itemName: "City",
      })
    );
  }, [vehiclesData, selectedYear]);

  useEffect(() => {
    const maxValue = Math.max(...chartData.map((item) => item.electricRange));
    setMaxDomain(maxValue + maxValue * 0.1);
  }, [chartData]);
  return (
    <Box sx={styles.chartMainBox}>
      <Typography sx={styles.chartHeading}>
        Top Electric Vehicle Cities by Range
      </Typography>
      <Box sx={styles.tooltip}>
        <NewTooltip title="Filter the Top Electric Vehicle Cities by Model Year">
          <InfoOutlined />
        </NewTooltip>
        <SelectInput
          selectedYear={selectedYear}
          handleSelectYear={handleSelectYear}
          isNeedDefault={false}
        />
      </Box>
      <ResponsiveContainer width="100%" height="70%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis tickLine={false} domain={[0, maxDomain]} fontSize={"10px"} />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#45F846" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            strokeWidth={2}
            dataKey="electricRange"
            stroke="#36CC55"
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <CustomMakes chartData={chartData} />
    </Box>
  );
};
export default DotLineChart;
