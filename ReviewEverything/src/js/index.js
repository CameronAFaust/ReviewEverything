var request = new XMLHttpRequest();
let TrendingMovies = [];

let init = () => {
  // console.log(getTrendingMovies())
  // getTrendingMovies();
};

// let getTrendingMovies = () => {
//   request.open(
//     "GET",
//     "https://api.themoviedb.org/3/trending/movie/week?api_key=cb9a5be66beef417c07e14d9492341c3"
//   );
//   request.onload = () => {
//     TrendingMovies = JSON.parse(request.responseText).results;
//     // console.log(data)
//     // console.log(JSON.parse(request.responseText).results)
//     // return JSON.parse(request.responseText).results;
//   };
//   request.send();
// };

// let getSearchInput = (input) => {
//   console.log(input);
// };

// - Users can search for movies by title, genre, or actor

// API KEY
// cb9a5be66beef417c07e14d9492341c3

// Search for movies
// https://developers.themoviedb.org/3/search/search-movies

// Search for Actors
// https://developers.themoviedb.org/3/search/search-people

// Search for Genre
// https://developers.themoviedb.org/3/discover/movie-discover
// need to use genre id

// home page
// do sorts using the api to popularity, vote adverage, money
// https://developers.themoviedb.org/3/discover/movie-discover
// ???  https://developers.themoviedb.org/3/movies/get-popular-movies
// might have to remove by day/week
// Switch to change from compact to expanded

// Search page
// Show movie poster image in search results and on movie page
// give options for all Queries: language, region, year/primary_release_year
// https://developers.themoviedb.org/3/search/search-movies

// search for actors also
// https://developers.themoviedb.org/3/search/search-people

// Movie page
// Utilize the movie background image in the design of each movie page
// Poster
// Review movies using a character limited text box
// Rate movies using 5-star system

// Budget
// genres
// title
// overview
// revenue
// runtime
// tagline
// vote_average/ vote_count
// backdrop_path
// poster_path
// homepage?
// production_companies?
