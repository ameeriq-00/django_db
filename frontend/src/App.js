import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import PersonDetails from "./pages/PersonDetails";
import Archive from "./pages/Archive";
import Dispatch from "./pages/Dispatch";
import GlobalSearch from "./pages/GlobalSearch";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/person-details"
          element={
            isAuthenticated ? (
              <Layout>
                <PersonDetails />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/archive"
          element={
            isAuthenticated ? (
              <Layout>
                <Archive />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dispatch"
          element={
            isAuthenticated ? (
              <Layout>
                <Dispatch />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/global-search"
          element={
            isAuthenticated ? (
              <Layout>
                <GlobalSearch />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
