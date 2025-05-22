import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // es. 'customer'
    const user = this.auth.getUser(); // dal localStorage

    // 🔒 Controllo se loggato
    if (!user) {
      this.router.navigate(['/login']);
      Swal.fire({
        title: 'Sessione scaduta',
        text: 'Effettua nuovamente il login',
        icon: 'warning',
        heightAuto: false
      });
      return false;
    }

    // 🔐 Controllo ruolo
    if (expectedRole && user.role?.toLowerCase() !== expectedRole.toLowerCase()) {
      this.router.navigate(['/login']);
      Swal.fire({
        title: 'Accesso negato',
        text: 'Non hai i permessi per accedere a questa pagina',
        icon: 'error',
        heightAuto: false
      });
      return false;
    }

    return true;
  }
}
