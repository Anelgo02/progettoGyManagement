import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.page.html',
  styleUrls: ['./review-page.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
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

  constructor(private reviewService: ReviewService) {}

  setRating(stars: number) {
    this.rating = stars;
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
