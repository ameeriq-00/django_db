import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Your App Logo</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
