import { Routes } from '@angular/router';
import { RolePermissionEnum } from './models/enum/role-permission.enum';
import { MenuItem } from './models/menu-item';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/container/container.component').then((c) => c.Container),
    children: [
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
    title: routeItem.path?.split('/').pop(),
    role: routeItem.data.role,
    type: routeItem.data.type,
  } as MenuItem;
});
