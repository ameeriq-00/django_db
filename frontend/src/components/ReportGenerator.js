import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ApiService from "../services/api";

const ReportGenerator = () => {
  const [report, setReport] = useState(null);

  const generateReport = async () => {
    try {
      // You'll need to create this API endpoint
      const response = await ApiService.generateReport();
      setReport(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Report Generator
      </Typography>
      <Button variant="contained" color="primary" onClick={generateReport}>
        Generate Report
      </Button>

      {report && (
        <Paper style={{ marginTop: "2rem", padding: "1rem" }}>
          <Typography variant="h5" gutterBottom>
            Generated Report
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Persons</TableCell>
                  <TableCell>{report.totalPersons}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Call Logs</TableCell>
                  <TableCell>{report.totalCallLogs}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Call Duration</TableCell>
                  <TableCell>{report.averageCallDuration} seconds</TableCell>
                </TableRow>
                {/* Add more rows as needed based on your report data */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default ReportGenerator;
