import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }
  onLogin(formData) {
    console.log(formData);
    // this.http.post('http://localhost:3000/login', { 'username': data.username, 'password': data.password }).subscribe((res) => {
    //   console.log("done")
    // })
  }
  onSignup(formData){
    console.log(formData);
    // this.http.post('http://localhost:3000/signup', { 'review_title': data.reviewTitle, 'review_text': data.reviewText, 'movieID': data.movieId, 'rating': data.reviewRating  }).subscribe((res) => {
    //   console.log("done")
    //   // if (res ! error) {
    //   //   this.http.post('http://localhost:3000/login', { 'username': data.username, 'password': data.password }).subscribe((res) => {
    //   //     console.log("done")
    //   //   })    
    //   // }
    // })
  }
  onSearchSubmit(formData) {
    console.log(formData.movieSearch);
    this.router.navigate(['/movie', formData.movieSearch])
  }

}
