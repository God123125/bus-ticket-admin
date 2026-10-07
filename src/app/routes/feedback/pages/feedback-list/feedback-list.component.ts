import { Component } from '@angular/core';
import { FeedbackService } from '../../service/feedback.service';

@Component({
  selector: 'app-feedback-list',
  imports: [],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss',
})
export class FeedbackListComponent {
  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.feedbackService.getMany({ page: 1, limit: 10 }).subscribe({
      next: (res) => {},
    });
  }
}
