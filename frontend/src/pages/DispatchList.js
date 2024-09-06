import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Button } from "@material-ui/core";
import PaginatedList from "../components/PaginatedList";
import ApiService from "../services/api";

const DispatchList = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    { id: "name_accused", label: "Name Accused" },
    { id: "saved_numbers", label: "Saved Numbers" },
    { id: "saved_name", label: "Saved Name" },
    { id: "saved_info", label: "Saved Info" },
    { id: "city", label: "City" },
    { id: "actions", label: "Actions" },
  ];

  const fetchDispatches = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getDispatches(params);
      setDispatches(response.data);
    } catch (error) {
      console.error("Error fetching dispatches:", error);
      setError("Failed to fetch dispatches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dispatch?")) {
      try {
        await ApiService.deleteDispatch(id);
        fetchDispatches({});
      } catch (error) {
        console.error("Error deleting dispatch:", error);
        setError("Failed to delete dispatch. Please try again.");
      }
    }
  };

  const renderActions = (dispatch) => (
    <>
      <Button
        component={Link}
        to={`/dispatches/${dispatch.T}`}
        color="primary"
        size="small"
      >
        View
      </Button>
      <Button
        component={Link}
        to={`/dispatches/${dispatch.T}/edit`}
        color="default"
        size="small"
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDelete(dispatch.T)}
        color="secondary"
        size="small"
      >
        Delete
      </Button>
    </>
  );

  const enhancedData = dispatches.map((dispatch) => ({
    ...dispatch,
    actions: renderActions(dispatch),
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dispatches
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        component={Link}
        to="/dispatches/new"
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
      >
        Add New Dispatch
      </Button>
      <PaginatedList
        data={enhancedData}
        columns={columns}
        fetchData={fetchDispatches}
        loading={loading}
      />
    </Container>
  );
};

export default DispatchList;
