import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Station } from '../model/station';

@Injectable({
  providedIn: 'root',
})
export class StationService extends BaseCrudService<Station> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/stations';
  }
}
