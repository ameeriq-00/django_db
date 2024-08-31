import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">Total Persons</Typography>
            <Typography variant="h4">123</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">Recent Archives</Typography>
            <Typography variant="h4">456</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">Recent Dispatches</Typography>
            <Typography variant="h4">789</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
