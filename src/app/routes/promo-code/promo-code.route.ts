import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/promo-code-list/promo-code-list.component').then(
        (c) => c.PromoCodeListComponent,
      ),
  },
];
