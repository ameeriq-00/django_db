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

const Archive = () => {
  const [archiveData, setArchiveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/archives/");
        setArchiveData(response.data);
      } catch (error) {
        console.error("Error fetching archive data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Archive Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Phone Number</TableCell>
              <TableCell>Name Info</TableCell>
              <TableCell>Book ID</TableCell>
              <TableCell>App Book Date</TableCell>
              <TableCell>Received From</TableCell>
              <TableCell>Accused Character</TableCell>
              <TableCell>App Form</TableCell>
              <TableCell>App Date</TableCell>
              <TableCell>Period From-To</TableCell>
              <TableCell>Tech Name</TableCell>
              <TableCell>App Kind</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archiveData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.phone_number}</TableCell>
                <TableCell>{record.name_info}</TableCell>
                <TableCell>{record.bookid}</TableCell>
                <TableCell>{record.app_book_date}</TableCell>
                <TableCell>{record.received_from}</TableCell>
                <TableCell>{record.accused_char}</TableCell>
                <TableCell>{record.app_form}</TableCell>
                <TableCell>{record.app_date}</TableCell>
                <TableCell>{record.period_fromto}</TableCell>
                <TableCell>{record.tech_name}</TableCell>
                <TableCell>{record.app_kind}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Archive;
