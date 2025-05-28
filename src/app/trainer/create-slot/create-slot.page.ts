import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainerService } from '../../services/trainer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonInput, IonButton, IonLabel, IonItem, IonDatetime,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-create-slot',
  standalone: true,
  templateUrl: './create-slot.page.html',
  styleUrls: ['./create-slot.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonInput, IonButton, IonLabel, IonItem, IonDatetime,
    FooterComponent
  ]
})
export class CreateSlotPage {
  slotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.slotForm = this.fb.group({
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      max_clients: [1, [Validators.required, Validators.min(1)]]
    });

  }



  async creaSlot() {
    if (this.slotForm.invalid) return;

    const { date, start_time, end_time, max_clients } = this.slotForm.value;

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Swal.fire({
        icon: 'warning',
        title: 'Data non valida',
        text: 'La data selezionata deve essere oggi o successiva',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
      return;
    }

    const formattedStart = `${date.substring(0, 10)}T${start_time.substring(11, 16)}:00`;
    const formattedEnd = `${date.substring(0, 10)}T${end_time.substring(11, 16)}:00`;

    const start = new Date(formattedStart);
    const end = new Date(formattedEnd);

    if (start >= end) {
      Swal.fire({
        icon: 'warning',
        title: 'Orari non validi',
        text: 'L\'ora di inizio deve essere precedente a quella di fine',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
      return;
    }

    const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    if (diffMinutes < 30) {
      Swal.fire({
        icon: 'warning',
        title: 'Durata insufficiente',
        text: 'Lo slot deve durare almeno 30 minuti',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
      return;
    }

    const payload = {
      start_time: formattedStart,
      end_time: formattedEnd,
      max_clients
    };

    await this.loadingService.show('Creazione dello slot in corso...');

    this.trainerService.createSlot(payload).subscribe({
      next: () => {
        this.loadingService.hide();
        Swal.fire({
          icon: 'success',
          title: 'Successo',
          text: 'Slot creato con successo',
          confirmButtonText: 'OK',
          heightAuto: false,
        });
        this.router.navigate(['/trainer/dashboard']);
      },
      error: (err) => {
        this.loadingService.hide();
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: err.error?.message || 'C\'è stato un errore nella creazione dello slot',
          confirmButtonText: 'OK',
          heightAuto: false,
        });
      }
    });
  }




}
