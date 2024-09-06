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

const DispatchForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dispatch, setDispatch] = useState({
    name_accused: "",
    saved_numbers: "",
    saved_name: "",
    saved_info: "",
    city: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchDispatch();
    }
  }, [id]);

  const fetchDispatch = async () => {
    try {
      const response = await ApiService.getDispatch(id);
      setDispatch(response.data);
    } catch (error) {
      console.error("Error fetching dispatch:", error);
      setError("Failed to fetch dispatch details.");
    }
  };

  const handleChange = (e) => {
    setDispatch({ ...dispatch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (id) {
        await ApiService.updateDispatch(id, dispatch);
      } else {
        await ApiService.createDispatch(dispatch);
      }
      navigate("/dispatches");
    } catch (error) {
      console.error("Error saving dispatch:", error);
      setError(
        "Failed to save dispatch. Please check all fields and try again."
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Dispatch" : "Create Dispatch"}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name_accused"
              label="Name Accused"
              value={dispatch.name_accused}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="saved_numbers"
              label="Saved Numbers"
              value={dispatch.saved_numbers}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="saved_name"
              label="Saved Name"
              value={dispatch.saved_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={dispatch.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="saved_info"
              label="Saved Info"
              value={dispatch.saved_info}
              onChange={handleChange}
              multiline
              rows={4}
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

export default DispatchForm;
