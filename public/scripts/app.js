/**
 * MoodTunes Application
 * Client-side JavaScript for handling user interactions and API calls
 */

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', initApp);

/**
 * Initialize the application
 */
function initApp() {
  // Get UI elements
  const moodButtons = document.querySelectorAll('.mood-btn');
  const resultsSection = document.getElementById('results-section');
  const resultsContainer = document.getElementById('results-container');
  const resultsList = document.getElementById('results-list');
  const resultsTitle = document.getElementById('results-title');
  const loadingEl = document.getElementById('loading');
  const errorMessageEl = document.getElementById('error-message');
  
  // Add event listeners to all mood buttons
  moodButtons.forEach(button => {
    button.addEventListener('click', () => handleMoodSelection(button));
  });
  
  /**
   * Handle mood button selection
   * @param {HTMLElement} selectedButton - The selected mood button
   */
  async function handleMoodSelection(selectedButton) {
    // Visual feedback for selected button
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
    
    // Get selected mood
    const mood = selectedButton.getAttribute('data-mood');
    
    // Show loading, hide results and error message
    showLoading();
    
    try {
      // Fetch music videos for the selected mood
      const musicVideos = await fetchMusicVideos(mood);
      
      // Update results title
      resultsTitle.textContent = `Your ${capitalizeFirstLetter(mood)} Mood Playlist`;
      
      // Display the results
      displayResults(musicVideos.videos);
    } catch (error) {
      // Handle and display any errors
      showError(error.message || "Failed to load music suggestions. Please try again.");
      console.error("Error fetching music videos:", error);
    }
  }
  
  /**
   * Fetch music videos for a specific mood from the API
   * @param {string} mood - The selected mood
   * @returns {Promise<Object>} - The API response with videos
   */
  async function fetchMusicVideos(mood) {
    try {
      const response = await fetch(`/api/mood/${mood}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unable to fetch music suggestions");
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Display music video results in the results section
   * @param {Array} videos - Array of video objects to display
   */
  function displayResults(videos) {
    // Clear previous results
    resultsList.innerHTML = '';
    
    if (!videos || videos.length === 0) {
      showError("No music videos found for this mood.");
      return;
    }
    
    // Get the video template
    const template = document.getElementById('video-template');
    
    // Create and append video items
    videos.forEach(video => {
      // Clone the template
      const videoElement = template.content.cloneNode(true);
      
      // Set video data
      const title = videoElement.querySelector('.video-title');
      const artist = videoElement.querySelector('.video-artist');
      const thumbnail = videoElement.querySelector('.thumbnail-img');
      const watchBtn = videoElement.querySelector('.watch-btn');
      
      title.textContent = video.title;
      artist.textContent = video.artist;
      thumbnail.src = video.thumbnailUrl;
      thumbnail.alt = `${video.title} by ${video.artist}`;
      
      // Set YouTube link
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
      watchBtn.href = youtubeUrl;
      
      // Make the thumbnail clickable too
      videoElement.querySelector('.video-thumbnail').addEventListener('click', () => {
        window.open(youtubeUrl, '_blank');
      });
      
      // Add the video element to the results list
      resultsList.appendChild(videoElement);
    });
    
    // Hide loading and error, show results
    hideLoading();
    errorMessageEl.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  /**
   * Show loading indicator and hide other UI elements
   */
  function showLoading() {
    loadingEl.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    errorMessageEl.classList.add('hidden');
  }
  
  /**
   * Hide loading indicator
   */
  function hideLoading() {
    loadingEl.classList.add('hidden');
  }
  
  /**
   * Show error message
   * @param {string} message - Error message to display
   */
  function showError(message) {
    errorMessageEl.querySelector('p').textContent = message;
    hideLoading();
    resultsContainer.classList.add('hidden');
    errorMessageEl.classList.remove('hidden');
  }
  
  /**
   * Capitalize the first letter of a string
   * @param {string} string - String to capitalize
   * @returns {string} - Capitalized string
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

