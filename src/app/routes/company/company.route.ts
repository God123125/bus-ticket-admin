import { Route } from '@angular/router';
export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/company-list/company-list.component').then((m) => m.CompanyListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/company-form/company-form.component').then((m) => m.CompanyFormComponent),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/company-form/company-form.component').then((m) => m.CompanyFormComponent),
  },
];
