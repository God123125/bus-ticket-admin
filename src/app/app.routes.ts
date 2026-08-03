import { Routes } from '@angular/router';
import { RolePermissionEnum } from './models/enum/role-permission.enum';
import { MenuItem } from './models/menu-item';
import { Container } from './components/container/container.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: Container,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./routes/dashboard/dashboard.route').then((r) => r.routes),
        data: {
          role: [RolePermissionEnum.Admin],
          type: 'dashboard',
        },
        canActivate: [authGuard],
      },
      {
        path: 'bus',
        loadChildren: () => import('./routes/bus/bus.route').then((r) => r.routes),
        data: {
          role: [RolePermissionEnum.Merchant],
          type: 'bus',
        },
        canActivate: [authGuard],
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./routes/user-management/user-management.route').then((r) => r.routes),
        data: {
          role: [RolePermissionEnum.Admin, RolePermissionEnum.Merchant],
          type: 'user-management',
        },
        canActivate: [authGuard],
      },
      {
        path: 'company',
        loadChildren: () => import('./routes/company/company.route').then((r) => r.routes),
        data: {
          role: [RolePermissionEnum.Admin],
          type: 'company',
        },
        canActivate: [authGuard],
      },
      {
        path: 'station',
        loadChildren: () => import('./routes/station/station.route').then((r) => r.routes),
        data: {
          role: [RolePermissionEnum.Merchant],
          type: 'station',
        },
        canActivate: [authGuard],
      },
      {
        path: 'schedule',
        loadChildren: () => import('./routes/schedule/schedule.route').then((r) => r.routes),
        data: {
          role: [RolePermissionEnum.Merchant],
          type: 'schedule',
        },
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.route').then((r) => r.routes),
  },
];
export const MENUITEMS: MenuItem[] = routes[0].children!.map((routeItem: any) => {
  return {
    route: routeItem.path,
    title: routeItem.path?.split('/').pop(),
    role: routeItem.data.role,
    type: routeItem.data.type,
  } as MenuItem;
});
