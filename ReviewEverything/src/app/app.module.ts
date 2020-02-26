import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';

import { RatingModule } from 'ng-starrating';
import { NgxStarsModule } from 'ngx-stars';

// import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ApiPageComponent } from './api-page/api-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviePageComponent,
    // AboutComponent,
    SearchPageComponent,
    UserPageComponent,
    ApiPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    NgxStarsModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
