import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onLogin(formData) {
    console.log(formData);
    // this.router.navigate(['/movie', formData.movieSearch])
  }
  onSearchSubmit(formData) {
    console.log(formData.movieSearch);
    this.router.navigate(['/movie', formData.movieSearch])
  }

}
