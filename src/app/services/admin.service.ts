import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiBase}/api/admin`;

  constructor(private http: HttpClient) {}

  getAllTrainers() {
    return this.http.get<any>(`${this.baseUrl}/trainers`, { withCredentials: true });
  }

  getAllCustomers() {
    return this.http.get<any>(`${this.baseUrl}/customers`, { withCredentials: true });
  }
}
