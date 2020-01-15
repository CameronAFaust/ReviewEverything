import { Component } from "@angular/core";
// declare function init(): any;
// declare function getTrendingMovies(): any;
// declare function getSearchInput(): any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ReviewEverything";
  // init = init();
  // getSearchInput(input);
  getSearchInput(formData) {
    alert(formData);
  }
  // trendingMovies = getTrendingMovies();
  // takeSearch = getSearchInput;
}


// 