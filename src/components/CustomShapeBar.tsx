import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Box, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Context,
  generateRandomColor,
  higestChartData,
  VehicleData,
} from "../utils/utils.tsx";
import { CustomMakes, SelectInput } from "./CommonComponents.tsx";
import { styles } from "./styles.ts";

interface IState {
  selectedYear: number;
  maxDomain: number;
}
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

const TriangleBar = (props: {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomShapeBar = () => {
  const vehiclesData: VehicleData[] | null = useContext(Context);
  const [chartData, setChartData] = useState<VehicleData[] | []>([]);
  useState<IState["selectedYear"]>(2024);
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
        itemName: "Model",
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
        Top Electric Vehicle Models by Range
      </Typography>
      <Box sx={styles.tooltip}>
        <Tooltip title="Filter the Top Electric Vehicle Model by Model Year">
          <InfoOutlined />
        </Tooltip>
        <SelectInput
          selectedYear={selectedYear}
          handleSelectYear={handleSelectYear}
          isNeedDefault={false}
        />
      </Box>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis tickLine={false} domain={[0, maxDomain]} fontSize={"10px"} />
          <Bar
            dataKey="electricRange"
            fill="#8884d8"
            maxBarSize={50}
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={generateRandomColor()} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <CustomMakes chartData={chartData} />
    </Box>
  );
};

export default CustomShapeBar;
