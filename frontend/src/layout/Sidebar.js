import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
