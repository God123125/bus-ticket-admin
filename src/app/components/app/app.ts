import { Component, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('bus-ticket-admin');
  isLoading: boolean = false;
  loadingTimeout: any;
  constructor(
    private _loadingService: LoadingService,
    private _router: Router,
    private _spinnerService: NgxSpinnerService,
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._loadingService.forceStop();
        this._loadingService.setLoading(true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this._loadingService.setLoading(false);
      }
    });
  }
  ngOnInit(): void {
    this._loadingService.isLoading$.subscribe((isLoading: boolean) => {
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }
      this.loadingTimeout = setTimeout(() => {
        if (isLoading) {
          this._spinnerService.show('pageLoading');
        } else {
          this._spinnerService.hide('pageLoading');
        }
        this.loadingTimeout = null;
      }, 200);
    });
  }
}
