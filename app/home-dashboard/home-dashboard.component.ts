import { Component } from '@angular/core';
import { TmdbApiServiceService } from '../services/tmdb-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],


})


export class HomeDashboardComponent {

  filmuser: any;
  filmdiv: boolean = false;

  user: any = [{
    cognome: "",
    email: "",
    id: 0,
    nome: "",


  }];

  constructor(private service: TmdbApiServiceService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  promoFilmResult: any = [];
  trendMovieResult: any = [];
  moviePopolarResult: any;
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  fantascienzaMovieResult: any = [];
  documentariMovieResult: any = [];
  personMovieResult: any = [];

  myParam: string = "";

  visibile: boolean = false;

  ngOnInit(): void {
    this.promoFilm();
    this.trendData();
    this.popolarData();
    this.ricevifilm();
    this.getAnimation();
    this.getComedy();
    this.getFantascienza();
    this.getDocumentari();
    this.getPerson();


    //ci dobbiamo ricavare il parametro token
    this.myParam = this.route.snapshot.params['token']
    //se myParam esiste imposto la chiave token nel localStorage
    if (this.myParam) {
      localStorage.setItem('token', this.myParam);
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user);
    }
    else {

      this.router.navigate(['login'])
    }

    this.ricevifilm();








    /*   // Modifica la cronologia del browser per sostituire l'URL corrente con l'URL della pagina di login
      window.history.pushState(null, '', window.location.href);
  
      // Aggiungi un ascoltatore di eventi per catturare il tentativo di navigazione all'indietro
      window.addEventListener('popstate', () => {
        // Reimposta la cronologia del browser per tornare alla pagina di login
        window.history.pushState(null, '', window.location.href);
      }); */
  }

  promoFilm() {
    this.service.getMoviePopolar().subscribe((result) => {
      console.log(result);
      this.promoFilmResult = result.results;
    })
  }

  trendData() {
    this.service.trendMovieApiDati().subscribe((result) => {
      console.log(result);
      this.trendMovieResult = result.results;
    });

  }


  popolarData() {
    this.service.trendMovieApiDati().subscribe((result) => {


      this.moviePopolarResult = result.results.splice(0, 10);
      console.log(this.moviePopolarResult);
    });


  }

  aggiornaAccount(isLastFilmRemoved: boolean) {
    if (isLastFilmRemoved) {
      this.ricevifilm();


    }
  }



  ricevifilm() {



    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    console.log(headers)
    this.http.get<any>("http://localhost:3000/films-acquistati", { headers }).subscribe(res => {
      // alert("dati ricevuti con u con successo");
      console.log(res)
      //implemento la cronologia di acquisto cronologia=res filtro l'array con l'id del utente :)
      console.log(this.user.id)
      /*  this.filmuser = res.forEach((item: any) => {
         console.log(item.userId)
         res.filter(item.userId == this.user.id)
 
         console.log(this.filmuser)
       }) */
      /*  this.filmuser = res.filter(res.userId == this.user.id);
       console.log(this.filmuser) */


      this.filmuser = res.filter((item: any) => item.userId == this.user.id)
      console.log(this.filmuser)


      if (this.filmuser.length > 0) {

        this.filmdiv = true;
        this.visibile = true;
      }
      else {

        this.filmdiv = false;
        this.visibile = false;
      }




      /* this.router.navigate(['login']); */
    }, err => {



    })
  }

  getAnimation() {
    this.service.getAnimationMovies().subscribe((result) => {
      console.log(result);
      this.animationMovieResult = result.results;
    });

  }

  getComedy() {
    this.service.getComedyMovies().subscribe((result) => {
      console.log(result);
      this.comedyMovieResult = result.results;
    });

  }


  getFantascienza() {
    this.service.getFantascienzaMovies().subscribe((result) => {
      console.log(result);
      this.fantascienzaMovieResult = result.results;
    });

  }

  getDocumentari() {
    this.service.getDocumentariMovies().subscribe((result) => {
      console.log(result);
      this.documentariMovieResult = result.results;
    });

  }

  getPerson() {
    this.service.getPeopleMovies().subscribe((result) => {
      console.log(result);
      this.personMovieResult = result.results;
    });

  }

}


