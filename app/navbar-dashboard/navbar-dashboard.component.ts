import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css']
})
export class NavbarDashboardComponent {

  public searchForm !: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService, private formBuilder: FormBuilder) { }
  navBackground: any;

  myParam: string = "";
  user: any;



  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      movieName: [''] // Inizializza il campo del titolo del film vuoto
    });
    // Registra il valore della ricerca nel servizio quando viene effettuata la ricerca



    /*    //ci dobbiamo ricavare il parametro token
       this.myParam = this.route.snapshot.params['token']
       //se myParam esiste imposto la chiave token nel localStorage
       if (this.myParam) {
         localStorage.setItem('token', this.myParam);
       } */


    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user);
    }
    else {
      console.log("dat not found");
    }


  }



  cerca() {
    if (localStorage.getItem('token')) {
      const searchValue = this.searchForm.get('movieName')?.value;
      console.log(searchValue);
      this.searchService.changeSearchValue(searchValue);
      this.router.navigate(['/search', localStorage.getItem('token')]);

    }
  }

  myAccount() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/myaccount', localStorage.getItem('token')]);

    }
  }


  tornaHome() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home/dashboard', localStorage.getItem('token')]);
      console.log("click")
    }
  }

  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navBackground = {
        'background-color': 'black'
      }
    } else {
      this.navBackground = {}
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



}
