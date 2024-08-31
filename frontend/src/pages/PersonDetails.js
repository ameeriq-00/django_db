import React from "react";
import { Box, Grid, Paper, Typography, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";

const PersonDetails = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Person Details
      </Typography>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6">Person ID: {id}</Typography>
        <Typography variant="h6">Name: John Doe</Typography>
        <Typography variant="h6">Phone Number: 123-456-7890</Typography>
      </Paper>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Person Data Tabs"
      >
        <Tab label="ATemp" />
        <Tab label="ZTemp" />
        <Tab label="KTemp" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h6">ATemp Records</Typography>
          {/* Map over ATemp data and display */}
        </Paper>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h6">ZTemp Records</Typography>
          {/* Map over ZTemp data and display */}
        </Paper>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h6">KTemp Records</Typography>
          {/* Map over KTemp data and display */}
        </Paper>
      </TabPanel>
    </Box>
  );
};

// TabPanel component to handle tab content rendering
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default PersonDetails;
