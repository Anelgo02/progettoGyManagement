
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
  name: string = '';
  surname: string = '';
  phone: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  showPassword = false;
  showConfirmPassword = false;

  isValidName = true;
  isValidSurname = true;
  isValidPassword: boolean = true;
  isValidEmail: boolean = true;
  isValidPhone = true;
  isValidUsername = true;
  isPasswordMatch = true;

  constructor(private auth: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  validateFields(): boolean {
  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  const phoneRegex = /^\d+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  this.isValidName = nameRegex.test(this.name.trim());
  this.isValidSurname = nameRegex.test(this.surname.trim());
  this.isValidPhone = phoneRegex.test(this.phone.trim());
  this.isValidUsername = this.username.trim().length > 0;
  this.isValidPassword = passwordRegex.test(this.password);
  this.isPasswordMatch = this.password === this.confirmPassword;
  this.isValidEmail = emailRegex.test(this.email.trim());

  return !!this.email && !!this.password && !!this.confirmPassword &&
    this.isValidName && this.isValidSurname &&
    this.isValidPhone && this.isValidUsername &&
    this.isValidPassword && this.isPasswordMatch && this.isValidEmail;
}




  register() {
    if (!this.validateFields()) {
      Swal.fire({
        title: 'Errore',
        text: 'Controlla i campi evidenziati',
        icon: 'error',
        heightAuto: false
      });
      return;
    }

    // Puoi aggiungere qui la chiamata al tuo AuthService
    Swal.fire({
      title: 'Registrazione riuscita!',
      text: 'Ora puoi effettuare il login',
      icon: 'success',
      heightAuto: false
    });

    this.router.navigate(['/login']);
  }
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
