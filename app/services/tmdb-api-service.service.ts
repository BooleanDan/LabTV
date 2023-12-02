import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiServiceService {

  constructor(private http: HttpClient) { }

  url: string = "https://api.themoviedb.org/3";

  apikey: string = "5c46a13b2f5d1cd8ab56b7f944aadd62";

  promoFilmApiDati(): Observable<any> {
    return this.http.get(`${this.url}/trending/movie/week?api_key=${this.apikey}`);
  }

  trendMovieApiDati(): Observable<any> {
    return this.http.get(`${this.url}/trending/movie/day?api_key=${this.apikey}`)
  }

  getSearchMovieApi(data: any): Observable<any> {
    return this.http.get(`${this.url}/search/movie?api_key=${this.apikey}&query=${data.movieName}`)
  }


  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.url}/movie/${data}?api_key=${this.apikey}`);
  }


  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.url}/movie/${data}/videos?api_key=${this.apikey}`);
  }

  getMovieCastdata(data: any): Observable<any> {
    return this.http.get(`${this.url}/movie/${data}/credits?api_key=${this.apikey}`);
  }

  getMovieSimilar(data: any): Observable<any> {
    return this.http.get(`${this.url}/movie/${data}/similar?api_key=${this.apikey}`)
  }

  getMoviePopolar(): Observable<any> {
    return this.http.get(`${this.url}/movie/now_playing?api_key=${this.apikey}`)
  }

  getAnimationMovies(): Observable<any> {
    return this.http.get(`${this.url}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  getComedyMovies(): Observable<any> {
    return this.http.get(`${this.url}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  getFantascienzaMovies(): Observable<any> {
    return this.http.get(`${this.url}/discover/movie?api_key=${this.apikey}&with_genres=878`);
  }

  getDocumentariMovies(): Observable<any> {
    return this.http.get(`${this.url}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }


  getPeopleMovies(): Observable<any> {
    return this.http.get(`${this.url}/trending/movie/day?api_key=${this.apikey}`);
  }



  getSearchMovieApi2(data: string): Observable<any> {
    return this.http.get(`${this.url}/search/movie?api_key=${this.apikey}&query=${data}`)
  }
}
