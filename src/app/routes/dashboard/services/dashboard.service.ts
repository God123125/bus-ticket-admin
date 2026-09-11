import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { SummaryData } from '../models/summary-data';
import { YearlyCommission } from '../models/yearly-commission';
import { CompanyComparison } from '../models/company-comparison';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseCrudService<any> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/dashboard';
  }
  getAdminSummaryCard() {
    return this.requestService.getJSON<SummaryData>(`${this.path}/admin-summary-card`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
  getYearlyCommission() {
    return this.requestService.getJSON<YearlyCommission>(`${this.path}/yearly-commission`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
  getCompanyComparison() {
    return this.requestService.getJSON<CompanyComparison>(`${this.path}/company-comparison`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
}
