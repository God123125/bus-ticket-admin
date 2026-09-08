import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/merchant-dashboard/merchant-dashboard.component').then(
        (c) => c.MerchantDashboardComponent,
      ),
  },
];
