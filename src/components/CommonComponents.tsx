import {
  Box,
  MenuItem,
  Select,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React, { useContext, useEffect, useState } from "react";
 import { styles } from "./styles.ts";
import { Context, VehicleData } from "../utils/utils.tsx";

export const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={styles.tooltipMainBox}>
        <Typography sx={styles.tooltipMakeName}>
          {payload[0].payload.name}
        </Typography>
        <Typography sx={styles.tooltipValue(payload[0].payload.fill)}>
          Electric Range {payload[0].value}
        </Typography>
      </Box>
    );
  }
  return null;
};

export const CustomMakes = ({ chartData }) => (
  <Box sx={styles.makeNameMainBox}>
    {chartData?.map((make) => (
      <Box sx={styles.makeNameBox}>
        <Box sx={styles.makeNameDot(make.fill)} />
        <Typography sx={styles.makeName}>{make.name}</Typography>
      </Box>
    ))}
  </Box>
);

export const SelectInput = ({
  selectedYear,
  handleSelectYear,
  isNeedDefault,
}) => {
  const vehiclesData: VehicleData[] | null = useContext(Context);
  const [modelYears, setModelYears] = useState<number[]>([]);

  useEffect(() => {
    const modelYears = [
      ...new Set(vehiclesData?.map((vehicle) => vehicle["Model Year"])),
    ]
      .filter((year) => year)
      .sort((first, second) => second - first);
    setModelYears(modelYears);
  }, [vehiclesData]);

  return (
    <Select
      fullWidth
      value={selectedYear}
      onChange={handleSelectYear}
      displayEmpty
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
          },
        },
      }}
    >
      {isNeedDefault && (
        <MenuItem value="">
          <em>Select model year</em>
        </MenuItem>
      )}
      {modelYears?.map((modelYear) => (
        <MenuItem value={modelYear}>{modelYear}</MenuItem>
      ))}
    </Select>
  );
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a232e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f4f6f8",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
