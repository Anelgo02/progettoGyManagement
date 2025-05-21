
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {
  IonMenu, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton, IonFooter,
  IonTabBar, IonTabButton, IonDatetime, IonCard
} from '@ionic/angular/standalone';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.page.html',
  styleUrls: ['./booking-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonMenu, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton, IonFooter,
    IonTabBar, IonTabButton, IonDatetime, IonCard
  ]
})
export class BookingPage {
  selectedDate: string = '';
  availableSlots: { start: string; end: string }[] = [];
  errorMessage: string = '';
  userBookings: { [date: string]: boolean } = {};

  constructor(
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }

  onDateChange() {
    this.availableSlots = [];
    this.errorMessage = '';

    const selected = new Date(this.selectedDate);
    const today = new Date();
    const diff = (selected.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24);

    if (diff < 0 || diff > 7) {
      this.errorMessage = 'Seleziona una data valida (oggi o entro 7 giorni).';
      return;
    }

    const selectedDateString = selected.toISOString().split('T')[0];

    if (this.userBookings[selectedDateString]) {
      this.errorMessage = 'Hai già un allenamento prenotato in questo giorno.';
      return;
    }

    // Tutti gli slot possibili
    const allSlots = [
      { start: '08:00', end: '10:00' },
      { start: '12:00', end: '14:00' },
      { start: '18:00', end: '20:00' }
    ];

    if (diff === 0) {
      // Giorno corrente → filtra solo gli slot futuri rispetto all’orario attuale
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      this.availableSlots = allSlots.filter(slot => {
        const [hour, minute] = slot.start.split(':').map(Number);
        const slotMinutes = hour * 60 + minute;
        return slotMinutes > nowMinutes;
      });

      if (this.availableSlots.length === 0) {
        this.errorMessage = 'Nessuno slot disponibile per oggi.';
      }
    } else {
      this.availableSlots = allSlots;
    }
  }

  bookSlot(slot: { start: string; end: string }) {
    const selectedDateString = new Date(this.selectedDate).toISOString().split('T')[0];

    if (this.userBookings[selectedDateString]) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Hai già un allenamento prenotato in questo giorno.',
        heightAuto: false
      });
      return;
    }

    // Qui dovresti chiamare il backend per salvare effettivamente la prenotazione

    // Simulazione di prenotazione riuscita
    Swal.fire({
      icon: 'success',
      title: 'Allenamento prenotato',
      text: `Slot: ${slot.start} - ${slot.end}`,
      heightAuto: false
    });

    // Registra internamente la prenotazione del giorno
    const dateKey = new Date(this.selectedDate).toISOString().split('T')[0];
    this.userBookings[dateKey] = true;

    // Pulisce gli slot per evitare doppie prenotazioni
    this.availableSlots = [];
  }
}
