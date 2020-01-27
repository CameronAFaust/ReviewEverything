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
  editTitle = "test"
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {    
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieDetailsById(params.get('id')).subscribe((movie)=>{
          movie.budget = movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          movie.revenue = movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.movies = movie;
          this.isLoaded = true
      });
    });

    // Get user review data from the database
    // this.http.get('http://localhost:3000/reviews').subscribe((res) => {
    //   this.reviews = res
    // })
    this.reviews = [
      {reviewTitle: "This sucks", reviewText: "test text", reviewRating: "5", userName: "Cameron Faust", userId:"1"},
      {reviewTitle: "This sucks", reviewText: "test text", reviewRating: "5", userName: "Cameron Faust", userId:"2"},
      {reviewTitle: "This sucks", reviewText: "test text", reviewRating: "5", userName: "Cameron Faust", userId:"3"}
    ];
  }

  populateEditForm(data) {
    console.log(data);
    
  }

  onReviewSubmit(formData) {
    let data = formData;
    data['movieId'] = this.movies.id;
    this.http.post('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating  }).subscribe((res) => {
      // Do something here?
    })
  }

}
