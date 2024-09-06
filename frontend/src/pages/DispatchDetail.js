import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Container, Paper, Button, Grid } from "@material-ui/core";
import ApiService from "../services/api";

const DispatchDetail = () => {
  const { id } = useParams();
  const [dispatch, setDispatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDispatch = async () => {
      try {
        const response = await ApiService.getDispatch(id);
        setDispatch(response.data);
      } catch (err) {
        setError("Failed to fetch dispatch details");
        console.error("Error fetching dispatch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDispatch();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!dispatch) return <Typography>No dispatch found</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dispatch Details
      </Typography>
      <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Name Accused: {dispatch.name_accused}
            </Typography>
            <Typography variant="subtitle1">
              Saved Numbers: {dispatch.saved_numbers}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Saved Name: {dispatch.saved_name}
            </Typography>
            <Typography variant="subtitle1">City: {dispatch.city}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Saved Info: {dispatch.saved_info}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button
        component={Link}
        to={`/dispatches/${id}/edit`}
        variant="contained"
        color="primary"
        style={{ marginRight: "1rem" }}
      >
        Edit
      </Button>
      <Button
        component={Link}
        to="/dispatches"
        variant="contained"
        color="default"
      >
        Back to List
      </Button>
    </Container>
  );
};

export default DispatchDetail;
