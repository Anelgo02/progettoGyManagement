import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login-page',
 
  imports: [
    IonicModule,
    FormsModule,
    RouterModule,
  
],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
  standalone: true,
})
export class LoginPage{
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
