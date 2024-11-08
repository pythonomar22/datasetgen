import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const DatasetAugmentation = () => {
  const [selectedTechnique, setSelectedTechnique] = useState('');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [augmentationStrength, setAugmentationStrength] = useState(0.5);
  const [datasets] = useState(() => {
    return JSON.parse(localStorage.getItem('datasets') || '[]');
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [augmentationHistory, setAugmentationHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('augmentationHistory') || '[]');
  });

  const techniques = {
    image: ['Rotation', 'Flip', 'Color Jitter', 'Noise Addition'],
    text: ['Paraphrase', 'Back Translation', 'Synonym Replacement'],
    tabular: ['SMOTE', 'Random Oversampling', 'Gaussian Noise']
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dataset Augmentation
      </Typography>

      <Grid container spacing={3}>
        {/* Augmentation Controls */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Augmentation Controls
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Dataset</InputLabel>
              <Select 
                value={selectedDataset ? selectedDataset.id : ''} 
                onChange={(e) => {
                  const dataset = datasets.find(d => d.id === e.target.value);
                  setSelectedDataset(dataset);
                  setPreviewImage(dataset?.data);
                }}
              >
                {datasets.map((dataset) => (
                  <MenuItem key={dataset.id} value={dataset.id}>
                    {dataset.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Augmentation Type</InputLabel>
              <Select value={selectedTechnique} onChange={(e) => setSelectedTechnique(e.target.value)}>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="tabular">Tabular</MenuItem>
              </Select>
            </FormControl>

            {selectedTechnique && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Technique</InputLabel>
                <Select>
                  {techniques[selectedTechnique]?.map((technique) => (
                    <MenuItem key={technique} value={technique}>
                      {technique}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Typography gutterBottom>Augmentation Strength</Typography>
            <Slider
              value={augmentationStrength}
              onChange={(e, value) => {
                setAugmentationStrength(value);
                if (selectedDataset && selectedTechnique) {
                  // Simple preview - adjust image brightness for demo
                  const canvas = document.createElement('canvas');
                  const img = new Image();
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.filter = `brightness(${100 + (value * 100)}%)`;
                    ctx.drawImage(img, 0, 0);
                    setPreviewImage(canvas.toDataURL());
                  };
                  img.src = selectedDataset.data;
                }
              }}
              step={0.1}
              marks
              min={0}
              max={1}
              valueLabelDisplay="auto"
            />

            <Button
              variant="contained"
              startIcon={<AutoFixHighIcon />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                if (selectedDataset && selectedTechnique) {
                  const newAugmentation = {
                    id: Date.now(),
                    technique: selectedTechnique,
                    params: `strength: ${augmentationStrength}`,
                    timestamp: new Date().toISOString(),
                    samplesGenerated: 1,
                    originalDataset: selectedDataset.name
                  };
                  setAugmentationHistory(prev => [...prev, newAugmentation]);
                  
                  // Store augmentation history
                  const history = JSON.parse(localStorage.getItem('augmentationHistory') || '[]');
                  localStorage.setItem('augmentationHistory', JSON.stringify([...history, newAugmentation]));
                }
              }}
            >
              Generate Augmentations
            </Button>
          </Paper>
        </Grid>

        {/* Preview Area */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h6" gutterBottom>
              Augmentation Preview
            </Typography>
            <Box sx={{ 
              height: 300, 
              bgcolor: 'background.paper',
              border: '1px dashed grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {previewImage ? (
                <>
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                  />
                  <Button
                    sx={{ position: 'absolute', left: 10, top: '50%' }}
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                  >
                    ←
                  </Button>
                  <Button
                    sx={{ position: 'absolute', right: 10, top: '50%' }}
                    onClick={() => setCurrentImageIndex(prev => Math.min(datasets.length - 1, prev + 1))}
                  >
                    →
                  </Button>
                </>
              ) : (
                <Typography color="text.secondary">
                  Select a dataset and technique to preview augmentations
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* History */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Augmentation History
            </Typography>
            <List>
              {augmentationHistory.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.technique}
                    secondary={`${item.timestamp} - Parameters: ${item.params}`}
                  />
                  <Stack direction="row" spacing={1}>
                    <Chip label={`${item.samplesGenerated} samples`} color="primary" variant="outlined" />
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DatasetAugmentation;