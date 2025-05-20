
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-page',
  templateUrl: './userprofile-page.page.html',
  styleUrls: ['./userprofile-page.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class ProfilePage {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  userData = {
    nome: 'Mario',
    cognome: 'Rossi',
    username: 'mario.rossi',
    telefono: '1234567890',
    password: 'Password@123',
    photo: '',
    ruolo: 'cliente' // oppure 'personal trainer'
  };

  confirmPassword: string = this.userData.password;
  showPassword: boolean = false;

  errore: boolean = false;
  messaggioErrore: string = '';

  apriFilePicker() {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userData.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  salvaModifiche() {
    // Validazione telefono
    if (!/^\d+$/.test(this.userData.telefono)) {
      this.mostraErrore('modifica non valida');
      return;
    }

    // Validazione password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const passwordValida = passwordRegex.test(this.userData.password);
    const confermaValida = passwordRegex.test(this.confirmPassword);

    if (!passwordValida || !confermaValida) {
      this.mostraErrore('modifica non valida');
      return;
    }

    // Validazione corrispondenza password
    if (this.userData.password !== this.confirmPassword) {
      this.mostraErrore('le password non corrispondono');
      return;
    }

    // Nessun errore: mostra popup conferma
    this.errore = false;
    this.messaggioErrore = '';
    Swal.fire({
      icon: 'success',
      title: 'Salvato',
      text: 'I dati sono stati memorizzati correttamente',
      timer: 2000,
      showConfirmButton: false,
      heightAuto: false
    });
  }

  mostraErrore(msg: string) {
    this.errore = true;
    this.messaggioErrore = msg;
  }
}
