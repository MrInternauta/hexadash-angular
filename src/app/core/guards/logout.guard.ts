import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConstantsHelper } from '../constants/constants.helper';
import { StorageService } from '../services';
import { AuthService } from '../../authentication/services/auth.service';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  constructor(
    public _UsuarioService: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const sessionStorage = await this.store
        .select('session_data')
        .pipe(first())
        .toPromise();

      if (!sessionStorage) {
        return true;
      }
      this.router.navigateByUrl('/authentication');

      return false;
    } catch (error) {
      return false;
    }
  }
}
