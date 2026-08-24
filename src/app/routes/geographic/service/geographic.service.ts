import { Injectable, Injector, Service } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Geographic } from '../model/geographic';

@Injectable({
  providedIn: 'root',
})
export class GeographicService extends BaseCrudService<Geographic> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/geographics';
  }
}
