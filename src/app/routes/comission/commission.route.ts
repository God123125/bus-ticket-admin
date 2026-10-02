import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/commission-list/commission-list.component').then(
        (c) => c.CommissionListComponent,
      ),
  },
];
