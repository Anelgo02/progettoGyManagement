import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  uid:   string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  /** ⤵️  stato utente: null finché non “logghi” */
  private currentUser$ = new BehaviorSubject<User | null>(null);

  /** ←  hard-coded solo per i test */
  readonly uid = 'u123';

  // --- API pubblica ------------------------------------------------------

  /** osservabile che puoi usare con async pipe per nascondere pulsanti, ecc. */
  readonly user$: Observable<User | null> = this.currentUser$.asObservable();

  /** UID rapido (getter): utile nei service 
  get uid(): string {
    return this.currentUser$.value?.uid ?? '';
  }
*/
  /** Simula un login */
  login(email: string, password: string): void {
    // *** fake ***: in reale chiamerai il backend qui
    const demoUser: User = { uid: 'u123', email };
    this.currentUser$.next(demoUser);
  }

  /** Simula un logout */
  logout(): void {
    this.currentUser$.next(null);
  }
}
