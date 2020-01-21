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
  reviews;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieIdByName(params.get('id')).subscribe((data)=>{
        this.movieId = data;
        this.apiService.getMovieDetailsById(data).subscribe((movie)=>{
          this.movies = movie;
          this.isLoaded = true
        });
      });
    });
    // Get user review data from the database
    // this.http.get('http://localhost:3000/reviews').subscribe((res) => {
    //   reviews = res
    // })
    this.reviews = [{reviewTitle: "This sucks", reviewText: "i hate this movie so much", reviewRating: "5", movieId: 9836, userName: "Cameron_Faust"}]
  }

  onReviewSubmit(formData) {
    let data = formData;
    data['movieId'] = this.movies.id;
    this.http.post('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId  }).subscribe((res) => {
      console.log("done")
    })
  }

}
