import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  login() {
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'ERRORE',
        text: 'Inserire le credenziali',
      });
    } else {
      Swal.fire({
        title: 'Accesso in corso...',
        text: 'Attendi un attimo',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        Swal.fire({
          title: 'Successo!',
          text: 'Sei loggato',
          icon: 'success',
        });
      }, 3000);
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
