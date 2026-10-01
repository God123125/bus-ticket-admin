import { Component, OnInit, signal } from '@angular/core';
import { BookingReportService } from '../../service/booking-report.service';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BookingReport } from '../../models/booking-report';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ExcelService } from '../../../../services/excel.service';
import { Workbook } from 'exceljs';
import { MatButtonModule } from '@angular/material/button';
import { RefundDialogComponent } from '../../components/refund-dialog/refund-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    MatButtonModule,
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

  constructor(
    private bookingReportService: BookingReportService,
    private excelService: ExcelService,
    private translateService: TranslateService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.isLoading.set(true);
    this.bookingReportService.getBookingReport(this.params).subscribe({
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
  exportExcel(table: HTMLTableElement) {
    const title = `${this.translateService.instant('booking_report')}`;
    const subTitle = `Exported at: ${new Date().toLocaleString()}`;
    this.excelService.exportHtmlTableToExcel(table, title, subTitle).then((workbook) => {
      this.excelService.downloadExcel(workbook as Workbook, `booking-report.xlsx`);
    });
  }
  openRefundDialog(bookingId: string): void {
    const dialogRef = this.dialog.open(RefundDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((refundRate) => {
      if (refundRate) {
        this.bookingReportService
          .updateBooking(bookingId, {
            refund_rate: refundRate,
            status: 'REFUNDED',
          })
          .subscribe({
            next: () => {
              this.getList();
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }
}
