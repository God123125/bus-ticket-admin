import { Component, OnInit, signal } from '@angular/core';
import { BookingReportService } from '../../service/booking-report.service';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BookingReport } from '../../models/booking-report';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-booking-report',
  imports: [
    SummaryCardComponent,
    TranslatePipe,
    CurrencyPipe,
    DatePipe,
    LowerCasePipe,
    MatIconModule,
    MatRippleModule,
    MatPaginator,
  ],
  templateUrl: './booking-report.component.html',
  styleUrl: './booking-report.component.scss',
})
export class BookingReportComponent implements OnInit {
  reportData = signal<BookingReport>({
    list: [],
    pendingBookingCount: 0,
    confirmedBookingCount: 0,
    cancelledBookingCount: 0,
    refundedBookingCount: 0,
    totalBookingCount: 0,
    totalBookingAmount: 0,
  });
  params = {
    page: 1,
    limit: 10,
  };
  total = signal<number>(0);
  isLoading = signal<boolean>(false);

  constructor(private bookingReportService: BookingReportService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.isLoading.set(true);
    this.bookingReportService.getBookingReport().subscribe({
      next: (res: BookingReport) => {
        if (res) {
          this.reportData.set(res);
          this.total.set(res.list.length);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onPageChange(event: PageEvent) {
    this.params.page = event.pageIndex + 1;
    this.params.limit = event.pageSize;
    this.getList();
  }
}
