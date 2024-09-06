import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import ApiService from "../services/api";

const ArchiveForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [archive, setArchive] = useState({
    phone_number: "",
    name_info: "",
    bookid: "",
    app_book_date: "",
    received_from: "",
    accused_char: "",
    app_form: "",
    app_date: "",
    period_fromto: "",
    tech_name: "",
    app_kind: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchArchive();
    }
  }, [id]);

  const fetchArchive = async () => {
    try {
      const response = await ApiService.getArchive(id);
      setArchive(response.data);
    } catch (error) {
      console.error("Error fetching archive:", error);
      setError("Failed to fetch archive details.");
    }
  };

  const handleChange = (e) => {
    setArchive({ ...archive, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (id) {
        await ApiService.updateArchive(id, archive);
      } else {
        await ApiService.createArchive(archive);
      }
      navigate("/archives");
    } catch (error) {
      console.error("Error saving archive:", error);
      setError(
        "Failed to save archive. Please check all fields and try again."
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Archive" : "Create Archive"}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone_number"
              label="Phone Number"
              value={archive.phone_number}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name_info"
              label="Name Info"
              value={archive.name_info}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="bookid"
              label="Book ID"
              value={archive.bookid}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="app_book_date"
              label="App Book Date"
              type="datetime-local"
              value={archive.app_book_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="received_from"
              label="Received From"
              value={archive.received_from}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="accused_char"
              label="Accused Char"
              value={archive.accused_char}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="app_form"
              label="App Form"
              value={archive.app_form}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="app_date"
              label="App Date"
              type="datetime-local"
              value={archive.app_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="period_fromto"
              label="Period From/To"
              value={archive.period_fromto}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="tech_name"
              label="Tech Name"
              value={archive.tech_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="app_kind"
              label="App Kind"
              value={archive.app_kind}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default ArchiveForm;
