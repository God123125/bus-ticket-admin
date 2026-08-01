import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/user-management-list/user-management-list.component').then(
        (c) => c.UserManagementListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/user-management-form/user-management-form.component').then(
        (c) => c.UserManagementFormComponent,
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/user-management-form/user-management-form.component').then(
        (c) => c.UserManagementFormComponent,
      ),
  },
];
