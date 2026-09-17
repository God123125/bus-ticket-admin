import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/booking-report/booking-report.component').then(
        (r) => r.BookingReportComponent,
      ),
  },
];
