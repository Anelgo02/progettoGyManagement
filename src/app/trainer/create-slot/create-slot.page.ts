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

@Component({
  selector: 'app-create-slot',
  standalone: true,
  templateUrl: './create-slot.page.html',
  styleUrls: ['./create-slot.page.scss'],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonInput, IonButton, IonLabel, IonItem, IonDatetime
  ]
})
export class CreateSlotPage {
  slotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private router: Router
  ) {
    this.slotForm = this.fb.group({
  date: ['', Validators.required],
  start_time: ['', Validators.required],
  end_time: ['', Validators.required],
  max_clients: [1, [Validators.required, Validators.min(1)]]
});

  }

  creaSlot() {
  if (this.slotForm.invalid) return;

  const { date, start_time, end_time, max_clients } = this.slotForm.value;

  // Combina data + ora in formato completo ISO
  const formattedStart = `${date.substring(0, 10)}T${start_time.substring(11, 16)}:00`;
  const formattedEnd = `${date.substring(0, 10)}T${end_time.substring(11, 16)}:00`;

  const payload = {
    start_time: formattedStart,
    end_time: formattedEnd,
    max_clients
  };

  this.trainerService.createSlot(payload).subscribe({
    next: () => {
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
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'C\'è stato un errore nella creazione dello slot',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
    }
  });
}

}
