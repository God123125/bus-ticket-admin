import { Routes } from '@angular/router';
import { RolePermissionEnum } from './models/enum/role-permission.enum';
import { MenuItem } from './models/menu-item';
import { Container } from './components/container/container.component';

export const routes: Routes = [
  {
    path: '',
    component: Container,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./routes/dashboard/dashboard.route').then((r) => r.routes),
        data: {
          role: RolePermissionEnum.Admin,
          type: 'dashboard',
        },
      },
      {
        path: 'bus',
        loadChildren: () => import('./routes/bus/bus.route').then((r) => r.routes),
        data: {
          role: RolePermissionEnum.Admin,
          type: 'bus',
        },
      },
    ],
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
