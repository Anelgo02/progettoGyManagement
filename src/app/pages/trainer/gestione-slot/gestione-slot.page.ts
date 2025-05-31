import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButton, IonRow, IonCol, IonGrid,
  IonFab, IonFabButton, IonIcon,
  IonSkeletonText
} from '@ionic/angular/standalone';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TrainingSlot } from '../../../models/TrainingSlot';
import { TrainerService } from '../../../services/trainer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestione-slot',
  templateUrl: './gestione-slot.page.html',
  styleUrls: ['./gestione-slot.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonButton,
    IonSkeletonText,
    FooterComponent
  ]
})
export class GestioneSlotPage {

  slots$: Observable<TrainingSlot[]>;
  trainerSpecialization: string = '';

  constructor(
    private slotService: TrainerService,
    private router: Router
  ) {
    this.slots$ = this.slotService.getDashboard().pipe(
      map(res => {
        return res.data?.upcoming_sessions || [];
      })
    );
  }

deleteSlot(id: number) {
  Swal.fire({
    title: 'Sei sicuro?',
    text: 'Lo slot verrà eliminato definitivamente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sì, elimina',
    cancelButtonText: 'Annulla',
    heightAuto: false
  }).then((result) => {
    if (result.isConfirmed) {
      this.slotService.deleteSlot(id).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Slot eliminato',
          text: 'Lo slot è stato rimosso correttamente.',
          confirmButtonText: 'OK',
          heightAuto: false
        });

        // Ricarica la lista degli slot
        this.slots$ = this.slotService.getDashboard().pipe(
          map(res => {
            this.trainerSpecialization = res.data?.trainer_info?.specialization || '';
            return res.data?.upcoming_sessions || [];
          })
        );
      });
    }
  });
}

}