
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moviesbox = document.querySelector("#movie-box");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");

let currentPage = 1;

const getMovies = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    showMovies(data.results);
};

const showMovies = (data) => {
    moviesbox.innerHTML = "";
    data.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box");
        
        // Check if poster_path is null
        const posterPath = item.poster_path ? IMGPATH + item.poster_path : 'image/missingimg.jpg';

        box.innerHTML = `
            <img src="${posterPath}" alt=""/>
            <div class="overlay">
                <div class="title">
                    <h2>${item.original_title}</h2>
                    <span>${item.vote_average}</span>
                </div>
                <h3>OverView:</h3>
                <p>${item.overview}</p>
            </div>
        `;
        moviesbox.appendChild(box);
    });
};

// Function to update pagination buttons
const updatePaginationButtons = (page) => {
    prevButton.disabled = page <= 1;
};

// Event listeners for pagination buttons
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        getMovies(APIURL + currentPage);
        updatePaginationButtons(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    getMovies(APIURL + currentPage);
    updatePaginationButtons(currentPage);
});

document.querySelector("#search").addEventListener("keyup", function (event) {
    if (event.target.value !== "") {
        getMovies(SEARCHAPI + event.target.value);
    } else {
        getMovies(APIURL + currentPage);
    }
});

// Initial load of movies
getMovies(APIURL + currentPage);
updatePaginationButtons(currentPage);
