import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/geographic-list/geographic-list.component').then(
        (c) => c.GeographicListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/geographic-form/geographic-form.component').then(
        (c) => c.GeographicFormComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/geographic-form/geographic-form.component').then(
        (c) => c.GeographicFormComponent,
      ),
  },
];
