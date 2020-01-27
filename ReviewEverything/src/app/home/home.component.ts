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
    // console.log(formData);
    this.http.post('http://localhost:3000/user', { 'email': formData.email, 'password': formData.password }).subscribe((res) => {
      console.log("done")
    })
  }
  onSignup(formData){
    console.log(formData);
    this.http.post('http://localhost:3000/user', { 'fname': formData.fname, 'lname': formData.lname, 'email': formData.email, 'password': formData.password }).subscribe((res) => {
    })
  }
  onLogout(){
    // req.logout();
  }
  onSearchSubmit(formData) {
    console.log(formData.movieSearch);
    this.router.navigate(['/movie', formData.movieSearch])
  }

}
