import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Context,
  higestChartData,
  IChart,
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
const BarLineChart = () => {
  const vehiclesData: VehicleData[] | null = useContext(Context);
  const [chartData, setChartData] = useState<IChart[]>([]);
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
        itemName: "County",
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
        Top Electric Vehicle Counties by Range
      </Typography>
      <Box sx={styles.tooltip}>
        <NewTooltip title="Filter the Top Electric Vehicle Counties by Model Year">
          <InfoOutlined />
        </NewTooltip>
        <SelectInput
          selectedYear={selectedYear}
          handleSelectYear={handleSelectYear}
          isNeedDefault={false}
        />
      </Box>
      <ResponsiveContainer width="100%" height="80%">
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="" tick={false} />
          <YAxis tickLine={false} domain={[0, maxDomain]} fontSize={"10px"} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="electricRange" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="electricRange" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
      <CustomMakes chartData={chartData} />
    </Box>
  );
};
export default BarLineChart;
