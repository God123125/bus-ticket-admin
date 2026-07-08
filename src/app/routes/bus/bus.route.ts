import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/bus-list/bus-list.component').then((c) => c.BusListComponent),
  },
];
