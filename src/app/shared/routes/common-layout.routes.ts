import { Routes } from '@angular/router';
import { ComponentsComponent } from '../../components/components.component';
import { LoginGuardGuard } from '../../core/guards/login-guard.guard';

export const CommonLayout_ROUTES: Routes = [
  //Dashboard
  {
    canActivate: [LoginGuardGuard],
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  // Charts
  {
    canActivate: [LoginGuardGuard],
    path: 'changelog',
    children: [
      {
        path: '',
        redirectTo: '/changelog/changelog',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../changelog/changelog.module').then(
            (m) => m.ChangelogModule
          ),
      },
    ],
  },

  //Apps
  {
    canActivate: [LoginGuardGuard],
    path: 'apps',
    data: {
      title: 'Apps',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../apps/apps.module').then((m) => m.AppsModule),
      },
    ],
  },

  //Component
  {
    canActivate: [LoginGuardGuard],
    path: 'demo',
    component: ComponentsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
    ],
    data: {
      title: 'Components ',
    },
  },

  // Charts
  {
    canActivate: [LoginGuardGuard],
    path: 'features',
    data: {
      title: 'features',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../features/features.module').then(
            (m) => m.FeaturesModule
          ),
      },
    ],
  },

  //Pages
  {
    canActivate: [LoginGuardGuard],
    path: 'pages',
    data: {
      title: 'Pages ',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];
