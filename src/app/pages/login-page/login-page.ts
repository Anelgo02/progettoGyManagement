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
  username: string = '';
  password: string = '';
  showPassword = false;
  
  constructor(private auth: AuthService, private router: Router) {
    // Controlla se l'utente è già loggato
    this.auth.user$.subscribe(user => {
      if (user) {
        const ruolo = user.role?.toLowerCase();
        switch (ruolo) {
          case 'customer':
            this.router.navigate(['/customer/dashboard']);
            break;
          case 'trainer':
            this.router.navigate(['/trainer/dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          default:
            Swal.fire({
              title: 'Errore',
              text: `Ruolo non riconosciuto: ${ruolo}`,
              icon: 'error',
              heightAuto: false
            });
        }
      }
    });
  }

  ngOnInit() {
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
  this.auth.login(this.username, this.password).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        const ruolo = res.data?.role?.toLowerCase();

        switch (ruolo) {
          case 'customer':
            this.router.navigate(['/customer/dashboard']);
            break;
          case 'trainer':
            this.router.navigate(['/trainer/dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          default:
            Swal.fire({
              title: 'Errore',
              text: `Ruolo non riconosciuto: ${ruolo}`,
              icon: 'error',
              heightAuto: false
            });
        }
      } else {
        Swal.fire({
          title: 'Attenzione',
          text: res.message || 'Credenziali non valide',
          icon: 'warning',
          heightAuto: false
        });
      }
    },
    error: (err) => {
      Swal.fire({
        title: 'Errore',
        text: err.error?.message || 'Errore durante il login',
        icon: 'error',
        heightAuto: false
      });
    }
  });
}



    

  
}

