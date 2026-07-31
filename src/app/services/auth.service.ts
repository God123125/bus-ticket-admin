import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageEnum } from '../models/enum/localstorage.enum';
import { map } from 'rxjs';
import { RolePermissionEnum } from '../models/enum/role-permission.enum';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private requestService: RequestService,
    private localStorageService: LocalStorageService,
  ) {}
  login(data: any) {
    const payload = {
      username: data.username,
      password: data.password,
    };
    return this.requestService
      .postJSON<any>(`/api/users/login`, {
        data: payload,
        is_loading: true,
        is_alert_error: true,
      })
      .pipe(
        map((res) => {
          this.localStorageService.set(LocalStorageEnum.Token, res.token);
          this.localStorageService.set(LocalStorageEnum.Role, res.user.role);
          this.localStorageService.set(LocalStorageEnum.token_expires_at, res.expireAt);
          this.localStorageService.set(LocalStorageEnum.username, res.user.username);
          return res;
        }),
      );
  }
  logout() {
    this.localStorageService.delete(LocalStorageEnum.Token);
    this.localStorageService.delete(LocalStorageEnum.Role);
    this.localStorageService.delete(LocalStorageEnum.token_expires_at);
    this.localStorageService.delete(LocalStorageEnum.username);
  }
  public get isAuth(): boolean {
    return !!this.localStorageService.get(LocalStorageEnum.Token);
  }
  public get isAdmin(): boolean {
    return this.localStorageService.get(LocalStorageEnum.Role) == RolePermissionEnum.Admin;
  }
  public get role(): string {
    return this.localStorageService.get(LocalStorageEnum.Role) ?? '';
  }
  public get token_expire(): boolean {
    const raw = this.localStorageService.get(LocalStorageEnum.token_expires_at);
    if (!raw) return true;
    return new Date(raw).getTime() < Date.now();
  }
}
