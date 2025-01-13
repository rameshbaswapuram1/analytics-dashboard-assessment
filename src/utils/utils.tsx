import { createTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { createContext } from "react";

export const NewTooltip = Tooltip;
export interface IChart {
  name: string;
  fill: string;
  electricRange: number;
}
export interface VehicleData {
  VIN_1_10: string;
  County: string;
  City: string;
  State: string;
  PostalCode: string;
  ModelYear: number;
  Make: string;
  Model: string;
  ElectricVehicleType: string;
  CAFVEligibility: string;
  ElectricRange: string;
  BaseMSRP: number;
  LegislativeDistrict: string;
  DOLVehicleID: string;
  VehicleLocation: string;
  ElectricUtility: string;
  CensusTract2020: string;
}
export const generateRandomColor = () => {
  const randomValue = () => Math.floor(Math.random() * 128);
  const r = randomValue();
  const g = randomValue();
  const b = randomValue();
  return `rgb(${r}, ${g}, ${b})`;
};
export const higestChartData = ({
  vehiclesData,
  selectedYear,
  itemName,
}: {
  vehiclesData: VehicleData[];
  selectedYear: number;
  itemName: string;
}) => {
  const filterData =
    vehiclesData?.filter((vehicle) => {
      const modelYear = vehicle["Model Year"] ?? "";
      return +modelYear === selectedYear;
    }) || [];
  const chartData =
    filterData.map((vehicle: VehicleData) => ({
      name: vehicle[itemName],
      electricRange: vehicle["Electric Range"] || 0,
      fill: generateRandomColor(),
    })) || [];
  const higherData: VehicleData[] | unknown[] = Object.values(
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
  )
    .filter((vehicle: { electricRange: string }) => {
      const electricRangeValue = parseFloat(vehicle.electricRange.toString());
      return !isNaN(electricRangeValue) && electricRangeValue > 0;
    })
    .slice(0, 10);
  return higherData;
};
export const Context = createContext<VehicleData[] | null>(null);
export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "serif"].join(),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#E7E5E4",
          borderColor: "#E7E5E4",
          borderRadius: "30px",
          height: "40px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E7E5E4",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E7E5E4",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E7E5E4",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
        },
      },
    },
  },
});
