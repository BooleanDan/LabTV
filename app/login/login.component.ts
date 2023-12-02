import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDataService } from '../services/auth-data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authDataservice: AuthDataService) { }

  err: any;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    })


    // ...

    // Modifica la cronologia del browser per sostituire l'URL corrente con l'URL della pagina di login
    window.history.pushState(null, '', window.location.href);

    // Aggiungi un ascoltatore di eventi per catturare il tentativo di navigazione all'indietro
    window.addEventListener('popstate', () => {
      // Reimposta la cronologia del browser per tornare alla pagina di login
      window.history.pushState(null, '', window.location.href);
    });



  }

  login() {

    this.http.post<any>("http://localhost:3000/login", this.loginForm.value).
      subscribe({
        next: x => {
          console.log('The next vowel is: ', x)
          this.authDataservice.setData(x.user);
          localStorage.setItem('userData', JSON.stringify(x.user));
          Swal.fire({

            icon: 'success',
            title: 'Sto effetuando il login...',

            showConfirmButton: false,


            timer: 2900



          })
          Swal.showLoading();



          // this.router.navigate(['home/dashboard'])
          setTimeout(() => {

            this.router.navigate(['home/dashboard', x.accessToken]);

          }, 3000)
        },
        error: err => {
          console.error('qualcosa è andato storto', err)
          Swal.fire({

            icon: 'error',
            title: `${err.error}`,
            showConfirmButton: false,
            timer: 1300


          });
          this.err = err.error;
        },
        complete: () => console.log('There are no more vowels.')
      });


    /* (res => {
      const user = res.find((a: any) => {
        return email === this.loginForm.value.email && password === this.loginForm.value.password
      });
      if (user) {
        alert("login succes");
        this.loginForm.reset();
        this.router.navigate(['signup'])
      } else {
        alert(" user not found")
      }
    }, err => {
      alert("qualcosa non va") */




  }
}


