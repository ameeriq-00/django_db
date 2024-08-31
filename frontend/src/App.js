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
import Layout from "./layout/Layout";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth(); // Using AuthContext

  return (
    <Router>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/person-details" element={<PersonDetails />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/global-search" element={<GlobalSearch />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
