import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      //Intercetta solo se è davvero un errore di autenticazione
      if (error.status === 403 && error.error?.code === 'UNAUTHORIZED') {
        auth.logout().subscribe(() => {
          Swal.fire({
            title: 'Sessione scaduta',
            text: 'Effettua nuovamente il login',
            icon: 'warning',
            heightAuto: false
          });
          router.navigate(['/login']);
        });
      }

      //  In tutti gli altri casi, propaga normalmente l’errore
      return throwError(() => error);
    })
  );
};
