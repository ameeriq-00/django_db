import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import AuthService from "../services/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/" className={classes.link}>
              Data Management App
            </RouterLink>
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/persons">
                Persons
              </Button>
              <Button color="inherit" component={RouterLink} to="/archives">
                Archives
              </Button>
              <Button color="inherit" component={RouterLink} to="/dispatches">
                Dispatches
              </Button>
              <Button color="inherit" component={RouterLink} to="/report">
                Generate Report
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
