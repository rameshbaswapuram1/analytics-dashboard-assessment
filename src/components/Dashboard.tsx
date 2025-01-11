import { MenuItem, Select } from "@mui/material";
import Papa from "papaparse";
import React, { createContext, useContext, useEffect, useState } from "react";
import file from "../data-to-visualize/Electric_Vehicle_Population_Data.csv";
import Table from "./Table.tsx";
import VehicleCharts from "./VehicleCharts.tsx";
export const Context = createContext({});
function CsvComponent() {
  const [jsonData, setJsonData] = useState<string[] | null>(null);
  const [finalData, setFinalData] = useState<any>(null);

  useEffect(() => {
    fetch(file)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            setJsonData(result.data);
            converter(result.data);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);
  const converter = (rows: string[][]) => {
    const headers = rows[0];
    const jsonData = rows.slice(1).map((row) => {
      const values = row;
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim();
      });
      return obj;
    });
    setFinalData(jsonData);
  };

  return (
    <Context.Provider value={finalData}>
      <VehicleCharts data={finalData || [{}]} />
      <Table data={finalData || [{}]} />
    </Context.Provider>
  );
}

export default CsvComponent;

export const SelectInput = ({ selectedYear, handleSelectYear }) => {
  const vehiclesData: any = useContext(Context);
  const [modelYears, setModelYears] = useState<unknown[]>([]);

  useEffect(() => {
    const modelYears = [
      ...new Set(vehiclesData?.map((vehicle) => vehicle["Model Year"])),
    ]
      .filter((year) => year)
      .sort((first: any, second: any) => second - first);
    setModelYears(modelYears);
  }, [vehiclesData]);

  return (
    <Select
      value={selectedYear}
      onChange={handleSelectYear}
      sx={{ width: "150px" }}
      displayEmpty
    >
      <MenuItem value="">
        <em>Select model year</em>
      </MenuItem>
      {modelYears?.map((modelYear: any) => (
        <MenuItem value={modelYear}>{modelYear}</MenuItem>
      ))}
    </Select>
  );
};

export const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};
