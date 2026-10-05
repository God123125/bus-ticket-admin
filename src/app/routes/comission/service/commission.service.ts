import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Commission } from '../model/commission';

@Injectable({ providedIn: 'root' })
export class CommissionService extends BaseCrudService<Commission> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/commissions';
  }
  getStatus() {
    return this.requestService.getJSON<any>(this.path + '/status-count', {
      is_alert_error: true,
      is_loading: true,
    });
  }
  markAsPaid(data: { [key: string]: any }) {
    return this.requestService.postJSON<any>(this.path + '/mark-as-paid', {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
}
