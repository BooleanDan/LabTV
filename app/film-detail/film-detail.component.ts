import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbApiServiceService } from '../services/tmdb-api-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Token } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent {

  constructor(private router: Router, private route: ActivatedRoute, private service: TmdbApiServiceService, private sanitizer: DomSanitizer, private location: Location, private http: HttpClient) { }
  idFilm: string = "";
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  iframeUrl !: SafeResourceUrl;
  parteFinaleLinkVideo: string = "";
  modalVisible: boolean = false;
  mostraPulsante: boolean = false;
  getDirectorResult: any;
  getSimilarResult: any;
  pulsantePlay: boolean = false;
  pulsanteAcquista: boolean = true;


  apriModal() {
    this.modalVisible = true;



  }

  videoSrc: any;

  chiudiModal() {
    this.modalVisible = false;
    const iframe = document.querySelector('iframe');
    if (iframe) {
      this.videoSrc = iframe.getAttribute('src');
      iframe.setAttribute('src', '');
      iframe.setAttribute('src', this.videoSrc);
    }
  }

  storedArray: any;
  iduser: any;

  filmacquistati: any;
  copertinaFilm: any;
  titoloFilm: any;


  pageReady: boolean = false;

  user: any = [{
    cognome: "",
    email: "",
    id: 0,
    nome: "",


  }];

  mostraNavbar = true;
  mostraNavbar2 = false;
  ngOnInit() {





    const token = localStorage.getItem('token');
    this.idFilm = this.route.snapshot.params['id'];


    /* Inizialmente ho allegato il token alla rotta alla fine l'ho rimosso perchè il token lo prende dal local storage per qualsiasi cosa
    
    if (localStorage.getItem('token')) {
      // Aggiungi il token come parametro nella rotta attuale
      this.router.navigate(['film', this.idFilm], { queryParams: { token } });

    }
    else if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } */



    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user);
    }
    else {
      this.prova();
      //alert("per vedere il film devi registrarti");
      //this.router.navigate(['login'])
      this.mostraNavbar = false;
      this.mostraNavbar2 = true;
      this.pulsanteAcquista = false;
    }











    /* this.idFilm = this.route.snapshot.params['id'];
    console.log(this.idFilm);






    if (localStorage.getItem('token')) {
      this.router.navigate([[`/${this.idFilm}`], localStorage.getItem('token')]);
    } */

    this.getMovie(this.idFilm)
    this.getVideo(this.idFilm)
    this.getMovieCast(this.idFilm)
    this.getDirectorCast(this.idFilm)
    this.getMovieSimilarData(this.idFilm)
    this.playButton();



    // Recupera l'array dal localStorage
    this.storedArray = localStorage.getItem('userData');
    console.log(this.storedArray)

    // Verifica se l'array è presente nel localStorage
    if (this.storedArray) {
      // Converte l'array dalla stringa JSON al formato array
      const parsedArray = JSON.parse(this.storedArray);
      console.log(parsedArray)

      // Accedi ai campi dell'array
      this.iduser = parsedArray.id;
      this.iduser = parseInt(this.iduser, 10)
      console.log(this.iduser)
    }





    this.titoloFilm = this.service.getMovieDetails(this.idFilm).subscribe((item) => {



      this.titoloFilm = item.title;
      this.copertinaFilm = item.poster_path;


      console.log(this.titoloFilm);


      this.filmacquistati = { idfilm: this.idFilm, titolo: this.titoloFilm, copertina: this.copertinaFilm, userId: this.iduser }
    })







    this.scrollToTop();
    this.loadFilmDetails();





  }


  loadFilmDetails() {

    setTimeout(() => {

      this.pageReady = true;
    }, 1300);
  }


  scrollToTop() {
    window.scrollTo(0, 0); // Scorrere la pagina fino all'inizio
  }



  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result)
      this.getMovieDetailResult = result;
      console.log(this.getMovieDetailResult)





    })

  }






  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result);
      this.getMovieVideoResult = result.results;

      //.some verifico se l'array rispetta determinate condizioni
      this.mostraPulsante = this.getMovieVideoResult.some((item: any) => {
        return (
          item.type === 'Trailer' &&
          (item.name === 'Official Trailer' ||
            item.name === 'Official Trailer [Subtitled]' ||
            item.name === 'Teaser Trailer')
        );
      });

      result.results.forEach((item: any) => {
        if (item.type === 'Trailer' && item.name === 'Official Trailer' || item.name == "Official Trailer [Subtitled]" || item.name == "Teaser Trailer") {
          this.getMovieVideoResult = item.key.toString();
          this.parteFinaleLinkVideo = `https://www.youtube.com/embed/${this.getMovieVideoResult}`;
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.parteFinaleLinkVideo);
        }
      });
    });
  }







  /* getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result)
      result.results.forEach((item: any) => {
        if (item.type == 'Trailer' && item.name == 'Official Trailer' || item.name == "Official Trailer [Subtitled]" || item.name == "Teaser Trailer") {
          this.getMovieVideoResult = item.key.toString();

          console.log(this.getMovieVideoResult)

          this.parteFinaleLinkVideo = `https://www.youtube.com/embed/${this.getMovieVideoResult}`;


          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.parteFinaleLinkVideo)

        }
      });

    });

  } */





  getMovieCast(id: any) {
    this.service.getMovieCastdata(id).subscribe((result) => {
      result.cast = result.cast.slice(0, 10);
      console.log(result.cast);


      this.getMovieCastResult = result.cast.filter((item: any) => item.profile_path !== null);
    })
  }

  getDirectorCast(id: any) {
    this.service.getMovieCastdata(id).subscribe((result) => {


      console.log(result.crew);



      this.getDirectorResult = result.crew.filter((item: any) => item.profile_path !== null);
    })
  }


  getMovieSimilarData(id: any) {
    this.service.getMovieSimilar(id).subscribe((result) => {
      console.log(result);

      this.getSimilarResult = result.results;
    })
  }


  reloadPage(y: any): void {
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/film', y]);
    });
  }




  /* procedo all'acquisto*/









  acquista() {



    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Vuoi procedere con l acquisto?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, conferma',
      cancelButtonText: 'No, annulla',

    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: 'Acquisto completato"',
          text: 'Il film è stato aggiunto nella tua raccolta',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })


        console.log(headers)
        this.http.post<any>("http://localhost:3000/films-acquistati", this.filmacquistati, { headers }).subscribe(res => {

          /* setTimeout(() => {
            location.reload();

          }, 1250) */

          // this.reloadPage(this.idFilm);

          this.playButton(); //in questo modo NON faccio riavviare la pagina ma aggiorno solo il button del component

          /* this.router.navigate(['login']); */
        }, err => {
          alert("qualcosa è andro storto");


        })

      }
      else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: 'Ordine annullato!',

          icon: 'error',
          showConfirmButton: false,
          timer: 1200
        }
        )
      }
    })
  }


  playButton() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    console.log(headers)
    this.http.get<any>("http://localhost:3000/films-acquistati", { headers }).subscribe(res => {
      // alert("dati ricevuti con u con successo");
      console.log(res);



      res.forEach((item: any) => {
        if (item.idfilm === this.idFilm && item.userId === this.iduser) {
          this.pulsantePlay = true;
          this.pulsanteAcquista = false;
        }





      })


    }, err => {
      //alert("qualcosa è andro storto");


    })
  }





  playFilm() {
    Swal.fire({
      title: `${this.titoloFilm}`,
      html:
        `<iframe width="400" height="315" src="https://www.youtube.com/embed/bUcG7vd_7aQ?autoplay=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      showCloseButton: true,
      showConfirmButton: false,




    })
  }


  prova() {
    setTimeout(() => {
      Swal.fire({
        title: "Guarda tutto ciò che vuoi.",
        showCancelButton: true,
        confirmButtonText: 'ABBONATI ORA',
        cancelButtonText: 'ACCEDI',

      }).then((result) => {
        // Verifica se il pulsante di conferma è stato premuto
        if (result.isConfirmed) {
          // Esegui la navigazione qui
          this.router.navigate(['/signup']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // L'utente ha premuto il pulsante di annullamento (Login)
          this.router.navigate(['/login']);
        }
      });
    }, 4000);
  }


}
