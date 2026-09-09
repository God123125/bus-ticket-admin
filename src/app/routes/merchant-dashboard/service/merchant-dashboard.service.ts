import { Injector, Service } from '@angular/core';
import { extend } from 'leaflet';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Injectable } from '@angular/core';
import { MerchantDashboard } from '../model/merchant-dashboard';

@Injectable({
  providedIn: 'root',
})
export class MerchantDashboardService extends BaseCrudService<any> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/dashboard';
  }
  getMerchantSummaryCard() {
    return this.requestService.getJSON<MerchantDashboard>(`${this.path}/merchant-summary-card`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
  getTrendAnalytical() {
    return this.requestService.getJSON<any>(`${this.path}/trends-analytical-chart`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
  getTopPerformanceDestination() {
    return this.requestService.getJSON<any>(`${this.path}/top-performance-destination`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
  getBookingStatusDistribution() {
    return this.requestService.getJSON<any>(`${this.path}/booking-status-distribution`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
  getFiveRecentBookings() {
    return this.requestService.getJSON<any>(`${this.path}/five-recent-bookings`, {
      is_loading: true,
      is_alert_error: true,
    });
  }
}
