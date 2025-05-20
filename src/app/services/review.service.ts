import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 private apiUrl = 'http://localhost:5000/api/customer/rate';

  constructor(private http: HttpClient) {}

  sendRating(trainerId: number, rating: number, review: string = '') {
    const body = {
      trainer_id: trainerId,
      rating: rating,
      review: review
    };

    return this.http.post(this.apiUrl, body, { withCredentials: true });

  }
}
