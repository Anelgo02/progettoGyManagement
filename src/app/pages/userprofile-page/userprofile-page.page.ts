
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './userprofile-page.page.html',
  styleUrls: ['./userprofile-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProfilePage {
  constructor(private router: Router) {}

  userData = {
    nome: 'Mario',
    cognome: 'Rossi',
    username: 'mario.rossi',
    telefono: '1234567890',
    email: 'user@example.com',
    password: 'Password@123',
    photo: '',
    ruolo: 'cliente'
  };

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  tornaIndietro() {
    this.router.navigate(['/home']);
  }
}
