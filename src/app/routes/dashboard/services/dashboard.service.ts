import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseCrudService<any> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/dashboard';
  }
}
