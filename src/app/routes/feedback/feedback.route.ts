import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/feedback-list/feedback-list.component').then((c) => c.FeedbackListComponent),
  },
];
