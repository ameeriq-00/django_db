import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box sx={{ width: 250, bgcolor: "background.paper" }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/persons">
          <ListItemText primary="Persons" />
        </ListItem>
        <ListItem button component={Link} to="/person-details">
          <ListItemText primary="Person Details" />
        </ListItem>
        <ListItem button component={Link} to="/archive">
          <ListItemText primary="Archive" />
        </ListItem>
        <ListItem button component={Link} to="/dispatch">
          <ListItemText primary="Dispatch" />
        </ListItem>
        <ListItem button component={Link} to="/global-search">
          <ListItemText primary="Global Search" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
