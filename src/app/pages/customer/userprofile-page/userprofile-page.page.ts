import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonInput } from '@ionic/angular/standalone';

import {
  IonHeader, IonItem, IonContent, IonToolbar, IonIcon,  IonTitle, IonLabel, IonButton,
   IonButtons, IonMenuButton,
} from "@ionic/angular/standalone";

import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-profile-page',
  templateUrl: './userprofile-page.page.html',
  styleUrls: ['./userprofile-page.page.scss'],
  standalone: true,
  imports: [IonInput, CommonModule,  IonMenuButton, IonButtons,  IonIcon, IonToolbar,
    IonContent, IonItem, IonHeader, IonTitle, IonLabel, IonButton, 
    CommonModule, FooterComponent],
})
export class ProfilePage implements OnInit {

  userData: any = {};
  showPassword = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);

      this.userData = {
        nome: user.full_name?.split(' ')[0] || '',
        cognome: user.full_name?.split(' ')[1] || '',
        username: user.username,
        email: user.email,

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


  

  tornaIndietro() {
    if (this.userData.ruolo === 'trainer') {
      this.router.navigate(['/trainer/dashboard']);
    }
    else if (this.userData.ruolo === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
    else if (this.userData.ruolo === 'customer') {
      this.router.navigate(['/customer/dashboard']);
    }
  }

}
