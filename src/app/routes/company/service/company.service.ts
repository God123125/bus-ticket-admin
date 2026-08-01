import { Injectable, Injector } from '@angular/core';
import { Company } from '../model/company';
import { BaseCrudService } from '../../../services/base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseCrudService<Company> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/api/companies';
  }

  createCompany(data: { [key: string]: any }) {
    return this.requestService.postFile(this.path, {
      data,
      is_loading: true,
      is_alert_error: true,
    });
  }

  updateCompany(id: string, data: { [key: string]: any }) {
    return this.requestService.patchFileProgress(`${this.path}/${id}`, {
      data,
      is_loading: true,
      is_alert_error: true,
    });
  }
}

