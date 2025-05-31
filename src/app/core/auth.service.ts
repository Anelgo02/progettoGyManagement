import { BehaviorSubject, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { RegistrationData } from "../models/RegistrationData";
import { environment } from "../../environments/environment";



@Injectable({ providedIn: 'root' })
export class AuthService {

  /** userSubject inizializzato vuoto */
  private userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable(); // solo readonly esternamente

  private readonly apiUrl = `${environment.apiBase}/api`;


  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('user');
    if (saved) {
      this.userSubject.next(JSON.parse(saved));
    }
  }

  /** Getter rapido per UID 
  get uid(): number|null {
    return this.userSubject.value?.id ?? null;
  }*/

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { withCredentials: true }).pipe(
      tap((res: any) => {
        if (res.status === 'success') {
          this.userSubject.next(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.userSubject.next(null);
        localStorage.removeItem('user');
      })
    );
  }

  getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

register(data : RegistrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true });
  }


  
}
