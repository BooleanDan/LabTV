import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {


  user: any = [{
    cognome: "",
    email: "",
    id: 0,
    nome: "",


  }];

  filmuser: any;
  visibile: boolean = true;
  filmdiv: boolean = false;

  constructor(private authDataService: AuthDataService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  /* this.userData = this.authDataService.getData();
  console.log(this.userData); */


  ngOnInit(): void {
    /*  this.authDataService.data$.subscribe(data => {
       this.userData = data;
     }); */


    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user);
    }
    else {
      console.log("dat not found");
      this.router.navigate(['login'])
    }

    this.ricevifilm();


  }

  rimuoviFilm(id: number) {
    // Rimuovi l'elemento dall'array filmuser quando ricevi l'evento di rimozione
    this.filmuser = this.filmuser.filter((item: any) => item.id !== id);



  }

  aggiornaAccount(isLastFilmRemoved: boolean) {
    if (isLastFilmRemoved) {
      this.ricevifilm();


    }
  }


  logout() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Sei sicuro?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, voglio uscire',
      cancelButtonText: 'No, voglio rimanere qui',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({

          icon: 'success',
          title: 'Sto effetuando il logout...',

          showConfirmButton: false,


          timer: 2000



        })
        Swal.showLoading();
        setTimeout(() => {

          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          this.router.navigate(['/login']);

        }, 2000)

      }
    })


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
        this.visibile = false;
        this.filmdiv = true;
      }
      else {
        this.visibile = true;
        this.filmdiv = false;

      }





      /* this.router.navigate(['login']); */
    }, err => {

      this.router.navigate(['login'])

    })
  }





}







