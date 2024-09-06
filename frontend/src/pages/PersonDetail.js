import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  CircularProgress,
  Paper,
  Grid,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from "@material-ui/core";
import ApiService from "../services/api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [media, setMedia] = useState([]);
  const [aTemp, setATemp] = useState([]);
  const [zTemp, setZTemp] = useState([]);
  const [kTemp, setKTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const personData = await ApiService.getPerson(id);
        setPerson(personData.data);

        const mediaData = await ApiService.getPersonMedia(id);
        setMedia(Array.isArray(mediaData.data) ? mediaData.data : []);

        const aTempData = await ApiService.getATemp({ PersonID: id });
        setATemp(Array.isArray(aTempData.data) ? aTempData.data : []);

        const zTempData = await ApiService.getZTemp({ PersonID: id });
        setZTemp(Array.isArray(zTempData.data) ? zTempData.data : []);

        const kTempData = await ApiService.getKTemp({ PersonID: id });
        setKTemp(Array.isArray(kTempData.data) ? kTempData.data : []);
      } catch (error) {
        console.error("Error fetching person data:", error);
        setError("Failed to fetch person data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTable = (data, columns) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!person) return <Typography>No person found</Typography>;

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {person.Name}
        </Typography>
        <Typography variant="body1">Phone: {person.PhoneNumber}</Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Data Tabs"
            >
              <Tab label="ATemp Data" />
              <Tab label="ZTemp Data" />
              <Tab label="KTemp Data" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              {renderTable(aTemp, [
                "CALLER_NUMBER",
                "CALLED_NUMBER",
                "CALL_INITIAL_TIME",
                "CONVERSATION_DURATION",
                "CITY",
              ])}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {renderTable(zTemp, [
                "Date",
                "CALL_TYPE",
                "Duration",
                "Calling_Number",
                "Called_Number",
              ])}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              {renderTable(kTemp, [
                "DATETIME",
                "CALL_TYPE",
                "MSISDN",
                "B_PARTY_MSISDN",
                "DURATION",
              ])}
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Media Files
            </Typography>
            {media.length > 0 ? (
              media.map((file) => (
                <Link
                  key={file.id}
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", marginBottom: "10px" }}
                >
                  {file.file_type && file.file_type.startsWith("image/") ? (
                    <img
                      src={file.file_url}
                      alt={
                        file.file ? file.file.split("/").pop() : "Media file"
                      }
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  ) : file.file ? (
                    file.file.split("/").pop()
                  ) : (
                    "Media file"
                  )}
                </Link>
              ))
            ) : (
              <Typography>No media files found</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonDetail;
