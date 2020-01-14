import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  movies;
  isLoaded = false;
  movieId;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieIdByName(params.get('id')).subscribe((data)=>{
        // console.log(data.results[0].id)
        this.apiService.getMovieDetailsById(data).subscribe((movie)=>{
          // console.log(movie);
          this.movies = movie;
          this.isLoaded = true
        });
      });
    });
  }

  onReviewSubmit(formData) {
    console.log(formData);
  }

}
