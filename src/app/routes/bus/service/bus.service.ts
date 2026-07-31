import { Injectable, Injector } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { BaseCrudService } from '../../../services/base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class BusService extends BaseCrudService<any> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/buses';
  }
}
