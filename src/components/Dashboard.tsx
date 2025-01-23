import {
  Box,
  Container,
  CssBaseline,
  Grid2,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { loaderImage } from "../assets/assets.ts";
import file from "../data-to-visualize/Electric_Vehicle_Population_Data.csv";
import { Context, theme, VehicleData } from "../utils/utils.tsx";
import BarLineChart from "./BarLineChart.tsx";
import CustomShapeBar from "./CustomShapeBar.tsx";
import DotLineChart from "./DotLineChart.tsx";
import RadioBarChart from "./RadioBarChart.tsx";
import { styles } from "./styles.ts";
import VehicleTable from "./VehicleTable.tsx";

interface IState {
  scrollY: number;
}
function CsvComponent() {
  const [scrollY, setScrollY] = useState<IState["scrollY"]>(0);
  const [jsonData, setJsonData] = useState<VehicleData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(file)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
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
    setJsonData(jsonData as VehicleData[]);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Context.Provider value={jsonData || [{}]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoading ? (
          <Box sx={styles.loadingImageBox}>
            <Box
              sx={styles.loadingImage}
              component={"img"}
              src={loaderImage}
              loading="lazy"
            />
          </Box>
        ) : (
          <>
            <Box sx={styles.header(90 < scrollY)}>
              <Container sx={styles.container}>
                <Typography sx={styles.mainLogo}>Logo</Typography>
                <Box>
                  <Typography sx={styles.name}>Dashboard</Typography>
                </Box>
              </Container>
            </Box>
            <Box sx={styles.mainBox}>
              <Container>
                <Typography sx={styles.title}>Top Electric Vehicles</Typography>
                <Grid2 container spacing={3}>
                  <Grid2 size={styles.grid2}>
                    <RadioBarChart />
                  </Grid2>
                  <Grid2 size={styles.grid2}>
                    <CustomShapeBar />
                  </Grid2>
                  <Grid2 size={styles.grid2}>
                    <BarLineChart />
                  </Grid2>
                  <Grid2 size={styles.grid2}>
                    <DotLineChart />
                  </Grid2>
                </Grid2>
                <Typography sx={styles.title}>
                  Electric vehicles table
                </Typography>
                <VehicleTable />
              </Container>
            </Box>
          </>
        )}
      </ThemeProvider>
    </Context.Provider>
  );
}

export default CsvComponent;
