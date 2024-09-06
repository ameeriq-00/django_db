import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Input,
  CircularProgress,
} from "@material-ui/core";
import ApiService from "../services/api";

const PersonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({ Name: "", PhoneNumber: "" });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [sheetFiles, setSheetFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      ApiService.getPerson(id)
        .then((response) => {
          if (mounted.current) {
            setPerson(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching person:", error);
          if (mounted.current) {
            setError("Failed to fetch person data");
            setLoading(false);
          }
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSheetChange = (e) => {
    setSheetFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mounted.current) {
      setError("");
      setLoading(true);
    }
    try {
      let response;
      if (id) {
        response = await ApiService.updatePerson(id, person);
      } else {
        response = await ApiService.createPerson(person);
      }

      const personId = response.data.id;

      // Upload media files
      for (const file of mediaFiles) {
        try {
          await ApiService.addMedia(personId, file);
        } catch (mediaError) {
          console.error("Error uploading media:", mediaError);
          if (mounted.current) {
            setError((prev) => prev + `Failed to upload ${file.name}. `);
          }
        }
      }

      // Upload sheet files
      for (const file of sheetFiles) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          await ApiService.importSheet(personId, formData);
        } catch (sheetError) {
          console.error("Error importing sheet:", sheetError);
          if (mounted.current) {
            setError((prev) => prev + `Failed to import ${file.name}. `);
          }
        }
      }

      if (mounted.current) {
        setLoading(false);
      }
      navigate(`/persons/${personId}`);
    } catch (error) {
      console.error("Error saving person:", error);
      if (mounted.current) {
        setError("Failed to save person. Please try again.");
        setLoading(false);
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Person" : "Create Person"}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="Name"
          label="Name"
          value={person.Name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="PhoneNumber"
          label="Phone Number"
          value={person.PhoneNumber}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          inputProps={{ multiple: true }}
          onChange={handleMediaChange}
        />
        <Typography variant="caption" display="block" gutterBottom>
          Select media files
        </Typography>
        <Input
          type="file"
          inputProps={{ multiple: true, accept: ".xlsx,.xls" }}
          onChange={handleSheetChange}
        />
        <Typography variant="caption" display="block" gutterBottom>
          Select Excel sheets
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          {id ? "Update" : "Create"} Person
        </Button>
      </form>
    </Container>
  );
};

export default PersonForm;
