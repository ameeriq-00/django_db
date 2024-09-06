import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Button } from "@material-ui/core";
import PaginatedList from "../components/PaginatedList";
import ApiService from "../services/api";

const ArchiveList = () => {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    { id: "phone_number", label: "Phone Number" },
    { id: "name_info", label: "Name Info" },
    { id: "bookid", label: "Book ID" },
    { id: "app_book_date", label: "App Book Date" },
    { id: "received_from", label: "Received From" },
    { id: "accused_char", label: "Accused Char" },
    { id: "app_form", label: "App Form" },
    { id: "app_date", label: "App Date" },
    { id: "period_fromto", label: "Period From/To" },
    { id: "tech_name", label: "Tech Name" },
    { id: "app_kind", label: "App Kind" },
    { id: "actions", label: "Actions" },
  ];

  const fetchArchives = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.getArchives(params);
      setArchives(response.data);
    } catch (error) {
      console.error("Error fetching archives:", error);
      setError("Failed to fetch archives. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this archive?")) {
      try {
        await ApiService.deleteArchive(id);
        fetchArchives({});
      } catch (error) {
        console.error("Error deleting archive:", error);
        setError("Failed to delete archive. Please try again.");
      }
    }
  };

  const renderActions = (archive) => (
    <>
      <Button
        component={Link}
        to={`/archives/${archive.T}`}
        color="primary"
        size="small"
      >
        View
      </Button>
      <Button
        component={Link}
        to={`/archives/${archive.T}/edit`}
        color="default"
        size="small"
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDelete(archive.T)}
        color="secondary"
        size="small"
      >
        Delete
      </Button>
    </>
  );

  const enhancedData = archives.map((archive) => ({
    ...archive,
    actions: renderActions(archive),
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Archives
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        component={Link}
        to="/archives/new"
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
      >
        Add New Archive
      </Button>
      <PaginatedList
        data={enhancedData}
        columns={columns}
        fetchData={fetchArchives}
        loading={loading}
      />
    </Container>
  );
};

export default ArchiveList;
