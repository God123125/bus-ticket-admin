import { Route } from '@angular/router';
export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/station-list/station-list.component').then((c) => c.StationListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/station-form/station-form.component').then((c) => c.StationFormComponent),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/station-form/station-form.component').then((c) => c.StationFormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/station-detail/station-detail.component').then(
        (c) => c.StationDetailComponent,
      ),
  },
];
