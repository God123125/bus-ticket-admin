import { Component, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SummaryCardComponent } from '../../components/summary-card/summary-card.component';
import { DashboardService } from '../../services/dashboard.service';
import { SummaryData } from '../../models/summary-data';
import { TranslatePipe } from '@ngx-translate/core';
import { YearlyCommission } from '../../models/yearly-commission';
import { YearlyCommissionLineChartComponent } from '../../components/yearly-commission-line-chart/yearly-commission-line-chart.component';
import { CompanyComparison } from '../../models/company-comparison';
import { CompanyComparisonDoughnutComponent } from '../../components/company-comparison-doughnut/company-comparison-doughnut.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatRippleModule,
    SummaryCardComponent,
    TranslatePipe,
    YearlyCommissionLineChartComponent,
    CompanyComparisonDoughnutComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  summaryData = signal<SummaryData>({} as SummaryData);
  yearlyCommission = signal<YearlyCommission>({} as YearlyCommission);
  companyComparison = signal<CompanyComparison>({} as CompanyComparison);
  constructor(private dashboardService: DashboardService) {}
  ngOnInit() {
    this.getSummaryCardData();
    this.getYearlyCommission();
    this.getCompanyComparison();
  }
  getSummaryCardData() {
    this.dashboardService.getAdminSummaryCard().subscribe({
      next: (res) => {
        this.summaryData.set(res);
      },
    });
  }
  getYearlyCommission() {
    this.dashboardService.getYearlyCommission().subscribe({
      next: (res) => {
        this.yearlyCommission.set(res);
      },
    });
  }
  getCompanyComparison() {
    this.dashboardService.getCompanyComparison().subscribe({
      next: (res) => {
        this.companyComparison.set(res);
      },
    });
  }
}
