import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {MenuController, IonInput } from '@ionic/angular/standalone';
import { CustomerService } from '../../services/customer.service';
import {
  IonHeader, IonItem, IonContent, IonToolbar, IonIcon, IonMenu, IonTitle, IonList, IonLabel, IonButton,
  IonFooter, IonTabBar, IonTabButton, IonButtons, IonMenuButton,
} from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './userprofile-page.page.html',
  styleUrls: ['./userprofile-page.page.scss'],
  standalone: true,
  imports: [IonInput,  CommonModule, RouterLink, IonMenuButton, IonButtons, IonTabButton, IonTabBar,  IonIcon, IonToolbar,
    IonContent, IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonFooter,
    CommonModule,],
})
export class ProfilePage implements OnInit {

  userData: any = {};
  showPassword = false;

  constructor(private router: Router, private menuCtrl : MenuController, private auth : AuthService ) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);

      this.userData = {
        nome: user.full_name?.split(' ')[0] || '',
        cognome: user.full_name?.split(' ')[1] || '',
        username: user.username,
        email: user.email,
        telefono: user.phone ?? '-', // se presente nel backend
        password: user.password ?? '********',
        ruolo: user.role
      };
    } else {
      // fallback: non loggato
      this.router.navigate(['/login']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  logout() {
    this.menuCtrl.close().then(() => {
      this.auth.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  recensisci() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/review-page']);
    }); // chiude il menu

  }

  tornaIndietro() {
    this.router.navigate(['/customer/dashboard']);
  }

 
}
