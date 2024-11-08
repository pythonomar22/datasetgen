import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  LinearProgress,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DatasetUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [datasetVersions] = useState([
    { id: 1, name: 'v1.0', date: '2024-01-10', samples: 1000 },
    { id: 2, name: 'v1.1', date: '2024-01-15', samples: 1200 }
  ]);
  const [datasetMetrics] = useState({
    totalSamples: 1200,
    classes: ['cat', 'dog', 'bird'],
    distribution: [
      { name: 'cat', count: 400 },
      { name: 'dog', count: 500 },
      { name: 'bird', count: 300 }
    ]
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // TODO: Implement actual upload logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
    setUploading(false);
    setFile(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Upload" />
        <Tab label="Versions" />
        <Tab label="Metrics" />
      </Tabs>

      {activeTab === 0 && (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Dataset Upload
      </Typography>
      <Box sx={{ my: 2 }}>
        <input
          accept=".csv,.json,.txt"
          style={{ display: 'none' }}
          id="dataset-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="dataset-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled={uploading}
          >
            Select Dataset
          </Button>
        </label>
        {file && (
          <Typography sx={{ mt: 2 }}>
            Selected: {file.name}
          </Typography>
        )}
      </Box>
      {uploading && <LinearProgress sx={{ my: 2 }} />}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        Upload Dataset
      </Button>
    </Paper>
      )}

      {activeTab === 1 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Dataset Versions</Typography>
          <List>
            {datasetVersions.map((version) => (
              <ListItem key={version.id}>
                <ListItemText 
                  primary={version.name}
                  secondary={`Created: ${version.date} | Samples: ${version.samples}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Dataset Statistics</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Total Samples: ${datasetMetrics.totalSamples}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Classes: ${datasetMetrics.classes.join(', ')}`} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Class Distribution</Typography>
              <BarChart width={500} height={300} data={datasetMetrics.distribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DatasetUpload;
