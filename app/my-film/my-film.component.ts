import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-my-film',
  templateUrl: './my-film.component.html',
  styleUrls: ['./my-film.component.css']
})
export class MyFilmComponent {
  @Input()
  filmuser: any[] = [];
  user: any = [{
    cognome: "",
    email: "",
    id: 0,
    nome: "",


  }];
  @Output()
  removeFilm: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  lastFilmRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();



  constructor(private authDataService: AuthDataService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }



  rimuovi(x: any) {
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
      title: 'Sei sicuro di voler rimuovere il film?',
      text: "Una volta rimosso dovrai ripetere l'acquisto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, conferma',
      cancelButtonText: 'No, annulla',

    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminato!',
          text: 'Il film è stato eliminato dalla lista degli acquisti.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000


        }

        )



        console.log(headers)
        this.http.delete<any>("http://localhost:3000/films-acquistati/" + x, { headers }).subscribe(res => {
          //alert("eliminato");
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

          /*  setTimeout(() => {
 
             location.reload();
 
 
           }, 1500) */
          this.filmuser = this.filmuser.filter(item => item.id !== x);

          this.removeFilm.emit(x);

          if (this.filmuser.length === 0) {
            this.lastFilmRemoved.emit(true);

          }







          /* this.router.navigate(['login']); */
        }, err => {
          this.router.navigate(['login'])

        })



      }
    })








  }

}
