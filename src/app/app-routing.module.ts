import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { LogoutGuard } from './core/guards/logout.guard';
import { LoginGuardGuard } from './core/guards/login-guard.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/authentication/login-1', pathMatch: 'full' },
  {
    path: '',
    redirectTo: '/authentication/login-1',
    pathMatch: 'full',
  },
  {
    path: '',
    // canActivate: [LoginGuardGuard],
    component: CommonLayoutComponent,
    children: CommonLayout_ROUTES,
  },
  {
    path: '',
    // canActivate: [LogoutGuard],
    component: FullLayoutComponent,
    children: FullLayout_ROUTES,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
