import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { SearchComponent } from './search/search.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { AccountComponent } from './account/account.component';
import { MyFilmComponent } from './my-film/my-film.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'home/dashboard/:token', component: HomeDashboardComponent },
  { path: 'search/:token', component: SearchComponent },
  { path: 'film/:id', component: FilmDetailComponent },
  { path: 'myaccount/:token', component: AccountComponent },
  { path: 'eliminato', component: MyFilmComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
