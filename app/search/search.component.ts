import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { TmdbApiServiceService } from '../services/tmdb-api-service.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private route: ActivatedRoute, private router: Router, private service: TmdbApiServiceService, private searchService: SearchService) { }

  myParam: string = "";

  searchMovie: string = "";
  mostraDiv = false;
  mostraDivErr = false;
  mostraDiv2 = false;
  mostraDiv3 = false;

  user: any = [{
    cognome: "",
    email: "",
    id: 0,
    nome: "",


  }];


  ngOnInit(): void {

    /* //ci dobbiamo ricavare il parametro token
    this.myParam = this.route.snapshot.params['token']
    //se myParam esiste imposto la chiave token nel localStorage
    if (this.myParam) {
      localStorage.setItem('token', this.myParam);
    }
 */

    /* this.searchService.currentSearchValue.subscribe(searchValue => {
        this.searchMovie = searchValue;
        console.log(this.searchMovie);
  
        this.service.getSearchMovieApi(this.searchMovie).subscribe((result) => {
          console.log(result);
          this.searchResult = result.results;
        });
      }); */

    this.searchService.currentSearchValue.subscribe(searchValue => {
      this.searchMovie = searchValue;
      console.log(this.searchMovie);
      /* this.service.getSearchMovieApi(this.searchMovie).subscribe((result) => {
        console.log(result)
        this.searchResult = result.results;
      }) */
      this.Search(this.searchMovie);
      this.mostraDiv = true;



    })


    /*   const token = localStorage.getItem('token');
  
      if (!token) {
        // Se il token non è presente, reindirizza l'utente alla pagina di login
        this.router.navigate(['login']);
        return; // Interrompi l'esecuzione del metodo per evitare ulteriori operazioni
      }
   */


    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user);
    }
    else {

      this.router.navigate(['login'])
    }
  }


  Search(x: any) {
    console.log(x);
    this.service.getSearchMovieApi2(x).subscribe((result) => {
      console.log(result)
      this.searchResult = result.results;
      if (this.searchResult.length == 0 && this.searchMovie.length > 0) {
        this.mostraDivErr = true;
        this.mostraDiv = false;
        this.mostraDiv3 = false;

      }

      else if (this.searchResult.length == 0 && this.searchMovie.length === 0) {
        this.mostraDiv = false;
        this.mostraDiv2 = false;
        this.mostraDiv3 = false;
      }
      else {
        this.mostraDivErr = false;
        this.mostraDiv = true;
        this.mostraDiv2 = false;
        this.mostraDiv3 = true;

      }
    })
  }





  searchResult: any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    console.log(this.searchForm.value)
    this.service.getSearchMovieApi(this.searchForm.value).subscribe((result) => {
      console.log(result)
      this.searchResult = result.results;
      this.mostraDiv2 = true;
      this.mostraDiv = true;

      this.mostraDiv3 = false;





    })
  }




}
