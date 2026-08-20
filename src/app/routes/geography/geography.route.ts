import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/geography-list/geography-list.component').then(
        (c) => c.GeographyListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/geography-form/geography-form.component').then(
        (c) => c.GeographyFormComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/geography-form/geography-form.component').then(
        (c) => c.GeographyFormComponent,
      ),
  },
];
