import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _UsuarioService: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {}
  async canActivate() {
    const hasSession = await this.store
      .select('session_data')
      .pipe(first())
      .toPromise();

    if (!hasSession.token) {
      this.router.navigateByUrl('/authentication');
      return false;
    }
    return true;
  }
}
