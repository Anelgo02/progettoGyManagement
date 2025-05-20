
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './userprofile-page.page.html',
  styleUrls: ['./userprofile-page.page.scss'],
})
export class ProfilePage {
  user = {
    nome: 'Mario',
    cognome: 'Rossi',
    username: 'mrossi',
    ruolo: 'cliente', // può essere 'cliente', 'admin', 'personal trainer'
    foto: ''
  };

  ruoliDisponibili = ['cliente', 'admin', 'personal trainer'];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvaModifiche() {
    console.log('Profilo aggiornato:', this.user);
    // In un'app reale, qui chiameresti un servizio per aggiornare il profilo nel backend
  }
}

