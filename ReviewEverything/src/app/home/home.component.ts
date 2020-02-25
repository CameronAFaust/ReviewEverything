import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router, ActivatedRoute} from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  loginSubmitted = false;
  signupSubmitted = false;
  popularMovies;
  popularPeople;

  ngOnInit() {
    this.apiService.getPopularMovies().subscribe((data :any)=>{
      this.popularMovies = data.results;
      this.popularMovies.forEach(movie => {
        if (movie.title.length > 35) {
          movie.title = movie.title.substring(0, 35);
          movie.title += "...";
        }
      });
      this.popularMovies.length = 6;

    });
    this.apiService.getPopularPeople().subscribe((data :any)=>{
      this.popularPeople = data.results;
      this.popularPeople.length = 6;
    });
    this.route.paramMap.subscribe(params => {
      if(params.get('userid')) {
        document.getElementById('editPass_modal').style.display='block'
      }
    });
  }

  onSearchSubmit(formData) {
    this.loginSubmitted = false;
    this.signupSubmitted = false;
    this.router.navigate(['/movie', formData.movieSearch])
  }
}
