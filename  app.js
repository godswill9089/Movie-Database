const API_KEY = '9b25001b'; // Your OMDB API key
const BASE_URL = 'http://www.omdbapi.com/';

const moviesSection = document.getElementById('movies-section');
const tvShowsSection = document.getElementById('tvshows-section');
const suggestMeSection = document.getElementById('suggestme-section');

const searchBar = document.getElementById('search-bar');

const moviesPage = document.getElementById('movies');
const tvShowsPage = document.getElementById('tvshows');
const suggestMePage = document.getElementById('suggestme');

const navLinks = document.querySelectorAll('nav li'); // Assuming your links are inside a <nav> element
const pageTitle = document.getElementById('page-title');

// Event listeners for navigation
moviesPage.addEventListener('click', () => {
    showPage('movies');
    fetchMovies(); // Fetch initial movies
    setActiveLink(moviesPage);
    updatePageTitle('Movies');
});

tvShowsPage.addEventListener('click', () => {
    showPage('tvshows');
    fetchTVShows(); // Fetch initial TV shows
    setActiveLink(tvShowsPage);
    updatePageTitle('TV Shows');
});

suggestMePage.addEventListener('click', () => {
    showPage('suggestme');
    fetchSuggestedMovies(); // Fetch initial suggested movies
    setActiveLink(suggestMePage);
    updatePageTitle('Suggest Me');
});

// Function to update the page title
function updatePageTitle(title) {
    pageTitle.textContent = title;
}

// Function to switch pages
function showPage(page) {
    moviesSection.style.display = 'none';
    tvShowsSection.style.display = 'none';
    suggestMeSection.style.display = 'none';

    if (page === 'movies') {
        moviesSection.style.display = 'grid';
    } else if (page === 'tvshows') {
        tvShowsSection.style.display = 'grid';
    } else if (page === 'suggestme') {
        suggestMeSection.style.display = 'block';
    }
}

// Function to set the active class on the clicked link
function setActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Fetch Movies based on the query
async function fetchMovies(query = 'avengers') {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Search) {
            displayMovies(data.Search);
        } else {
            console.error('No movies found.');
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Display Movies
function displayMovies(movies) {
    moviesSection.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;
        moviesSection.appendChild(movieCard);
    });
}

// Fetch TV Shows based on the query
async function fetchTVShows(query = 'game of thrones') {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=series`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Search) {
            displayTVShows(data.Search);
        } else {
            console.error('No TV shows found.');
        }
    } catch (error) {
        console.error('Error fetching TV shows:', error);
    }
}

// Display TV Shows
function displayTVShows(tvShows) {
    tvShowsSection.innerHTML = '';
    tvShows.forEach(show => {
        const showCard = document.createElement('div');
        showCard.classList.add('movie-card');
        showCard.innerHTML = `
            <img src="${show.Poster !== 'N/A' ? show.Poster : 'placeholder.jpg'}" alt="${show.Title}">
            <h3>${show.Title}</h3>
            <p>Year: ${show.Year}</p>
        `;
        tvShowsSection.appendChild(showCard);
    });
}

// Fetch Suggested Movies
async function fetchSuggestedMovies() {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=random`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Search) {
            displayMovies(data.Search); // Reusing displayMovies for simplicity
        } else {
            console.error('No suggested movies found.');
        }
    } catch (error) {
        console.error('Error fetching suggested movies:', error);
    }
}

// Handle search input (searching across all sections)
searchBar.addEventListener('input', () => {
    const query = searchBar.value.trim();
    if (moviesPage.classList.contains('active')) {
        fetchMovies(query || 'avengers');
    } else if (tvShowsPage.classList.contains('active')) {
        fetchTVShows(query || 'game of thrones');
    } else if (suggestMePage.classList.contains('active')) {
        fetchSuggestedMovies(); // Suggested movies do not filter by query
    }
});

// Initialize with the default Movies page
document.addEventListener('DOMContentLoaded', () => {
    setActiveLink(moviesPage);
    updatePageTitle('Movies');
    fetchMovies(); // Fetch default movies
});
