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
import { TopBookedCompanyComponent } from '../../components/top-booked-company/top-booked-company.component';
import { TopBookedCompany } from '../../models/top-booked-company';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatRippleModule,
    SummaryCardComponent,
    TranslatePipe,
    YearlyCommissionLineChartComponent,
    CompanyComparisonDoughnutComponent,
    TopBookedCompanyComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  summaryData = signal<SummaryData>({} as SummaryData);
  yearlyCommission = signal<YearlyCommission>({} as YearlyCommission);
  companyComparison = signal<CompanyComparison>({} as CompanyComparison);
  topBookingCompany = signal<TopBookedCompany[]>([]);
  constructor(private dashboardService: DashboardService) {}
  ngOnInit() {
    this.getSummaryCardData();
    this.getYearlyCommission();
    this.getCompanyComparison();
    this.getTopBookingCompanyBarChart();
  }
  getSummaryCardData() {
    this.dashboardService.getAdminSummaryCard().subscribe({
      next: (res) => {
        this.summaryData.set(res);
      },
    });
  }
  getYearlyCommission(year: number = new Date().getFullYear()) {
    this.dashboardService.getYearlyCommission({ year }).subscribe({
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
  getTopBookingCompanyBarChart() {
    this.dashboardService.getTopBookingCompanyBarChart().subscribe({
      next: (res) => {
        this.topBookingCompany.set(res);
      },
    });
  }
  onYearChange(value: number) {
    this.getYearlyCommission(value);
  }
}
