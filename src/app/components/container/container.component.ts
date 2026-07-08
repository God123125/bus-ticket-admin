import { Component, HostListener } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { MENUITEMS } from '../../app.routes';
import { MenuItem } from '../../models/menu-item';
import { MatMenuModule } from '@angular/material/menu';

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
  name: string = 'Test';
  username: string = 'Kerb';
  currentUserId: string = '';
  constructor() {}
  ngOnInit(): void {
    this.menu = {
      bus: MENUITEMS.filter((menuItem: MenuItem) => {
        return menuItem.type === 'bus';
      }),
    };
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

  toggleMenu = (): void => {
    this.opened = !this.opened;
  };
  changePassword() {}
  logout() {}
}
