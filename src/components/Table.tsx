import { Box, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SelectInput } from "./Dashboard.tsx";

const VehicleTable = React.memo(({ data }: any) => {
  const [tableData, setTableData] = useState([{}]);
  const [searchCityName, setSearchCityName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    if (searchCityName || selectedYear) {
      const filterData = data.filter((vehicle) => {
        const city = vehicle.City ? vehicle.City.trim().toLowerCase() : "";
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
      setTableData(filterData);
    } else {
      setTableData(data);
    }
  }, [searchCityName, selectedYear]);

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
  return (
    <Box>
      <Box>
        <TextField
          value={searchCityName}
          onChange={handleSearchCity}
          placeholder="Search vehicle by city..."
        />
        <SelectInput
          selectedYear={selectedYear}
          handleSelectYear={handleSelectYear}
        />
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((column) => (
                  <TableCell>
                    <Typography sx={{ width: "200px" }}>{column}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} role="checkbox">
                    <Typography sx={{ textAlign: "center", width: "100%" }}>
                      Data not found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={index}>
                      {Object.values(row).map((value: any) => (
                        <TableCell role="checkbox" tabIndex={-1}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
});

export default VehicleTable;
