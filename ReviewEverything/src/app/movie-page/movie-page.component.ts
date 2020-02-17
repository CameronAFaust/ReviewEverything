import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import * as Filter from 'bad-words';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  reviewForm: FormGroup;
  reviewSubmitted = false;
  movies;
  isLoaded = false;
  movieId;
  reviews;
  reviewId;
  reviewTitle;
  reviewText;
  newRating;
  user;
  currentUserId = localStorage.getItem('userId');
  isEditing = false;
  customFilter;

  HTMLElement : any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.customFilter = new Filter({ placeHolder: '*'});
    this.reviewForm = this.formBuilder.group({
      reviewTitle: ['', [Validators.required]],
      reviewText: ['', [Validators.required]],
      reviewRating: ['', [Validators.required]]
    })
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieDetailsById(params.get('id')).subscribe((movie)=>{
        this.movies = movie;
        this.isLoaded = true
        this.movies.budget = this.movies.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.movies.revenue = this.movies.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
      //Check to see if the user is an Admin
      // this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId + '').subscribe((res) => {
      //   this.user = res;
      // })
      // // Get user review data from the database
      // this.http.get('http://localhost:3000/review/movie/' + params.get('id') + '').subscribe((res) => {
      //   this.reviews = res;
      // })
    });

  }

  get reviewEr() { return this.reviewForm.controls; }

  updateStarRating() {
    let data = this.reviewForm.value;
    console.log(data.reviewRating)
    this.newRating = data.reviewRating;
  }

  // populateEditForm(data) {
  //   console.log(document);
  //   (<HTMLInputElement>document.getElementById("reviewTitle")).value = data.reviewTitle;
  //   (<HTMLInputElement>document.getElementById("reviewText")).value = data.reviewText;
  //   this.reviewTitle = data.reviewTitle;
  //   this.reviewText = data.reviewText;
  //   this.reviewId = data.id;
  //   this.isEditing = true;
  // }

  // onReviewSubmit() {
  //   this.reviewSubmitted = true;
  //   if (this.reviewForm.invalid) {
  //     return;
  //   }

  //   let data = this.reviewForm.value;
  //   data.reviewTitle = (<HTMLInputElement>document.getElementById("reviewTitle")).value
  //   data.reviewText = (<HTMLInputElement>document.getElementById("reviewText")).value
  //   // console.log(data)
  //   data['movieId'] = this.movies.id;
  //   data.reviewTitle = this.customFilter.clean(data.reviewTitle);
  //   data.reviewText = this.customFilter.clean(data.reviewText);
  //   if (this.isEditing) {
  //     if(data.reviewTitle == "") {
  //       data.reviewTitle = this.reviewTitle;
  //     }
  //     if(data.reviewText == ""){
  //       data.reviewText = this.reviewText;
  //     }
  //     this.http.put('http://localhost:3000/review', {  'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating, 'reviewID': this.reviewId }).subscribe((res) => {
  //       // Get user review data from the database
  //       this.http.get('http://localhost:3000/review/movie/' + this.movies.id + '').subscribe((res) => {
  //         this.reviews = res;
  //       })
  //     })
  //   } else {
  //     this.http.post('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating, 'userID': localStorage.getItem('userId'), 'username': localStorage.getItem('username')}).subscribe((res) => {
  //       // Get user review data from the database
  //       this.http.get('http://localhost:3000/review/movie/' + this.movies.id + '').subscribe((res) => {
  //         this.reviews = res;
  //       })
  //     })
  //   }
  //   this.isEditing = false;
  // }

  // deleteReview(data) {
  //   this.http.delete('http://localhost:3000/review/' + data.id + '').subscribe((res) => {

  //   })
  // }

}
