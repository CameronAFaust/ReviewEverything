import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
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
  currentUserId;
  isEditing = false;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieDetailsById(params.get('id')).subscribe((movie)=>{
          movie.budget = movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          movie.revenue = movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.movies = movie;
          this.isLoaded = true
      });
      // Get user review data from the database
      this.http.get('http://localhost:3000/review/' + params.get('id') + '').subscribe((res) => {
        this.reviews = res
      })
    });
    // this.currentUserId = "1";
    // this.reviews = [
    //   // {review_title: "This sucks", review_text: "test text", rating: "5", movie_id: "499701", userName: "Cameron Faust", userId:"1", id: "4"},
    //   // {review_title: "This really sucks", review_text: "tes", rating: "3", movie_id: "48311", userName: "Cameron Faust", userId:"1", id: "5"}
    // ];
  }

  populateEditForm(data) {
    console.log(document);
    document.getElementById("reviewTitle").value = data.reviewTitle;
    document.getElementById("reviewText").value = data.reviewText;
    this.isEditing = true;
  }

  onReviewSubmit(formData) {
    let data = formData;
    data['movieId'] = this.movies.id;
    if (this.isEditing) {
      this.http.put('http://localhost:3000/review', {  'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating, 'user_id': localStorage.getItem('userId')}).subscribe((res) => {
        // Do something here?
      })
    } else {
      this.http.post('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating, 'userID': localStorage.getItem('userId'), 'username': localStorage.getItem('username')}).subscribe((res) => {
        // Do something here?
      })
    }
    this.isEditing = false;
  }

}
