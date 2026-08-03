import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/schedule-list/schedule-list.component').then(
        (c) => c.ScheduleListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/schedule-form/schedule-form.component').then(
        (c) => c.ScheduleFormComponent,
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/schedule-form/schedule-form.component').then(
        (c) => c.ScheduleFormComponent,
      ),
  },
];

