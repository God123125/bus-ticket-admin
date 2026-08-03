import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { RolePermissionEnum } from '../models/enum/role-permission.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.token_expire || !authService.isAuth) {
    authService.logout();
    router.navigate(['/login']);
    return false;
  } else {
    const userRole = authService.role;
    const routeRoles: string[] | undefined = route.data['role'];

    if (!routeRoles) {
      return true;
    }

    const isAuthorized = Array.isArray(routeRoles)
      ? routeRoles.includes(userRole)
      : routeRoles === userRole;

    if (isAuthorized) {
      return true;
    } else {
      const defaultTarget = userRole === RolePermissionEnum.Admin ? '/dashboard' : '/bus';
      if (state.url !== defaultTarget) {
        router.navigate([defaultTarget]);
      } else {
        authService.logout();
        router.navigate(['/login']);
      }
      return false;
    }
  }
};
