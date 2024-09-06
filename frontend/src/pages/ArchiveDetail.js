import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Container, Paper, Button, Grid } from "@material-ui/core";
import ApiService from "../services/api";

const ArchiveDetail = () => {
  const { id } = useParams();
  const [archive, setArchive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const response = await ApiService.getArchive(id);
        setArchive(response.data);
      } catch (err) {
        setError("Failed to fetch archive details");
        console.error("Error fetching archive:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!archive) return <Typography>No archive found</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Archive Details
      </Typography>
      <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Phone Number: {archive.phone_number}
            </Typography>
            <Typography variant="subtitle1">
              Name Info: {archive.name_info}
            </Typography>
            <Typography variant="subtitle1">
              Book ID: {archive.bookid}
            </Typography>
            <Typography variant="subtitle1">
              App Book Date: {new Date(archive.app_book_date).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Received From: {archive.received_from}
            </Typography>
            <Typography variant="subtitle1">
              Accused Char: {archive.accused_char}
            </Typography>
            <Typography variant="subtitle1">
              App Form: {archive.app_form}
            </Typography>
            <Typography variant="subtitle1">
              App Date: {new Date(archive.app_date).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Period From/To: {archive.period_fromto}
            </Typography>
            <Typography variant="subtitle1">
              Tech Name: {archive.tech_name}
            </Typography>
            <Typography variant="subtitle1">
              App Kind: {archive.app_kind}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button
        component={Link}
        to={`/archives/${id}/edit`}
        variant="contained"
        color="primary"
        style={{ marginRight: "1rem" }}
      >
        Edit
      </Button>
      <Button
        component={Link}
        to="/archives"
        variant="contained"
        color="default"
      >
        Back to List
      </Button>
    </Container>
  );
};

export default ArchiveDetail;
