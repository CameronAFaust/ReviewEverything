import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient) { }
  searchType = '';
  searchDescription = '';
  searchList = [];
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchType = params.get('type');
      if (params.get('type') == 'title') {
        this.apiService.getMovieIdByName(params.get('id')).subscribe((data :any)=>{
          this.searchList = data.results;
          this.searchDescription = 'Movies search results for: "' + params.get('id') + '"';
          this.searchList.forEach(movie => {
            if (movie.title.length > 25) {
              movie.title = movie.title.substring(0, 25);
              movie.title += "...";
            }
          this.searchList.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
        });
        });

      } else if (params.get('type') == 'actor') {
        this.apiService.getActorIdByName(params.get('id')).subscribe((data :any)=>{
          this.searchList = data.results;
          this.searchDescription = 'Actor search results for: "' + params.get('id') + '"';
          this.searchList.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
        });

      } else if (params.get('type') == 'actors_movies') {
        this.apiService.getActorMoviesById(params.get('id')).subscribe((data :any)=>{
          this.searchList = data.cast;
          this.searchDescription = 'Movies with the actor: "' + params.get('actorName') + '"';
          this.searchList.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
        });

      } else {  
        this.apiService.getGenreMoviesById(params.get('id')).subscribe((data :any)=>{
          this.searchList = data.results;
          this.searchDescription = 'Genre search results for: "' + params.get('id') + '"';
          this.searchList.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
        });
      }      
    });
  }

}
