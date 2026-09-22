import { Component, HostListener, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
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
  currentLange = signal<string>('');
  profile: string = '';
  logo: string = '';
  companyColor: string = '';
  companyName: string = '';
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private translateService: TranslateService,
  ) {
    this.loadCompanyInfo();
  }
  ngOnInit(): void {
    const storedProfile = this.localStorageService.get(LocalStorageEnum.profile);
    this.profile =
      storedProfile !== 'undefined' ? storedProfile : '../../../assets/imgs/user-profile.svg';
    this.getUserInformation();
    this.loadCurrentLanguage();
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
      trip: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'trip' && menuItem.role?.includes(this.role);
      }),
      settings: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'settings' && menuItem.role?.includes(this.role);
      }),
      merchantDashboard: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'merchant-dashboard' && menuItem.role?.includes(this.role);
      }),
      bookingReport: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'report' && menuItem.role?.includes(this.role);
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
  loadCompanyInfo() {
    this.logo = this.localStorageService.get(LocalStorageEnum.company_image);
    this.companyColor = this.localStorageService.get(LocalStorageEnum.company_color);
    this.companyName = this.localStorageService.get(LocalStorageEnum.company_name);
  }
  getUserInformation() {
    this.role = this.localStorageService.get(LocalStorageEnum.Role);
    this.username = this.localStorageService.get(LocalStorageEnum.username);
  }
  redirectTofirstMenu() {
    if (this.router.url == '/') {
      if (this.role == RolePermissionEnum.Admin) {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        this.router.navigate(['/merchant-dashboard'], { replaceUrl: true });
      }
    }
  }
  toggleMenu = (): void => {
    this.opened = !this.opened;
  };
  currentLangCode = signal<'en' | 'km'>('km');

  loadCurrentLanguage() {
    const lang = (this.localStorageService.get(LocalStorageEnum.language) || 'km') as 'en' | 'km';
    this.setLanguage(lang);
  }

  switchLanguage(language: 'en' | 'km') {
    this.setLanguage(language);
    this.localStorageService.set(LocalStorageEnum.language, language);
  }

  private setLanguage(lang: 'en' | 'km') {
    this.currentLangCode.set(lang);
    this.currentLange.set(lang === 'km' ? 'ភាសាខ្មែរ' : 'English');
    this.translateService.use(lang);
  }

  changePassword() {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
