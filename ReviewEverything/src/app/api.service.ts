import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = 'cb9a5be66beef417c07e14d9492341c3';
  genres = [
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Documentary"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10752,
      name: "War"
    },
    {
      id: 37,
      name: "Western"
    }
  ]
  // MOVIE
  public getMovieDetailsById(MovieId){
    console.log(MovieId);
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${MovieId}?api_key=${this.API_KEY}&language=en-US`);
  }
  public getMovieIdByName(MovieName){
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&query=${MovieName}&page=1&include_adult=false`);
  }
  // ACTOR
  public getActorIdByName(ActorName){
    return this.httpClient.get(`https://api.themoviedb.org/3/search/person?api_key=${this.API_KEY}&language=en-US&query=${ActorName}&include_adult=false`);
  }
  public getActorMoviesById(ActorId){
    return this.httpClient.get(`https://api.themoviedb.org/3/person/${ActorId}/movie_credits?api_key=${this.API_KEY}&language=en-US`);
  }
  // GENRE
  public getGenreMoviesById(genreName){
    let genreId;
    this.genres.forEach(genre => {
      if (genre.name == genreName) {
        genreId = genre.id
      }
    });
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId} `);
  }

  constructor(private httpClient: HttpClient) { }
}