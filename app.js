const fetch = require('node-fetch');

app.get('/get-similar-movies', async (req, res) => {
    const apiKey = 'A2783c111a5bb87f859a7f81e7c75db6';
    const { movieId, movieTitle } = req.query;
    let url = '';

    if (movieId) {
        url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`;
    } else if (movieTitle) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;
    } else {
        res.status(400).send('Please provide a movie ID or movie title.');
        return;
    }

    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        res.status(500).send('Error fetching similar movies');
    }
});
