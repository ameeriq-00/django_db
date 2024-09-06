import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import ApiService from "../services/api";

const PersonList = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await ApiService.getPersons();
      setPersons(response.data);
    } catch (error) {
      console.error("Error fetching persons:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await ApiService.deletePerson(id);
        fetchPersons();
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Persons
      </Typography>
      <Button
        component={Link}
        to="/persons/new"
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
      >
        Add New Person
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.Name}</TableCell>
                <TableCell>{person.PhoneNumber}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/persons/${person.id}`}
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    component={Link}
                    to={`/persons/${person.id}/edit`}
                    color="default"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(person.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PersonList;
