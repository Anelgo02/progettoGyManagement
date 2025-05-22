
import { Component, OnInit } from '@angular/core';
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
export class BookingPage implements OnInit {
  selectedDate: string = '';
  availableSlots: { start: string; end: string; available_spots?: number }[] = [];
  errorMessage: string = '';
  userBookings: { [date: string]: boolean } = {};
  trainerId: number | null = null;

  constructor(
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customerService.getCustomerInfo().subscribe({
      next: (info) => {
        this.trainerId = info.trainer_id;
      },
      error: () => {
        this.errorMessage = 'Errore nel recupero del trainer associato.';
      }
    });
  }

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

    if (!this.trainerId) {
      this.errorMessage = 'Trainer non disponibile.';
      return;
    }

    this.customerService.getAvailableSlots(this.trainerId, selectedDateString).subscribe({
      next: (slots) => {
        if (slots.length === 0) {
          this.errorMessage = 'Nessuno slot disponibile per questa data.';
        } else {
          this.availableSlots = slots.map(s => ({
            start: s.start_time.substring(11, 16),
            end: s.end_time.substring(11, 16),
            available_spots: s.available_spots
          }));
        }
      },
      error: () => {
        this.errorMessage = 'Errore durante il recupero degli slot.';
      }
    });
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

    this.customerService.getAvailableSlots(this.trainerId!, selectedDateString).subscribe(slots => {
      const targetSlot = slots.find(s =>
        s.start_time.includes(slot.start) && s.end_time.includes(slot.end)
      );

      if (!targetSlot) {
        Swal.fire({ icon: 'error', title: 'Errore', text: 'Slot non più disponibile.', heightAuto: false });
        return;
      }

      this.customerService.bookSlot(targetSlot.id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Allenamento prenotato',
            text: `Slot: ${slot.start} - ${slot.end}`,
            heightAuto: false
          });

          this.userBookings[selectedDateString] = true;
          this.availableSlots = [];
        },
        error: (err) => {
          const msg = err.error?.message || 'Prenotazione fallita.';
          Swal.fire({ icon: 'error', title: 'Errore', text: msg, heightAuto: false });
        }
      });
    });
  }

  getSlotIcon(slot: any): string {
    const availability = slot.available_spots ?? 1;
    if (availability >= 2) return 'checkmark-circle-outline';
    if (availability === 1) return 'alert-circle-outline';
    return 'close-circle-outline';
  }

  getSlotColor(slot: any): string {
    const availability = slot.available_spots ?? 1;
    if (availability >= 2) return '#2dd36f';      // verde
    if (availability === 1) return '#ffc409';     // giallo
    return '#eb445a';                             // rosso
  }
}
