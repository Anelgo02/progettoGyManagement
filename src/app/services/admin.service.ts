import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiBase}/api/admin`;

  constructor(private http: HttpClient) {}

  getAllTrainers() {
    return this.http.get<any>(`${this.baseUrl}/trainers`, { withCredentials: true }).pipe(
          map(res => res.status === 'success' ? res.data : [])
        );
  }

  getAllCustomers() {
    return this.http.get<any>(`${this.baseUrl}/customers`, { withCredentials: true }).pipe(
          map(res => res.status === 'success' ? res.data : [])
        );
  }
}
