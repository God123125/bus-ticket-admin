import { Component, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { MerchantDashboardService } from '../../service/merchant-dashboard.service';
import { MerchantDashboard } from '../../model/merchant-dashboard';
import { TranslatePipe } from '@ngx-translate/core';
import { TrendAnalyticalChartComponent } from '../../components/trend-analytical-chart/trend-analytical-chart.component';
import { BookingStatusChartComponent } from '../../components/booking-status-chart/booking-status-chart.component';
import { TopBookedDestinationsComponent } from '../../components/top-booked-destinations/top-booked-destinations.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FiveRecentBookings } from '../../model/five-recent-bookings';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-merchant-dashboard',
  imports: [
    MatRippleModule,
    SummaryCardComponent,
    TranslatePipe,
    TrendAnalyticalChartComponent,
    BookingStatusChartComponent,
    TopBookedDestinationsComponent,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    LowerCasePipe,
    CurrencyPipe,
  ],
  templateUrl: './merchant-dashboard.component.html',
  styleUrl: './merchant-dashboard.component.scss',
})
export class MerchantDashboardComponent {
  dashboardData = signal<MerchantDashboard>({} as MerchantDashboard);
  trendAnalyticalData = signal<any>({});
  topPerformanceDestination = signal<any>({});
  fiveRecentsBooking = signal<FiveRecentBookings[]>([]);
  bookingStatus = signal<any[]>([]);
  constructor(private dashboardService: MerchantDashboardService) {}
  ngOnInit(): void {
    this.getSummaryData();
    this.getTrendAnalytical();
    this.getTopPerformanceDestination();
    this.getBookingStatusDistribution();
    this.getRecentBookings();
  }
  getSummaryData() {
    this.dashboardService.getMerchantSummaryCard().subscribe({
      next: (res) => {
        this.dashboardData.set(res);
      },
    });
  }
  getTrendAnalytical() {
    this.dashboardService.getTrendAnalytical().subscribe({
      next: (res) => {
        this.trendAnalyticalData.set(res);
      },
    });
  }
  getTopPerformanceDestination() {
    this.dashboardService.getTopPerformanceDestination().subscribe({
      next: (res) => {
        this.topPerformanceDestination.set(res);
      },
    });
  }
  getBookingStatusDistribution() {
    this.dashboardService.getBookingStatusDistribution().subscribe({
      next: (res) => {
        this.bookingStatus.set(res);
      },
    });
  }
  getRecentBookings() {
    this.dashboardService.getRecentBookings().subscribe({
      next: (res) => {
        this.fiveRecentsBooking.set(res);
      },
    });
  }
}
