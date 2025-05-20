import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import {
  IonHeader, IonItem, IonContent, IonToolbar, IonIcon, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText,
  IonFooter, IonCardContent, IonChip, IonTabBar, IonTabButton, IonCardHeader, IonButtons, IonCardTitle, IonCardSubtitle, IonMenuButton, IonTextarea, IonDatetime
} from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.page.html',
  styleUrls: ['./review-page.page.scss'],
  standalone: true,
  imports: [
    IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader, IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar,
    IonContent, IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText, IonFooter,
    IonTextarea, IonDatetime,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [ReviewService]
})
export class ReviewPage {

  rating: number = 0;
  reviewText: string = '';
  reviewDate: string = ''; // formato ISO
  

  constructor(private reviewService: ReviewService, private auth: AuthService, private router: Router) { }

  setRating(stars: number) {
    this.rating = stars;
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isToday(dateStr: string): boolean {
    const today = new Date();
    const inputDate = new Date(dateStr);

    return (
      today.getFullYear() === inputDate.getFullYear() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getDate() === inputDate.getDate()
    );
  }

  rate_trainer() {
    if (!this.reviewDate) {
      Swal.fire({
        title: 'Errore',
        text: 'Devi inserire la data della recensione.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        heightAuto: false
      });
      return;
    }

    if (!this.isToday(this.reviewDate)) {
      Swal.fire({
        title: 'Errore',
        text: 'La data inserita deve essere quella di oggi.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        heightAuto: false
      });
      return;
    }

    if (this.rating === 0 || !this.reviewText.trim()) {
      Swal.fire({
        title: 'Errore',
        text: 'Devi assegnare una valutazione e scrivere una recensione.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        heightAuto: false
      });
      return;
    }

    const trainerId = 1;

    this.reviewService.sendRating(trainerId, this.rating, this.reviewText).subscribe({
      next: () => {
        Swal.fire({
          title: 'Pubblicazione riuscita',
          text: 'Recensione inviata con successo!',
          icon: 'success',
          confirmButtonColor: '#28a745',
          heightAuto: false
        });

        // Reset campi
        this.rating = 0;
        this.reviewText = '';
        this.reviewDate = '';
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire({
          title: 'Errore',
          text: err.error?.message || 'Errore durante l’invio della recensione',
          icon: 'error',
          confirmButtonColor: '#dc3545',
          heightAuto: false
        });
      }
    });

    
  }
  }



