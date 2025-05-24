import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private readonly baseUrl = 'http://localhost:5000/api/trainer';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`, {
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
