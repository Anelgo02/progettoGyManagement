import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/auth.service';
import { CommonModule } from '@angular/common';
import { IonText, IonIcon, IonLabel, IonContent, IonButton, IonInput, IonItem, IonRadio, IonRadioGroup } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register-page',
  templateUrl: './registration-page.page.html',
  styleUrls: ['./registration-page.page.scss'],
  standalone: true,
  imports: [IonRadio, IonItem, IonButton, IonContent, IonLabel, IonIcon, IonText, 
    FormsModule,
    RouterModule,
    CommonModule, IonInput, IonRadioGroup 
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
  specialization: string = '';

  showPassword = false;
  showConfirmPassword = false;

  isValidName = true;
  isValidSurname = true;
  isValidPassword: boolean = true;
  isValidEmail: boolean = true;
  isValidPhone = true;
  isValidUsername = true;
  isPasswordMatch = true;

  selectedRole: 'customer' | 'trainer' = 'customer'; // valore di default




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

  const userData: any = {
    username: this.username.trim(),
    password: this.password,
    email: this.email.trim(),
    full_name: `${this.name.trim()} ${this.surname.trim()}`,
    phone: this.phone.trim(),
    role: this.selectedRole
  };

  if (this.selectedRole === 'trainer' && !this.specialization.trim()) {
    Swal.fire({
      title: 'Errore',
      text: 'La specializzazione è obbligatoria per i trainer.',
      icon: 'error',
      heightAuto: false
    });
    return;
  }

  if (this.selectedRole === 'trainer') {
    userData.specialization = this.specialization.trim();
  }

  this.auth.register(userData).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        // Login automatico dopo registrazione
        this.auth.login(userData.username, userData.password).subscribe({
          next: (loginRes) => {
            if (loginRes.status === 'success') {
              Swal.fire({
                title: 'Benvenuto!',
                text: 'Registrazione e login effettuati con successo!',
                icon: 'success',
                heightAuto: false
              }).then(() => {
                if (this.selectedRole === 'trainer') {
                  this.router.navigate(['/trainer-dashboard']);
                } else {
                  this.router.navigate(['/customer/dashboard']);
                }
              });
            } else {
              Swal.fire({
                title: 'Errore',
                text: 'Login automatico fallito. Effettua il login manualmente.',
                icon: 'warning',
                heightAuto: false
              }).then(() => this.router.navigate(['/login']));
            }
          },
          error: () => {
            Swal.fire({
              title: 'Errore',
              text: 'Login automatico fallito. Effettua il login manualmente.',
              icon: 'warning',
              heightAuto: false
            }).then(() => this.router.navigate(['/login']));
          }
        });
      } else {
        Swal.fire({
          title: 'Errore',
          text: res.message || 'Registrazione fallita',
          icon: 'error',
          heightAuto: false
        });
      }
    },
    error: (err) => {
      Swal.fire({
        title: 'Errore',
        text: err.error?.message || 'Errore durante la registrazione',
        icon: 'error',
        heightAuto: false
      });
    }
  });
}

}

