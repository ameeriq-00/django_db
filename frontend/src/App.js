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
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/person-details"
            element={
              isAuthenticated ? <PersonDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/archive"
            element={isAuthenticated ? <Archive /> : <Navigate to="/login" />}
          />
          <Route
            path="/dispatch"
            element={isAuthenticated ? <Dispatch /> : <Navigate to="/login" />}
          />
          <Route
            path="/global-search"
            element={
              isAuthenticated ? <GlobalSearch /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
