import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/core/loading.service';
import { IonHeader, IonToolbar, IonLabel, IonButton, IonContent, IonIcon, IonInput, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login-page',

  imports: [IonHeader,
    FormsModule,
    RouterModule, IonToolbar, IonLabel, IonButton, IonContent, CommonModule, IonInput, IonIcon, IonTitle

  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
  standalone: true,
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router, private loadingService: LoadingService) {
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

  async login() {

    await this.loadingService.show('Accesso in corso...');



    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loadingService.hide();
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
        this.loadingService.hide();
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

