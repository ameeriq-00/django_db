import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar"; // Assume you have a Navbar component
import Sidebar from "./Sidebar"; // Assume you have a Sidebar component

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
