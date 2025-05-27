import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://172.18.0.2:5000⁠/api/admin';

  constructor(private http: HttpClient) {}

  getAllTrainers() {
    return this.http.get<any>(`${this.baseUrl}/trainers`, { withCredentials: true });
  }

  getAllCustomers() {
    return this.http.get<any>(`${this.baseUrl}/customers`, { withCredentials: true });
  }
}
