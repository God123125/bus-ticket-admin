import { Component, OnInit, signal } from '@angular/core';
import { BookingReportService } from '../../service/booking-report.service';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BookingItem, BookingReport } from '../../models/booking-report';

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
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}

