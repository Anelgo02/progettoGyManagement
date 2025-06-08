import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly api = `${environment.apiBase}/api/customer`;
  private unreadCountSubject = new BehaviorSubject<number>(0);

  // Observable per sottoscrizione da sidebar
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    return this.http.get(`${this.api}/notifications`, { withCredentials: true }).pipe(
      tap((res: any) => {
        const count = res.data.filter((n: any) => !n.is_read).length;
        this.unreadCountSubject.next(count); // aggiorna automaticamente
      })
    );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.post(`${this.api}/notifications/${id}/read`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Decremento ottimistico locale (facoltativo)
        const current = this.unreadCountSubject.value;
        this.unreadCountSubject.next(Math.max(current - 1, 0));
      })
    );
  }
}
