import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private readonly baseUrl = `${environment.apiBase}/api/trainer`;

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`, {
      withCredentials: true
    });
  }

  deleteSlot(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete_slot`, { slot_id: id }, {
      withCredentials: true
    });
  }

  createSlot(payload: {
    start_time: string;
    end_time: string;
    max_clients?: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/schedule`, payload, {
      withCredentials: true
    });
  }
}
