import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  movies;
  isLoaded = false;
  movieId;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieIdByName(params.get('id')).subscribe((data)=>{
        this.movieId = data;
        this.apiService.getMovieDetailsById(data).subscribe((movie)=>{
          console.log(movie);
          this.movies = movie;
          this.isLoaded = true
        });
      });
    });
  }

  onReviewSubmit(formData) {
    let data = formData;
<<<<<<< Updated upstream
    data['movieId'] = this.movies.id;
    this.http.post('http://localhost:3000/review', data).subscribe((res) => {
=======
    console.log(data);
    this.http.post('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText  }).subscribe((res) => {
>>>>>>> Stashed changes
      console.log("done")
    })
  }

}
