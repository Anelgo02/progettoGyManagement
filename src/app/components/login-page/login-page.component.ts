import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterModule,
    HeaderComponent
],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
  if (!this.email || !this.password) {
    setTimeout(() => {
      Swal.fire({
        title: 'Attenzione',
        text: 'Email e password sono obbligatorie',
        icon: 'warning',
        heightAuto: false
      });
    }, 10);
    return;
  }

  setTimeout(() => {
    Swal.fire({
      title: 'Login effettuato',
      text: `Benvenuto, ${this.email}`,
      icon: 'success',
      heightAuto: false
    });
  }, 10);
}

}
