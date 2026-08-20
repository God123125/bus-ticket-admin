import { Route } from '@angular/router';
export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/trip-list/trip-list.component').then((c) => c.TripListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/trip-form/trip-form.component').then((c) => c.TripFormComponent),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/trip-form/trip-form.component').then((c) => c.TripFormComponent),
  },
];
