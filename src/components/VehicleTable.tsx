import {
  Box,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Context } from "../utils/utils.tsx";
import {
  SelectInput,
  StyledTableCell,
  StyledTableRow,
} from "./CommonComponents.tsx";
import { VehicleData } from "./Dashboard.tsx";
import { styles } from "./styles.ts";

const VehicleTable = () => {
  const data: VehicleData[] | null = useContext(Context);
  const [tableData, setTableData] = useState<VehicleData[] | null>([]);
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
  const [tabValue, setTabValue] = useState<null | number>(null);
  const [searchCityName, setSearchCityName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    setTableData(data);
  }, [data]);
  useEffect(() => {
    if (searchCityName || selectedYear) {
      const filterData = data?.filter((vehicle) => {
        const newKey = vehicle[selectedKey as string];
        const city = newKey ? newKey.trim().toLowerCase() : "";
        const searchCity = searchCityName
          ? searchCityName.trim().toLowerCase()
          : "";
        if (selectedYear && searchCityName) {
          return (
            vehicle["Model Year"] === selectedYear && city.includes(searchCity)
          );
        }
        if (selectedYear) {
          return vehicle["Model Year"] === selectedYear;
        }
        if (searchCityName) {
          return city.includes(searchCity);
        }
      });
      setTableData(filterData ?? []);
    } else {
      setTableData(data);
    }
  }, [searchCityName, selectedYear]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleSelectYear = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };
  const handleSearchCity = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCityName(event.target.value);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSelectedKey = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    const target = event.target as HTMLElement;
    const selectedLabel = target.textContent as string;
    setTabValue(newValue);
    setSelectedKey(selectedLabel);
  };
  console.log(Math.max(...Object.keys(data![0]).map((value) => value.length)));
  return (
    <Box sx={styles.tableMainBox}>
      <Box sx={styles.textFieldsBox}>
        <Box sx={styles.textFieldMainBox(!!selectedKey)}>
          <TextField
            fullWidth
            value={searchCityName}
            onChange={handleSearchCity}
            placeholder={`Search by ${selectedKey}`}
            sx={styles.textField}
          />
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleChangeSelectedKey}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={styles.tabs}
        >
          {Object.keys(data![0]).map((column) => (
            <Tab label={column} />
          ))}
        </Tabs>
        <Box sx={{ width: { xs: "230px", md: "150px", lg: "250px" } }}>
          <SelectInput
            selectedYear={selectedYear}
            handleSelectYear={handleSelectYear}
            isNeedDefault={true}
          />
        </Box>
      </Box>
      <Paper sx={styles.tablePaper}>
        <TableContainer sx={styles.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {Object.keys(data![0]).map((heading) => (
                  <StyledTableCell>
                    <Typography sx={styles.headingText}>
                      {heading.length > 40 ? "CAFV" : heading}
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} role="checkbox">
                    <Typography sx={styles.datNotFound}>
                      Data not found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {tableData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: VehicleData, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      {Object.values(row).map((value) => (
                        <StyledTableCell role="checkbox" tabIndex={-1}>
                          {value}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default VehicleTable;
