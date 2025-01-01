// app.js

const API_KEY = '4f61f7544e060a195ceb386311077a15';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4f61f7544e060a195ceb386311077a15&query=Inception';

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value;
    fetchMovies(query);
});

async function fetchMovies(query) {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === 'True') {
        displayMovies(data.Search);
    } else {
        alert(data.Error);
    }
}

function displayMovies(movies) {
    const moviesSection = document.getElementById('movies-section');
    moviesSection.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;
        moviesSection.appendChild(movieCard);
    });
}
