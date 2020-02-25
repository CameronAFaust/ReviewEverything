import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  movieCredits;
  recommendations;
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

  HTMLElement: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.customFilter = new Filter({ placeHolder: '*' });
    this.reviewForm = this.formBuilder.group({
      reviewTitle: ['', [Validators.required]],
      reviewText: ['', [Validators.required]],
    })
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieDetailsById(params.get('id')).subscribe((movie) => {
        this.movies = movie;
        this.isLoaded = true
        if (!this.movies.runtime) {
          this.movies.runtime = 0;
        }
        this.movies.budget = this.movies.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.movies.revenue = this.movies.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
      this.apiService.getActorsInMovie(params.get('id')).subscribe((movie : any) => {
        this.movieCredits = movie.cast
        if (this.movieCredits.length > 10) { this.movieCredits.length = 10; }
      });
      this.apiService.getMovieRecommendations(params.get('id')).subscribe((movie : any) => {
        this.recommendations = movie.results
        if (this.recommendations.length > 6) { this.recommendations.length = 6; }
      });
      //Check to see if the user is an Admin
      this.http.get('http://localhost:3000/user/getUser/' + this.currentUserId + '').subscribe((res) => {
        this.user = res;
      })
      //Get user review data from the database
      this.http.get('http://localhost:3000/review/movie/' + params.get('id') + '').subscribe((res) => {
        this.reviews = res;
      })
      //The test to see if sending emails work
      // this.http.post('http://localhost:3000/sendMail/lockedMail', {  }).subscribe((res) => {
      //   this.reviews = res;
      // })
    });

  }

  get reviewEr() { return this.reviewForm.controls; }

  onRatingSet(rating) {
    this.newRating = rating;
  }

  showModal() {
    document.getElementById('edit_modal').style.display='block';
    // document.getElementById('stars').style.display='none';

  }

  populateEditForm(data) {
    console.log(document);
    // (<HTMLInputElement>document.getElementById("reviewTitle")).value = data.reviewTitle;
    (<HTMLInputElement>document.getElementById("editReviewText")).value = data.reviewText;
    // (<HTMLInputElement>document.getElementById("editReviewRating")).value = data.reviewRating;
    this.reviewTitle = data.reviewTitle;
    this.reviewText = data.reviewText;
    this.reviewId = data.id;
    this.isEditing = true;
    this.showModal();
  }

  onReviewSubmit() {
    this.reviewSubmitted = true;
    if (!this.currentUserId) {
      document.getElementById('signup_modal').style.display='block'
      document.getElementById('holder').style.display='none'
    }
    if (this.reviewForm.invalid) {
      return;
    }

    let data = this.reviewForm.value;
    // data.reviewTitle = (<HTMLInputElement>document.getElementById("reviewTitle")).value
    data.reviewText = (<HTMLInputElement>document.getElementById("reviewText")).value
    console.log(data)
    data['movieId'] = this.movies.id;
    data.reviewTitle = this.customFilter.clean(data.reviewTitle);
    data.reviewText = this.customFilter.clean(data.reviewText);
    if (this.isEditing) {
      if (data.reviewTitle == "") {
        data.reviewTitle = this.reviewTitle;
      }
      if (data.reviewText == "") {
        data.reviewText = this.reviewText;
      }
      this.http.put('http://localhost:3000/review', {  'review_text': data.reviewText, 'movieID': data.movieId, 'rating': this.newRating, 'reviewID': this.reviewId }).subscribe((res) => {
        //Get user review data from the database
        this.http.get('http://localhost:3000/review/movie/' + this.movies.id + '').subscribe((res) => {
          this.reviews = res;
        })
      })
    } else {
      this.http.post('http://localhost:3000/review', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': this.newRating, 'userID': localStorage.getItem('userId'), 'username': localStorage.getItem('username') }).subscribe((res) => {
        //Get user review data from the database
        this.http.get('http://localhost:3000/review/movie/' + this.movies.id + '').subscribe((res) => {
          this.reviews = res;
        })
      })
    }
    this.isEditing = false;
  }

  deleteReview(data) {
    this.http.delete('http://localhost:3000/review/' + data.id + '').subscribe((res) => {

    })
  }

}
