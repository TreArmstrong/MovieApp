let isMuted = false;

document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.querySelector('video');

    if (videoElement) {
        videoElement.play().catch(error => {
            console.error('Video playback error:', error);
        });
    }

    const muteButton = document.getElementById('muteButton');

    if (muteButton) {
        muteButton.addEventListener('click', toggleMute);
    }
});

function toggleMute() {
    const videoElement = document.querySelector('video');
    isMuted = !isMuted;
    
    if (isMuted) {
        videoElement.muted = true;
    } else {
        videoElement.muted = false;
    }
}


async function getSimilarMovies() {
    const movieId = document.getElementById('movieId').value;
    const movieTitle = document.getElementById('movieTitle').value;
    
    let url = `/get-similar-movies?`;
    if (movieId) {
        url += `movieId=${movieId}`;
    } else if (movieTitle) {
        url += `movieTitle=${encodeURIComponent(movieTitle)}`;
    } else {
        console.error('Please enter a movie ID or movie title.');
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const similarMoviesDiv = document.getElementById('similarMovies');
        similarMoviesDiv.innerHTML = '<h2>Similar Movies:</h2>';
        
        data.forEach(movie => {
            similarMoviesDiv.innerHTML += `<p>${movie.title}</p>`;
        });
    } catch (error) {
        console.error('Error fetching similar movies:', error);
    }
}
