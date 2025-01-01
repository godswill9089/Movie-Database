const API_KEY = '4f61f7544e060a195ceb386311077a15';
const BASE_URL = 'https://api.themoviedb.org/3';


const moviesSection = document.getElementById('movies-section');
const tvShowsSection = document.getElementById('tvshows-section');
const suggestMeSection = document.getElementById('suggestme-section');

const searchBar = document.getElementById('search-bar');

const moviesPage = document.getElementById('movies');
const tvShowsPage = document.getElementById('tvshows');
const suggestMePage = document.getElementById('suggestme');

const navLinks = document.querySelectorAll('nav li');// Assuming your links are inside a <nav> element
const pageTitle = document.getElementById('page-title');

// Event listeners for navigation
moviesPage.addEventListener('click', () => {
    showPage('movies');
    fetchMovies(); // Initial fetch
    setActiveLink(moviesPage); // Set active state
     updatePageTitle('Movies'); 
});

tvShowsPage.addEventListener('click', () => {
    showPage('tvshows');
    fetchTVShows();
    setActiveLink(tvShowsPage);
      updatePageTitle('TV Shows'); 
});

suggestMePage.addEventListener('click', () => {
    showPage('suggestme');
    fetchSuggestedMovies();
    setActiveLink(suggestMePage);
     updatePageTitle('Suggest Me');
});

function updatePageTitle(title) {
    pageTitle.textContent = title; // Set the text content of the page title
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
    // Remove the 'active' class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add the 'active' class to the clicked link
    activeLink.classList.add('active');
}



document.addEventListener('DOMContentLoaded', () => {
    setActiveLink(moviesPage); // Set the Movies link as active by default
      updatePageTitle('Movies');
});

// Fetch Movies based on the query
async function fetchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
            displayMovies(data.results);
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
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
        `;
        moviesSection.appendChild(movieCard);
    });
}

// Fetch TV Shows
async function fetchTVShows(timeWindow = 'day') {
    const url = `${BASE_URL}/trending/tv/${timeWindow}?api_key=${API_KEY}&language=en-US`;  // Updated URL
    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
        displayTVShows(data.results);
    } else {
        alert('No TV shows found.');
    }
}

// Display TV Shows
function displayTVShows(tvShows) {
    tvShowsSection.innerHTML = '';
    tvShows.forEach(show => {
        const showCard = document.createElement('div');
        showCard.classList.add('movie-card');
        showCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
            <h3>${show.name}</h3>
            <p>First Air Date: ${show.first_air_date}</p>
        `;
        tvShowsSection.appendChild(showCard);
    });
}

// Fetch Suggested Movies
async function fetchSuggestedMovies() {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
        displayMovies(data.results);
    } else {
        alert('No suggestions found.');
    }
}

// Handle search input (searching for movies)
function searchMovies() {
    const query = searchBar.value;
    fetchMovies(query); // Trigger the fetchMovies function when the user types
}

// Initialize with default Movies page
showPage('movies');
fetchMovies();

// Add event listener for the search input field
searchBar.addEventListener('input', searchMovies); // Call searchMovies on input
