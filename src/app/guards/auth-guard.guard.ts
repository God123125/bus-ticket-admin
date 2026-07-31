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
    const roles = authService.role;
    if (route.data['role'] && route.data['role'] === roles) {
      return true;
    } else {
      if (roles == RolePermissionEnum.Admin) {
        router.navigate(['/dashboard']);
      } else {
        router.navigate(['/bus']);
      }
      return false;
    }
  }
};
