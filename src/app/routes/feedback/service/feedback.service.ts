import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Feedback, FeedbackSummary } from '../models/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends BaseCrudService<Feedback> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/feedbacks';
  }

  getFeedbackSummaryCard() {
    return this.requestService.getJSON<FeedbackSummary>(`${this.path}/summary`, {
      is_alert_error: true,
      is_loading: true,
    });
  }
}
