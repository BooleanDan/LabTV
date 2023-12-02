import { Component } from '@angular/core';
import { TmdbApiServiceService } from '../services/tmdb-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: TmdbApiServiceService) { }

  promoFilmResult: any = [];

  ngOnInit(): void {
    this.promoFilm();
  }

  promoFilm() {
    this.service.promoFilmApiDati().subscribe((result) => {
      console.log(result);
      this.promoFilmResult = result.results;
    })
  }

}
