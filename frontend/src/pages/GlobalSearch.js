import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/global-search/?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Global Search
      </Typography>
      <TextField
        fullWidth
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>
      <Box mt={3}>
        {results.length > 0 ? (
          <Paper elevation={3}>
            {results.map((result, index) => (
              <Box key={index} p={2} borderBottom="1px solid #ccc">
                <Typography variant="h6">{result.title}</Typography>
                <Typography>{result.description}</Typography>
              </Box>
            ))}
          </Paper>
        ) : (
          <Typography>No results found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default GlobalSearch;
