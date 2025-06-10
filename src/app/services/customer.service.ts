// src/app/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trainer } from '../models/Trainer';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly api = `${environment.apiBase}/api/customer`;

  constructor(private http: HttpClient) {}

  getUpcomingBookings(): Observable<any[]> {
  return this.http.get<any>(`${this.api}/dashboard`, { withCredentials: true }).pipe(
    map(res => res.data.upcoming_bookings || []) //forza array vuoto se null/undefined
  );
}

getPastBookings(): Observable<any[]> {
  return this.http.get<any>(`${this.api}/dashboard`, { withCredentials: true }).pipe(
    map(res => res.data.past_bookings || [])
  );
}

  getTrainers(): Observable<Trainer[]> {
  return this.http.get<{ status: string; data: Trainer[] }>(
    `${this.api}/trainers`,
    { withCredentials: true }
  ).pipe(
    map(res => res.data)
  );
}

setTrainer(trainerId: number): Observable<any> {
  return this.http.post(`${this.api}/set_trainer`, {
    trainer_id: trainerId
  }, { withCredentials: true });
}



  getAvailableSlots(trainerId: number, date?: string): Observable<any[]> {
    const query = date ? `?trainer_id=${trainerId}&date=${date}` : `?trainer_id=${trainerId}`;
    return this.http.get<any>(`${this.api}/slots${query}`, { withCredentials: true }).pipe(
      map(res => res.data)
    );
  }

  bookSlot(slotId: number): Observable<any> {
    return this.http.post(`${this.api}/book`, { slot_id: slotId }, { withCredentials: true });
  }

  rateTrainer(trainerId: number, rating: number, review?: string): Observable<any> {
    return this.http.post(`${this.api}/rate`, { trainer_id: trainerId, rating, review }, { withCredentials: true });
  }

  getCustomerInfo(): Observable<any> {
  return this.http.get<any>(`${this.api}/dashboard`, { withCredentials: true }).pipe(
    map(res => res.data.customer_info)
  );
}

}
