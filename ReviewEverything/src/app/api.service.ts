import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = 'cb9a5be66beef417c07e14d9492341c3';
  // MOVIE_ID = '9836';
  public getMovieDetailsById(MovieId){
    console.log(MovieId.results[0].id)
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${MovieId.results[0].id}?api_key=${this.API_KEY}&language=en-US`);
  }
  public getMovieIdByName(MovieName){
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&query=${MovieName}&page=1&include_adult=false`);
  }

  constructor(private httpClient: HttpClient) { }
}
