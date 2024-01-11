import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '../../core/guards/logout.guard';

export const FullLayout_ROUTES: Routes = [
  {
    path: 'authentication',
    // canActivate: [LogoutGuard],
    children: [
      { path: '', redirectTo: '/authentication/login-1', pathMatch: 'full' },
      {
        path: 'login-1',
        loadChildren: () =>
          import('../../authentication/login/login.module').then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: 'sign-up-1',
        loadChildren: () =>
          import('../../authentication/sign-up-1/sign-up-1.module').then(
            (m) => m.SignUpModule
          ),
      },
      {
        path: 'forget-pass',
        loadChildren: () =>
          import('../../authentication/forget-pass/forget-pass.module').then(
            (m) => m.ForgetPassPageModule
          ),
      },
    ],
  },
];
