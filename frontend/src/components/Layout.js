import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <MenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="/person-details">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Person Details" />
            </ListItem>
            <ListItem button component="a" href="/archive">
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItem>
            <ListItem button component="a" href="/dispatch">
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Dispatch" />
            </ListItem>
            <ListItem button component="a" href="/global-search">
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Global Search" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
