import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const Dispatch = () => {
  const [dispatchData, setDispatchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/dispatches/");
        setDispatchData(response.data);
      } catch (error) {
        console.error("Error fetching dispatch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dispatch Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name Accused</TableCell>
              <TableCell>Saved Numbers</TableCell>
              <TableCell>Saved Name</TableCell>
              <TableCell>Saved Info</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispatchData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.name_accused}</TableCell>
                <TableCell>{record.saved_numbers}</TableCell>
                <TableCell>{record.saved_name}</TableCell>
                <TableCell>{record.saved_info}</TableCell>
                <TableCell>{record.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dispatch;
