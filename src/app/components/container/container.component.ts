import { Component, HostListener } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { MENUITEMS } from '../../app.routes';
import { MenuItem } from '../../models/menu-item';
import { MatMenuModule } from '@angular/material/menu';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorageEnum } from '../../models/enum/localstorage.enum';
import { RolePermissionEnum } from '../../models/enum/role-permission.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-container',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    TranslatePipe,
    MatMenuModule,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class Container {
  opened = true;
  desktopViewWidth = 1100;
  drawerMode: 'over' | 'side' = 'side';
  menu: any = {};
  username: string = '';
  currentUserId: string = '';
  role: string = '';
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.getUserInformation();
    this.menu = {
      bus: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'bus' && menuItem.role?.includes(this.role);
      }),
      dashboard: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'dashboard' && menuItem.role?.includes(this.role);
      }),
      userManagement: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'user-management' && menuItem.role?.includes(this.role);
      }),
      company: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'company' && menuItem.role?.includes(this.role);
      }),
      station: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'station' && menuItem.role?.includes(this.role);
      }),
      schedule: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'schedule' && menuItem.role?.includes(this.role);
      }),
    };
    this.redirectTofirstMenu();
  }
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize = (width: number): void => {
    if (width < this.desktopViewWidth) {
      this.drawerMode = 'over';
      if (this.opened) {
        this.opened = false;
      }
    } else {
      this.drawerMode = 'side';
      if (!this.opened) {
        this.opened = true;
      }
    }
  };
  getUserInformation() {
    this.role = this.localStorageService.get(LocalStorageEnum.Role);
    this.username = this.localStorageService.get(LocalStorageEnum.username);
  }
  redirectTofirstMenu() {
    if (this.router.url == '/') {
      if (this.role == RolePermissionEnum.Admin) {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        this.router.navigate(['/bus'], { replaceUrl: true });
      }
    }
  }
  toggleMenu = (): void => {
    this.opened = !this.opened;
  };
  changePassword() {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
