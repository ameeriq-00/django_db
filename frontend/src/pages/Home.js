import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import GlobalSearch from "../components/GlobalSearch";

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Data Management Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to="/persons"
            variant="contained"
            color="primary"
            fullWidth
          >
            Manage Persons
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to="/archives"
            variant="contained"
            color="secondary"
            fullWidth
          >
            View Archives
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to="/dispatches"
            variant="contained"
            color="default"
            fullWidth
          >
            View Dispatches
          </Button>
        </Grid>
        <Grid item xs={12}>
          <GlobalSearch />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
