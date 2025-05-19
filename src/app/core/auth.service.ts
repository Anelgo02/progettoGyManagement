import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../models/user';



@Injectable({ providedIn: 'root' })
export class AuthService {

  /** ⤵️  stato utente: null finché non “logghi” */
  private currentUser$ = new BehaviorSubject<User | null>(null);


  constructor(private http: HttpClient) {}
  /** ←  hard-coded solo per i test 
  readonly uid = 'u123';*/

  // --- API pubblica ------------------------------------------------------

  /** osservabile che puoi usare con async pipe per nascondere pulsanti, ecc. */
  readonly user$: Observable<User | null> = this.currentUser$.asObservable();

  /** UID rapido (getter): utile nei service */
  get uid(): string {
    return this.currentUser$.value?.uid ?? '';
  }

  
  login(email: string, password: string): Observable<boolean> {
    
    return this.http.get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`).pipe(
      map(users => {
        const found = users[0];
        this.currentUser$.next(found ?? null);
        return !!found;
      })
    );
  }

  /** Simula un logout */
  logout(): void {
    this.currentUser$.next(null);
  }
}
