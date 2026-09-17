import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { BookingReport } from '../models/booking-report';

@Injectable({ providedIn: 'root' })
export class BookingReportService extends BaseCrudService<any> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/merchant-report';
  }

  getBookingReport(data?: { page?: number; limit?: number; search?: string; [key: string]: any }) {
    return this.requestService.getJSON<BookingReport>(this.path, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
}

