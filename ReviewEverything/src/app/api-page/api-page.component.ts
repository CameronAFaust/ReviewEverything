import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
})
export class ApiPageComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private http: HttpClient) { }
  reviews;
  movieId;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apiService.getMovieIdByName(params.get('id')).subscribe((data: any) => {
        this.movieId = data.results[0].id;
        console.log(this.movieId)
        this.http.get('http://localhost:3000/review/movie/' + this.movieId + '').subscribe((res) => {
          this.reviews = res;
        });
      });
    });

  }
}
