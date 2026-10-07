import { Component, signal } from '@angular/core';
import { FeedbackService } from '../../service/feedback.service';
import { Feedback, FeedbackSummary } from '../../models/feedback';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

import { CommonModule, DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback-list',
  imports: [
    CommonModule,
    SummaryCardComponent,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    DatePipe,
    MatPaginator,
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss',
})
export class FeedbackListComponent {
  feedbackSummary = signal<FeedbackSummary>({} as any);
  feedbackList = signal<Feedback[]>([]);
  stars = [1, 2, 3, 4, 5];
  previewImage = signal<string | null>(null);
  params: any = {
    page: 1,
    limit: 10,
  };
  total = signal(0);
  constructor(private feedbackService: FeedbackService) {}

  openPreview(url: string) {
    this.previewImage.set(url);
  }

  closePreview() {
    this.previewImage.set(null);
  }

  ngOnInit() {
    this.getList();
    this.getSummary();
  }
  onStarFilter(index: number) {
    this.params.star = index + 1;
    this.params.page = 1;
    this.getList();
  }
  getList() {
    this.feedbackService.getMany(this.params).subscribe({
      next: (res) => {
        this.feedbackList.set(res.list);
        this.total.set(res.total);
      },
    });
  }
  onPageChange(event: PageEvent) {
    this.params.page = event.pageIndex + 1;
    this.params.limit = event.pageSize;
    this.getList();
  }
  onRefresh() {
    this.params.star = undefined;
    this.getList();
  }
  getSummary() {
    this.feedbackService.getFeedbackSummaryCard().subscribe({
      next: (res) => {
        this.feedbackSummary.set(res);
      },
    });
  }
}
