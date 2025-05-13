# MoodTunes 🎵

MoodTunes is a web application that recommends YouTube music videos based on your current mood. Select how you're feeling, and the app will suggest 5 curated songs to match your emotional state.

## Features ✨

- **Mood-Based Music Recommendations**: Choose from four different moods (Happy, Sad, Energetic, Relaxed)
- **Curated YouTube Selections**: Each mood offers 5 hand-picked music videos
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Clean UI**: Intuitive interface with mood-themed colors and animations
- **Direct YouTube Integration**: Watch videos directly on YouTube with a single click

## Technologies Used 🛠️

- **Frontend**:
  - HTML5
  - CSS3 (with responsive design)
  - Vanilla JavaScript (ES6+)
  
- **Backend**:
  - Node.js
  - Express.js
  
- **Data Storage**:
  - JSON for storing curated video selections

## Installation 📋

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Zakeertech3/Dev_App.git
   cd Dev_App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## How to Use 🎮

1. Open the application in your web browser
2. Select your current mood from the four options:
   - 😊 Happy
   - 😢 Sad
   - ⚡ Energetic
   - 😌 Relaxed
3. Wait for the application to load your personalized music recommendations
4. Click on any song to watch the video on YouTube
5. Return to the mood selection screen to choose a different mood

## API Endpoints 🔌

The application provides the following API endpoint:

- **GET `/api/mood/:mood`**: Returns 5 music videos for the specified mood
  - Parameters: `mood` (string) - One of: "happy", "sad", "energetic", "relaxed"
  - Response: JSON object containing an array of music videos
  - Example Response:
    ```json
    {
      "mood": "happy",
      "videos": [
        {
          "title": "Happy",
          "videoId": "ZbZSe6N_BXs",
          "artist": "Pharrell Williams",
          "thumbnailUrl": "https://i.ytimg.com/vi/ZbZSe6N_BXs/hqdefault.jpg"
        },
        // Additional videos...
      ]
    }
    ```

## Project Structure 📁

```
moodmaker/
├─ package.json         - Project configuration
├─ server.js            - Express server and API endpoints
├─ data/
│  └─ musicData.json    - JSON data with mood-based music videos
├─ public/              - Frontend files
│  ├─ index.html        - Main HTML file
│  ├─ scripts/
│  │  └─ app.js         - Client-side JavaScript
│  └─ styles/
│     └─ style.css      - CSS styling
```

## Future Enhancements 🚀

- User accounts to save favorite videos
- More mood categories (e.g., Focused, Romantic, Nostalgic)
- Integration with YouTube API for dynamic recommendations
- User-contributed playlists
- Ability to rate songs and improve recommendations
- Dark/light theme toggle
- PWA support for offline functionality

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ for music lovers | © 2025 MoodTunes

