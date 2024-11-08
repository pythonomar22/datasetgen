import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  List, 
  ListItem, 
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExperimentDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modelVersions] = useState([
    { id: 1, name: 'model-v1', date: '2024-01-10', accuracy: 0.85 },
    { id: 2, name: 'model-v2', date: '2024-01-15', accuracy: 0.88 }
  ]);

  const [modelComparison] = useState([
    { metric: 'Accuracy', 'model-v1': 0.85, 'model-v2': 0.88 },
    { metric: 'Precision', 'model-v1': 0.83, 'model-v2': 0.87 },
    { metric: 'Recall', 'model-v1': 0.86, 'model-v2': 0.89 }
  ]);
  // Sample data - this would come from your backend
  const trainingData = [
    { epoch: 1, loss: 0.5, accuracy: 0.7, val_loss: 0.55, val_accuracy: 0.68 },
    { epoch: 2, loss: 0.4, accuracy: 0.8, val_loss: 0.45, val_accuracy: 0.75 },
    { epoch: 3, loss: 0.3, accuracy: 0.85, val_loss: 0.35, val_accuracy: 0.82 },
    { epoch: 4, loss: 0.25, accuracy: 0.88, val_loss: 0.3, val_accuracy: 0.85 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Model Management
      </Typography>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Training Monitor" />
        <Tab label="Model Versions" />
        <Tab label="Model Comparison" />
      </Tabs>

      {activeTab === 0 && (
      
      <Grid container spacing={3}>
        {/* Loss Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Loss
            </Typography>
            <LineChart width={500} height={300} data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#8884d8" name="Training Loss" />
              <Line type="monotone" dataKey="val_loss" stroke="#82ca9d" name="Validation Loss" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Accuracy Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Accuracy
            </Typography>
            <LineChart width={500} height={300} data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#8884d8" name="Training Accuracy" />
              <Line type="monotone" dataKey="val_accuracy" stroke="#82ca9d" name="Validation Accuracy" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
      )}

      {activeTab === 1 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Model Versions</Typography>
          <List>
            {modelVersions.map((version) => (
              <ListItem key={version.id}>
                <ListItemText 
                  primary={version.name}
                  secondary={`Created: ${version.date} | Accuracy: ${version.accuracy}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {activeTab === 2 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Model Comparison</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Model v1</TableCell>
                  <TableCell>Model v2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modelComparison.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell>{row.metric}</TableCell>
                    <TableCell>{row['model-v1']}</TableCell>
                    <TableCell>{row['model-v2']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default ExperimentDashboard;
