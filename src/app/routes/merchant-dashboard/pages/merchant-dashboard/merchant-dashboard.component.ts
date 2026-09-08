import { Component, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { MerchantDashboardService } from '../../service/merchant-dashboard.service';
import { MerchantDashboard } from '../../model/merchant-dashboard';
import { TranslatePipe } from '@ngx-translate/core';
import { TrendAnalyticalChartComponent } from '../../components/trend-analytical-chart/trend-analytical-chart.component';

@Component({
  selector: 'app-merchant-dashboard',
  imports: [MatRippleModule, SummaryCardComponent, TranslatePipe, TrendAnalyticalChartComponent],
  templateUrl: './merchant-dashboard.component.html',
  styleUrl: './merchant-dashboard.component.scss',
})
export class MerchantDashboardComponent {
  dashboardData = signal<MerchantDashboard>({} as MerchantDashboard);
  trendAnalyticalData = signal<any>({});
  constructor(private dashboardService: MerchantDashboardService) {}
  ngOnInit(): void {
    this.getSummaryData();
    this.getTrendAnalytical();
    this.getTopPerformanceDestination();
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
      next: (res) => {},
    });
  }
}
