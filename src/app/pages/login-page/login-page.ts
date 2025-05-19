import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
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
  
  constructor(private auth: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {

    this.auth.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
        title: 'Attenzione',
        text: 'Email e password errate',
        icon: 'warning',
        heightAuto: false
      });
      }
    });
  
      
    

  
}

}
