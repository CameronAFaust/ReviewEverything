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
  reviewId;
  reviewTitle;
  reviewText;
  user;
  currentUserId = localStorage.getItem('userId');
  isEditing = false;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieDetailsById(params.get('id')).subscribe((movie)=>{
          movie.budget = movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          movie.revenue = movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.movies = movie;
          this.isLoaded = true;
          console.log(this.currentUserId);
      });
      //Check to see if the user is an Admin
      this.http.get('http://localhost:3000/user/admin/' + this.currentUserId + '').subscribe((res) => {
        this.user = res;
        console.log(this.user);
      })
      // Get user review data from the database
      this.http.get('http://localhost:3000/review/' + params.get('id') + '').subscribe((res) => {
        this.reviews = res;
      })
    });
  }

  populateEditForm(data) {
    console.log(document);
    document.getElementById("reviewTitle").value = data.reviewTitle;
    document.getElementById("reviewText").value = data.reviewText;
    this.reviewTitle = data.reviewTitle;
    this.reviewText = data.reviewText;
    this.reviewId = data.id;
    this.isEditing = true;
  }

  onReviewSubmit(formData) {
    let data = formData;
    data.movieId = this.movies.id;
    if (this.isEditing) {
      if(data.reviewTitle == "") {
        data.reviewTitle = this.reviewTitle;
      }
      if(data.reviewText == ""){
        data.reviewText = this.reviewText;
      }
      this.http.put('http://localhost:3000/review', {  'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating, 'reviewID': this.reviewId }).subscribe((res) => {
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
