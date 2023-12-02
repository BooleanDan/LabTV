import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ],],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      profileImage: ['', Validators.required]
    })


  }

  signUp() {
    this.http.post<any>("http://localhost:3000/register", this.signupForm.value).subscribe(res => {

      this.signupForm.reset();

      Swal.fire({

        icon: 'success',
        title: 'Registrazione avvenuta con successo',

        showConfirmButton: false,


        timer: 1200



      })


      setTimeout(() => {
        this.router.navigate(['login']);
      }, 1500);
    }, err => {

      /* alert(err.error) */

      Swal.fire({
        customClass: {
          confirmButton: 'btn btn-success',

        },
        title: `Oops... <br>${err.error}`,
        icon: 'warning',
        background: 'white',

        backdrop: 'rgba(134, 134, 134, 0.208)',
        // confirmButtonColor: '#3085d6',
        showConfirmButton: false,
        timer: 1500





      });


    })
  }

}

