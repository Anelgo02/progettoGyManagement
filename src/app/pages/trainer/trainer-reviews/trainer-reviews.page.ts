import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../../../services/trainer.service';
import { CommonModule } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../../components/footer/footer.component";
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonSkeletonText,IonMenuButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-trainer-reviews',
  templateUrl: './trainer-reviews.page.html',
  styleUrls: ['./trainer-reviews.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonSkeletonText, CommonModule, FooterComponent,IonMenuButton
  ]
})
export class TrainerReviewsPage {
  reviews$!: Observable<any[]>;

  constructor(private trainerService: TrainerService, private router: Router) {}

  ionViewWillEnter() {
    this.reviews$ = this.trainerService.getDashboard().pipe(
      map(res => res.data?.ratings || []),
      catchError(err => {
        console.error('Errore nel recupero delle recensioni', err);
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Impossibile recuperare le recensioni.',
          confirmButtonText: 'OK',
          heightAuto: false,
        });
        return of([]);
      })
    );
  }
}
