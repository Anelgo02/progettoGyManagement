import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  templateUrl: './registration-page.page.html',
  styleUrls: ['./registration-page.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterModule,
    CommonModule
  ]
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      Swal.fire({
        title: 'Errore',
        text: 'Compila tutti i campi',
        icon: 'error',
        heightAuto: false
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Errore',
        text: 'Le password non coincidono',
        icon: 'error',
        heightAuto: false
      });
      return;
    }

    //this.auth.register(this.email, this.password).subscribe(success => {
     /* if (success) {
        Swal.fire({
          title: 'Registrazione completata',
          text: 'Ora puoi accedere con le tue credenziali',
          icon: 'success',
          heightAuto: false
        }).then(() => this.router.navigate(['/login']));
      } else {
        Swal.fire({
          title: 'Errore',
          text: 'Registrazione fallita',
          icon: 'error',
          heightAuto: false
        });
      }
    });*/
  }
}

