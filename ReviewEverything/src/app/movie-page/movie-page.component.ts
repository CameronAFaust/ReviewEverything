import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  currentUserId = localStorage.getItem('userId');
  isEditing = false;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      reviewTitle: ['', [Validators.required]],
      reviewText: ['', [Validators.required]],
      reviewRating: ['', [Validators.required]]
    })
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieDetailsById(params.get('id')).subscribe((movie)=>{
          //  movie.budget = movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          //  movie.revenue = movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.movies = movie;
          this.isLoaded = true
      });
      // Get user review data from the database
      this.http.get('http://localhost:3000/review/' + params.get('id') + '').subscribe((res) => {
        this.reviews = res;
      })
    });

  }

  get reviewEr() { return this.reviewForm.controls; }


  populateEditForm(data) {
    console.log(document);
    document.getElementById("reviewTitle").value = data.reviewTitle;
    document.getElementById("reviewText").value = data.reviewText;
    this.reviewId = data.id;
    this.isEditing = true;
  }

  onReviewSubmit() {
    this.reviewSubmitted = true;
    if (this.reviewForm.invalid) {
      return;
    }

    let data = formData;
    data[reviewTitle] = document.getElementById("reviewTitle").value
    data[reviewText] = document.getElementById("reviewText").value
    // console.log(data)
    data['movieId'] = this.movies.id;
    if (this.isEditing) {
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
