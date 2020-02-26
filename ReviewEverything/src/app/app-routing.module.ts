import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ApiPageComponent } from './api-page/api-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'home/:userid', component: HomeComponent },
  { path: 'user/:userid', component: UserPageComponent },
  { path: 'api/:id', component: ApiPageComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'search/:type/:id', component: SearchPageComponent },
  { path: 'search/:type/:id/:actorName', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
