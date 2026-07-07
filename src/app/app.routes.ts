import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/container/container.component').then((c) => c.Container),
    children: [],
  },
];
