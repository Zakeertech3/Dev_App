const express = require('express');
const path = require('path');
const fs = require('fs');

// Process-level error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  // Gracefully exit after logging
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Continue running but log the error
});

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Load music data
let musicData;
const defaultMusicData = { happy: [], sad: [], energetic: [], relaxed: [] };

function loadMusicData() {
  try {
    const dataPath = path.join(__dirname, 'data', 'musicData.json');
    
    // Check if file exists before reading
    if (!fs.existsSync(dataPath)) {
      console.error('Music data file not found at:', dataPath);
      return defaultMusicData;
    }
    
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(rawData);
    
    // Validate the data structure
    const expectedMoods = ['happy', 'sad', 'energetic', 'relaxed'];
    const hasAllMoods = expectedMoods.every(mood => 
      typeof parsedData[mood] === 'object' && Array.isArray(parsedData[mood])
    );
    
    if (!hasAllMoods) {
      console.error('Music data has invalid format');
      return defaultMusicData;
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error loading music data:', error.message);
    return defaultMusicData;
  }
}

// Load the music data
musicData = loadMusicData();

// API endpoint to get music videos based on mood
app.get('/api/mood/:mood', (req, res) => {
  const mood = req.params.mood.toLowerCase();
  
  // Check if the requested mood exists in our data
  if (!musicData[mood]) {
    return res.status(404).json({ 
      error: 'Mood not found', 
      availableMoods: Object.keys(musicData) 
    });
  }

  // Return 5 videos for the requested mood (or all if less than 5)
  const videos = musicData[mood].slice(0, 5);
  
  if (videos.length === 0) {
    return res.status(404).json({ 
      error: 'No videos found for this mood' 
    });
  }

  res.json({ mood, videos });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`MoodTunes server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

