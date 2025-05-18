import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Allenamento } from '../models/allenamento';
import { API_BASE } from '../../main';          // il token definito in main.ts
import { AuthService } from '../core/auth.service';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  constructor(
  private http: HttpClient,
  @Inject(API_BASE) private baseUrl: string,
  private auth: AuthService                   // ← inietta
) {}

list(): Observable<Allenamento[]> {
  const uid = this.auth.uid;                  // uid corrente
  const url = `${this.baseUrl}/allenamenti?userId=${uid}`;

  return this.http.get<Allenamento[]>(url).pipe(
    map(arr => arr.map(a => ({ ...a, data: new Date(a.data).toISOString() }))),
    shareReplay(1)
  );
}


}
