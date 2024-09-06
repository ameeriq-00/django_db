import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PersonList from "./pages/PersonList";
import PersonDetail from "./pages/PersonDetail";
import PersonForm from "./components/PersonForm";
import ArchiveList from "./pages/ArchiveList";
import ArchiveDetail from "./pages/ArchiveDetail";
import ArchiveForm from "./components/ArchiveForm";
import DispatchList from "./pages/DispatchList";
import DispatchDetail from "./pages/DispatchDetail";
import DispatchForm from "./components/DispatchForm";
import ReportGenerator from "./components/ReportGenerator";

import ApiService from "./services/api";
import AuthService from "./services/auth";

const theme = createTheme();

const PrivateRoute = ({ children }) => {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    ApiService.setup();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/persons"
            element={
              <PrivateRoute>
                <PersonList />
              </PrivateRoute>
            }
          />
          <Route
            path="/persons/new"
            element={
              <PrivateRoute>
                <PersonForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/persons/:id"
            element={
              <PrivateRoute>
                <PersonDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/persons/:id/edit"
            element={
              <PrivateRoute>
                <PersonForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/archives"
            element={
              <PrivateRoute>
                <ArchiveList />
              </PrivateRoute>
            }
          />
          <Route
            path="/archives/new"
            element={
              <PrivateRoute>
                <ArchiveForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/archives/:id"
            element={
              <PrivateRoute>
                <ArchiveDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/archives/:id/edit"
            element={
              <PrivateRoute>
                <ArchiveForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/dispatches"
            element={
              <PrivateRoute>
                <DispatchList />
              </PrivateRoute>
            }
          />
          <Route
            path="/dispatches/new"
            element={
              <PrivateRoute>
                <DispatchForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/dispatches/:id"
            element={
              <PrivateRoute>
                <DispatchDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/dispatches/:id/edit"
            element={
              <PrivateRoute>
                <DispatchForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/report"
            element={
              <PrivateRoute>
                <ReportGenerator />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
