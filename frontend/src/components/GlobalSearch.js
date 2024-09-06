import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ApiService from "../services/api";

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = async () => {
    try {
      const response = await ApiService.globalSearch(searchTerm);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error performing global search:", error);
    }
  };

  const renderResultTable = (data, columns) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Global Search
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {Object.keys(searchResults).length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          {Object.entries(searchResults).map(([table, data]) => (
            <Accordion key={table}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {table} ({data.length} results)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderResultTable(data, Object.keys(data[0] || {}))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </Container>
  );
};

export default GlobalSearch;
